import { Task, StrategyId, DayParameters, ScheduleBlock, Language } from '../types';

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

export function formatMinutesDuration(totalMinutes: number, lang: Language = 'en'): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (lang === 'zh-TW') {
    if (h === 0) return `${m}分鐘`;
    if (m === 0) return `${h}小時`;
    return `${h}小時${m}分鐘`;
  }
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
  params: DayParameters,
  lang: Language = 'en'
): {
  blocks: ScheduleBlock[];
  totalChoreMinutes: number;
  uninterruptedStudyMinutes: number;
  departureTime: string;
  returnTime: string;
} {
  const isZh = lang === 'zh-TW';
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
    title: isZh ? '晨間例行與早餐' : 'Morning Routine & Breakfast',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + wakeDuration),
    startMinutes: currentMin,
    durationMinutes: wakeDuration,
    type: 'wake_routine',
    description: isZh 
      ? '喝水補水、享用早餐，確認今日學習目標，不滑社群媒體。'
      : 'Hydrate, breakfast, review today’s study goals without checking social media.',
  });
  currentMin += wakeDuration;

  // 2. Pre-Library Chore Sprint (if tasks exist)
  if (preChoreDuration > 0) {
    const title = strategy === 'library_bookends' 
      ? (isZh ? '出發前啟動站' : 'Pre-Departure Launchpad') 
      : (isZh ? '出發前雜務極速衝刺' : 'Chore Speedrun Batch');

    const desc = isZh
      ? `迅速搞定 ${preLibraryTasks.length} 項家務瑣事，啟動專注衝刺！`
      : `Speedrun through ${preLibraryTasks.length} household micro-tasks. Beat the clock!`;

    blocks.push({
      id: 'block-pre-chore',
      title,
      startTime: minutesToTime(currentMin),
      endTime: minutesToTime(currentMin + preChoreDuration),
      startMinutes: currentMin,
      durationMinutes: preChoreDuration,
      type: 'chore_sprint',
      tasks: preLibraryTasks,
      description: desc,
    });
    currentMin += preChoreDuration;
  }

  // Departure Time Anchor
  const departureMinutes = currentMin;
  const departureTime = minutesToTime(departureMinutes);

  // 3. Commute to Library
  blocks.push({
    id: 'block-commute-out',
    title: isZh ? '前往圖書館（交通緩衝）' : 'Transit to Library Sanctuary',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + params.commuteMinutes),
    startMinutes: currentMin,
    durationMinutes: params.commuteMinutes,
    type: 'commute',
    description: isZh
      ? '聽專注音樂或課業播客，將思維調整至圖書館學術模式。'
      : 'Listen to study podcast, mentally shift gears into academic mode.',
  });
  currentMin += params.commuteMinutes;

  // 4. Sacred Library Deep Focus Block (Unbroken!)
  blocks.push({
    id: 'block-library-study',
    title: isZh ? '神聖圖書館深度專注時段' : 'Sacred Library Deep Work Block',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + studyDuration),
    startMinutes: currentMin,
    durationMinutes: studyDuration,
    type: 'library_deep_focus',
    isLibraryBlock: true,
    description: isZh
      ? `零家務中斷。專注攻讀目標：${params.studyTopic || '深度學術課題'}。`
      : `Zero domestic interruptions. Dedicated to: ${params.studyTopic || 'Deep Study'}.`,
  });
  currentMin += studyDuration;

  // 5. Commute Back Home
  blocks.push({
    id: 'block-commute-return',
    title: isZh ? '返家路程（心情切換）' : 'Commute Return Home',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + params.commuteMinutes),
    startMinutes: currentMin,
    durationMinutes: params.commuteMinutes,
    type: 'commute',
    description: isZh
      ? '放鬆身心，從高強度認知學習自然過渡回居家生活空間。'
      : 'Decompress, transition from high-cognitive study to home space.',
  });
  currentMin += params.commuteMinutes;

  const returnMinutes = currentMin;
  const returnTime = minutesToTime(returnMinutes);

  // 6. Post-Library Chore Cooldown (if any)
  if (postChoreDuration > 0) {
    blocks.push({
      id: 'block-post-chore',
      title: isZh ? '圖書館返家放鬆雜務' : 'Post-Library Chore Cooldown',
      startTime: minutesToTime(currentMin),
      endTime: minutesToTime(currentMin + postChoreDuration),
      startMinutes: currentMin,
      durationMinutes: postChoreDuration,
      type: 'chore_cooldown',
      tasks: postLibraryTasks,
      description: isZh
        ? `進行 ${postLibraryTasks.length} 項體力型重複家務，讓前額葉皮質深層休息。`
        : `Mindless physical chores (${postLibraryTasks.length} tasks) to relax prefrontal cortex.`,
    });
    currentMin += postChoreDuration;
  }

  // 7. Dinner & Relaxing Free Time until sleep
  const sleepMin = timeToMinutes(params.sleepTime);
  let eveningDuration = sleepMin > currentMin ? sleepMin - currentMin : 120;
  if (eveningDuration < 60) eveningDuration = 60;

  blocks.push({
    id: 'block-evening',
    title: isZh ? '晚餐與無負擔自由放鬆' : 'Dinner & Guilt-Free Rest',
    startTime: minutesToTime(currentMin),
    endTime: minutesToTime(currentMin + eveningDuration),
    startMinutes: currentMin,
    durationMinutes: eveningDuration,
    type: 'leisure',
    description: isZh
      ? '享用晚餐、看劇、放鬆聊天。家務已清空，讀書目標也已達成！'
      : 'Relax, read, call friends or watch a show. Chores and study are both complete!',
  });

  return {
    blocks,
    totalChoreMinutes: preChoreDuration + postChoreDuration,
    uninterruptedStudyMinutes: studyDuration,
    departureTime,
    returnTime,
  };
}
