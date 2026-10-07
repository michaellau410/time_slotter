import { Task, StrategyId, DayParameters, ScheduleBlock } from '../types';

export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

export function minutesToTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}`;
}

export function formatMinutesDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function partitionTasksByStrategy(tasks: Task[], strategy: StrategyId): {
  preLibraryTasks: Task[];
  postLibraryTasks: Task[];
  passiveTasks: Task[];
} {
  const activeTasks = tasks.filter(t => !t.completed);
  const passive = activeTasks.filter(t => t.type === 'passive');
  const activeOnly = activeTasks.filter(t => t.type === 'active');

  if (strategy === 'consolidated_sprint') {
    // Idea 1: Bundle almost everything before leaving so mind is 100% clean,
    // only meal prep or evening-specific tasks are kept for later.
    const pre: Task[] = [];
    const post: Task[] = [];
    for (const t of activeOnly) {
      if (t.placement === 'post_library' || t.category === 'meal_prep') {
        post.push(t);
      } else {
        pre.push(t);
      }
    }
    return { preLibraryTasks: pre, postLibraryTasks: post, passiveTasks: passive };
  }

  if (strategy === 'library_bookends') {
    // Idea 2: Minimal 15-20m pre-departure hygiene (kitchen sink, trash, quick tidy),
    // rest (laundry folding, sweeping, grocery/meal prep) deferred to post-study cooldown.
    const pre: Task[] = [];
    const post: Task[] = [];
    let preMins = 0;

    for (const t of activeOnly) {
      if (t.placement === 'pre_library' || (t.placement === 'auto' && preMins + t.estimateMinutes <= 20 && (t.category === 'kitchen' || t.category === 'errands'))) {
        pre.push(t);
        preMins += t.estimateMinutes;
      } else {
        post.push(t);
      }
    }
    return { preLibraryTasks: pre, postLibraryTasks: post, passiveTasks: passive };
  }

  if (strategy === 'passive_parallelizer') {
    // Idea 4: Passive tasks run before/during morning meal, active tasks minimal before leaving.
    const pre = activeOnly.filter(t => t.placement !== 'post_library');
    const post = activeOnly.filter(t => t.placement === 'post_library');
    return { preLibraryTasks: pre, postLibraryTasks: post, passiveTasks: passive };
  }

  // Strategy 3: two_zone_partition (default strict partition based on user assignment)
  const pre = activeOnly.filter(t => t.placement === 'pre_library' || t.placement === 'auto');
  const post = activeOnly.filter(t => t.placement === 'post_library');
  return { preLibraryTasks: pre, postLibraryTasks: post, passiveTasks: passive };
}

export function generateSchedule(
  tasks: Task[],
  strategy: StrategyId,
  params: DayParameters
): {
  blocks: ScheduleBlock[];
  totalChoreMinutes: number;
  uninterruptedStudyMinutes: number;
  departureTime: string;
  returnTime: string;
} {
  const { preLibraryTasks, postLibraryTasks } = partitionTasksByStrategy(tasks, strategy);

  const preChoreDuration = preLibraryTasks.reduce((acc, t) => acc + t.estimateMinutes, 0);
  const postChoreDuration = postLibraryTasks.reduce((acc, t) => acc + t.estimateMinutes, 0);
  const studyDuration = Math.round(params.libraryTargetHours * 60);

  let currentMin = timeToMinutes(params.wakeTime);
  const blocks: ScheduleBlock[] = [];

  // 1. Morning Routine & Breakfast (30m)
  const wakeDuration = 30;
  blocks.push({
    id: 'block-wake',
    title: 'Morning Routine & Breakfast',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + wakeDuration),
    startMinutes: currentMin,
    durationMinutes: wakeDuration,
    type: 'wake_routine',
    description: 'Hydrate, breakfast, review today’s study goals without checking social media.',
  });
  currentMin += wakeDuration;

  // 2. Pre-Library Chore Sprint (if tasks exist)
  if (preChoreDuration > 0) {
    blocks.push({
      id: 'block-pre-chore',
      title: strategy === 'library_bookends' ? 'Pre-Departure Launchpad' : 'Chore Speedrun Batch',
      startTime: minutesToTime(currentMin),
      endTime: minutesToTime(currentMin + preChoreDuration),
      startMinutes: currentMin,
      durationMinutes: preChoreDuration,
      type: 'chore_sprint',
      tasks: preLibraryTasks,
      description: `Speedrun through ${preLibraryTasks.length} household micro-tasks. Beat the clock!`,
    });
    currentMin += preChoreDuration;
  }

  // Departure Time Anchor
  const departureMinutes = currentMin;
  const departureTime = minutesToTime(departureMinutes);

  // 3. Commute to Library
  blocks.push({
    id: 'block-commute-out',
    title: 'Transit to Library Sanctuary',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + params.commuteMinutes),
    startMinutes: currentMin,
    durationMinutes: params.commuteMinutes,
    type: 'commute',
    description: 'Listen to study podcast, mentally shift gears into academic mode.',
  });
  currentMin += params.commuteMinutes;

  // 4. Sacred Library Deep Focus Block (Unbroken!)
  blocks.push({
    id: 'block-library-study',
    title: 'Sacred Library Deep Work Block',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + studyDuration),
    startMinutes: currentMin,
    durationMinutes: studyDuration,
    type: 'library_deep_focus',
    isLibraryBlock: true,
    description: `Zero domestic interruptions. Dedicated to: ${params.studyTopic || 'Deep Study'}.`,
  });
  currentMin += studyDuration;

  // 5. Commute Back Home
  blocks.push({
    id: 'block-commute-return',
    title: 'Commute Return Home',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + params.commuteMinutes),
    startMinutes: currentMin,
    durationMinutes: params.commuteMinutes,
    type: 'commute',
    description: 'Decompress, transition from high-cognitive study to home space.',
  });
  currentMin += params.commuteMinutes;

  const returnMinutes = currentMin;
  const returnTime = minutesToTime(returnMinutes);

  // 6. Post-Library Chore Cooldown (if any)
  if (postChoreDuration > 0) {
    blocks.push({
      id: 'block-post-chore',
      title: 'Post-Library Chore Cooldown',
      startTime: minutesToTime(currentMin),
      endTime: minutesToTime(currentMin + postChoreDuration),
      startMinutes: currentMin,
      durationMinutes: postChoreDuration,
      type: 'chore_cooldown',
      tasks: postLibraryTasks,
      description: `Mindless physical chores (${postLibraryTasks.length} tasks) to relax prefrontal cortex.`,
    });
    currentMin += postChoreDuration;
  }

  // 7. Dinner & Relaxing Free Time until sleep
  const sleepMin = timeToMinutes(params.sleepTime);
  let eveningDuration = sleepMin > currentMin ? sleepMin - currentMin : 120;
  if (eveningDuration < 60) eveningDuration = 60;

  blocks.push({
    id: 'block-evening',
    title: 'Dinner & Guilt-Free Rest',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + eveningDuration),
    startMinutes: currentMin,
    durationMinutes: eveningDuration,
    type: 'leisure',
    description: 'Relax, read, call friends or watch a show. Chores and study are both complete!',
  });

  return {
    blocks,
    totalChoreMinutes: preChoreDuration + postChoreDuration,
    uninterruptedStudyMinutes: studyDuration,
    departureTime,
    returnTime,
  };
}
