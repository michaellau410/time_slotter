import React from 'react';
import { 
  Clock, 
  MapPin, 
  BookOpen, 
  Play, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Home, 
  Coffee, 
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { ScheduleBlock, StrategyId, Task, DayParameters } from '../types';
import { STRATEGIES } from '../data/defaults';
import { formatMinutesDuration } from '../utils/scheduler';

interface TimelineViewProps {
  schedule: {
    blocks: ScheduleBlock[];
    totalChoreMinutes: number;
    uninterruptedStudyMinutes: number;
    departureTime: string;
    returnTime: string;
  };
  strategyId: StrategyId;
  dayParams: DayParameters;
  onOpenSprint: () => void;
  onOpenLibraryMode: () => void;
  onSelectStrategyTab: () => void;
  onSelectTaskTab: () => void;
  tasks: Task[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  schedule,
  strategyId,
  dayParams,
  onOpenSprint,
  onOpenLibraryMode,
  onSelectStrategyTab,
  onSelectTaskTab,
  tasks,
}) => {
  const currentStrategy = STRATEGIES.find(s => s.id === strategyId) || STRATEGIES[0];
  const pendingTasks = tasks.filter(t => !t.completed);

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Hero Schedule Announcement Card */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-md border border-stone-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Protected Flow Architecture
              </span>
              <span className="text-stone-500">·</span>
              <button
                onClick={onSelectStrategyTab}
                className="text-xs text-stone-300 hover:text-white underline decoration-stone-600 underline-offset-2 transition-colors"
              >
                Strategy: {currentStrategy.name.split('.')[1]?.trim() || currentStrategy.name}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {formatMinutesDuration(schedule.uninterruptedStudyMinutes)} Unbroken Library Focus Block
            </h1>

            <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
              Household chores have been bundled into dedicated batch windows. Your afternoon library session is mathematically shielded from chore debt.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-300 font-mono">
              <div className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Depart Home:</span>
                <span className="text-amber-400 font-bold tabular-nums">{schedule.departureTime}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                <span>Return Home:</span>
                <span className="text-emerald-400 font-bold tabular-nums">{schedule.returnTime}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Chore Overhead:</span>
                <span className="text-blue-300 font-bold tabular-nums">{formatMinutesDuration(schedule.totalChoreMinutes)}</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={onOpenSprint}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Speedrun Chores ({formatMinutesDuration(schedule.totalChoreMinutes)})</span>
            </button>

            <button
              onClick={onOpenLibraryMode}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Enter Library Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Visual Schedule Blocks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            Today's Chronological Master Flow
          </h2>
          <span className="text-xs text-stone-500">
            Wake: {dayParams.wakeTime} · Sleep: {dayParams.sleepTime}
          </span>
        </div>

        <div className="space-y-3">
          {schedule.blocks.map((block, index) => {
            const isLibrary = block.isLibraryBlock;
            const isChore = block.type === 'chore_sprint' || block.type === 'chore_cooldown';
            const isCommute = block.type === 'commute';

            return (
              <div
                key={block.id}
                className={`relative rounded-xl border transition-all ${
                  isLibrary
                    ? 'bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 text-white border-emerald-800/80 shadow-md p-5 sm:p-6 ring-1 ring-emerald-500/20'
                    : isChore
                    ? 'bg-amber-50/50 border-amber-300/80 p-4 sm:p-5'
                    : isCommute
                    ? 'bg-stone-100/70 border-stone-200 p-3 sm:p-4'
                    : 'bg-white border-stone-200 p-4'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Time Column */}
                    <div className="shrink-0 text-left min-w-[95px]">
                      <div className={`font-mono text-xs sm:text-sm font-bold tabular-nums ${isLibrary ? 'text-emerald-400' : 'text-stone-800'}`}>
                        {block.startTime} – {block.endTime}
                      </div>
                      <div className={`text-[11px] font-mono tabular-nums ${isLibrary ? 'text-emerald-300/70' : 'text-stone-400'}`}>
                        ({formatMinutesDuration(block.durationMinutes)})
                      </div>
                    </div>

                    {/* Block Content */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold text-sm sm:text-base ${isLibrary ? 'text-white' : 'text-stone-900'}`}>
                          {block.title}
                        </h3>

                        {isLibrary && (
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                            Sacred Sanctuary Block
                          </span>
                        )}

                        {isChore && (
                          <span className="text-[10px] font-semibold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">
                            Batched Window
                          </span>
                        )}
                      </div>

                      <p className={`text-xs sm:text-sm leading-relaxed ${isLibrary ? 'text-emerald-100/90' : 'text-stone-600'}`}>
                        {block.description}
                      </p>

                      {/* If chore block, list tasks */}
                      {block.tasks && block.tasks.length > 0 && (
                        <div className="pt-2">
                          <div className="text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
                            <span>Tasks packed inside this batch:</span>
                            <button
                              onClick={onSelectTaskTab}
                              className="text-[11px] text-amber-700 hover:underline"
                            >
                              Edit Tasks & Estimates
                            </button>
                          </div>
                          <div className="space-y-1">
                            {block.tasks.map((t) => (
                              <div
                                key={t.id}
                                className="flex items-center justify-between text-xs bg-white/80 border border-stone-200/60 rounded px-2.5 py-1"
                              >
                                <span className="text-stone-800 truncate mr-2">
                                  {t.title}
                                </span>
                                <span className="font-mono text-stone-500 tabular-nums shrink-0">
                                  {t.estimateMinutes}m
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions for specific blocks */}
                  <div className="shrink-0 flex sm:flex-col items-center gap-2 pt-2 sm:pt-0">
                    {isChore && (
                      <button
                        onClick={onOpenSprint}
                        className="w-full text-xs font-semibold px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3 h-3 text-amber-400 fill-current" />
                        <span>Run Timer</span>
                      </button>
                    )}

                    {isLibrary && (
                      <button
                        onClick={onOpenLibraryMode}
                        className="w-full text-xs font-bold px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Launch Study Room</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Scientific Before vs After Comparison */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Why This Saves Your Academic Semester
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
            <div className="font-bold text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              The Fragmented "Living Alone" Trap
            </div>
            <ul className="space-y-1.5 text-stone-600 text-xs leading-relaxed">
              <li>• You wake up and wash 1 breakfast dish (10m).</li>
              <li>• You sit down to study at your desk, but notice the dirty floor and grab the broom (20m).</li>
              <li>• You prepare lunch and dirty another pot (45m).</li>
              <li>• By 3:00 PM, you realize you haven't left for the library yet. You feel drained without having done real studying.</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-200/80 space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              The Sanctuary Batched Architecture
            </div>
            <ul className="space-y-1.5 text-amber-900/90 text-xs leading-relaxed">
              <li>• All tasks are calculated upfront with estimated minutes.</li>
              <li>• Speedrun chores in a single focused morning blitz.</li>
              <li>• Depart at a fixed time ({schedule.departureTime}) without guilt.</li>
              <li>• Enjoy {formatMinutesDuration(schedule.uninterruptedStudyMinutes)} of deep, distraction-free flow state at the library.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
