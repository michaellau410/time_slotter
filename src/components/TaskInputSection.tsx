import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Layers, 
  Flame, 
  RefreshCw, 
  Cpu, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { Task, ChoreCategory, ChoreType, ChorePlacement, RoutineTemplate, Language } from '../types';
import { ROUTINE_TEMPLATES, ROUTINE_TEMPLATES_ZH } from '../data/defaults';
import { translations } from '../i18n/translations';
import { formatMinutesDuration } from '../utils/scheduler';

interface TaskInputSectionProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTaskEstimate: (id: string, newMinutes: number) => void;
  onApplyTemplate: (template: RoutineTemplate) => void;
  onClearCompleted: () => void;
  libraryHours: number;
  lang: Language;
}

const QUICK_PRESETS_EN = [
  'Wash breakfast dishes',
  'Take out trash & recycling',
  'Start washing machine',
  'Hang clothes on drying rack',
  'Wipe desk & make bed',
  'Vacuum bedroom floor',
  'Grocery run for essentials',
  'Prep dinner ingredients',
];

const QUICK_PRESETS_ZH = [
  '清洗早餐碗盤',
  '倒垃圾與回收',
  '啟動洗衣機',
  '曬衣服掛衣架',
  '整理書桌與鋪床',
  '房間吸地掃地',
  '超市採買生活用品',
  '晚餐備料煮飯',
];

export const TaskInputSection: React.FC<TaskInputSectionProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTaskEstimate,
  onApplyTemplate,
  onClearCompleted,
  libraryHours,
  lang,
}) => {
  const [title, setTitle] = useState('');
  const [estimateMinutes, setEstimateMinutes] = useState<number>(15);
  const [category, setCategory] = useState<ChoreCategory>('kitchen');
  const [type, setType] = useState<ChoreType>('active');
  const [placement, setPlacement] = useState<ChorePlacement>('auto');

  const t = translations[lang];
  const tInput = t.taskInput;
  const tStats = t.stats;
  const categories = t.categories;
  const quickPresets = lang === 'zh-TW' ? QUICK_PRESETS_ZH : QUICK_PRESETS_EN;
  const templates = lang === 'zh-TW' ? ROUTINE_TEMPLATES_ZH : ROUTINE_TEMPLATES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      estimateMinutes: Math.max(1, estimateMinutes || 10),
      category,
      type,
      placement,
    });

    setTitle('');
  };

  const activeTasks = tasks.filter(tItem => !tItem.completed);
  const totalActiveMins = activeTasks
    .filter(tItem => tItem.type === 'active')
    .reduce((sum, tItem) => sum + tItem.estimateMinutes, 0);

  const totalPassiveMins = activeTasks
    .filter(tItem => tItem.type === 'passive')
    .reduce((sum, tItem) => sum + tItem.estimateMinutes, 0);

  const completedCount = tasks.filter(tItem => tItem.completed).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
        <div className="p-2 sm:p-3">
          <span className="text-xs text-stone-500 font-medium block">{tStats.activeChoreOverhead}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-stone-900 tabular-nums">
            {formatMinutesDuration(totalActiveMins, lang)}
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">{tStats.activeChoreSubtitle}</span>
        </div>

        <div className="p-2 sm:p-3">
          <span className="text-xs text-stone-500 font-medium block">{tStats.passiveWaiting}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-blue-700 tabular-nums">
            {formatMinutesDuration(totalPassiveMins, lang)}
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">{tStats.passiveSubtitle}</span>
        </div>

        <div className="p-2 sm:p-3">
          <span className="text-xs text-stone-500 font-medium block">{tStats.protectedStudyBlock}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            {libraryHours}h 00m
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">{tStats.protectedStudySubtitle}</span>
        </div>

        <div className="p-2 sm:p-3">
          <span className="text-xs text-stone-500 font-medium block">{tStats.distractionsEliminated}</span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-amber-600 tabular-nums">
            {activeTasks.length > 0 ? `${activeTasks.length} ${tStats.blocksCount}` : '0'}
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">{tStats.distractionsSubtitle}</span>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {tInput.title}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {tInput.subtitle}
            </p>
          </div>

          {/* Quick preset templates */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-xs text-stone-400 font-medium">{tInput.quickPresetLabel}</span>
            {templates.map(tpl => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onApplyTemplate(tpl)}
                className="px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                title={tpl.description}
              >
                {tpl.name.split('（')[0].split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Task Name Input */}
            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>{tInput.taskNameLabel}</span>
                <span className="text-stone-400 font-normal text-[11px]">
                  {lang === 'zh-TW' ? '如：清洗碗盤、啟動洗衣機' : 'e.g. Wash dishes, start laundry'}
                </span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={tInput.taskNamePlaceholder}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-900 placeholder:text-stone-400"
                required
              />
            </div>

            {/* Estimated Minutes */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>{tInput.estimateLabel}</span>
                <span className="text-amber-700 font-mono text-[11px] font-semibold">{estimateMinutes} min</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={estimateMinutes}
                  onChange={(e) => setEstimateMinutes(parseInt(e.target.value) || 5)}
                  className="w-20 px-3 py-2 text-sm font-mono text-center bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                />
                <div className="flex items-center gap-1 flex-1">
                  {[5, 10, 15, 25].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setEstimateMinutes(m)}
                      className={`flex-1 py-2 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                        estimateMinutes === m
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>{tInput.addBtn}</span>
              </button>
            </div>
          </div>

          {/* Secondary Parameters */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-stone-500">{tInput.categoryLabel}</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ChoreCategory)}
                className="bg-stone-100 border border-stone-300 rounded-md px-2 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="kitchen">{categories.kitchen}</option>
                <option value="laundry">{categories.laundry}</option>
                <option value="cleaning">{categories.cleaning}</option>
                <option value="errands">{categories.errands}</option>
                <option value="meal_prep">{categories.meal_prep}</option>
                <option value="quick_tidy">{categories.quick_tidy}</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-medium text-stone-500">{tInput.natureLabel}</span>
              <div className="inline-flex rounded-md bg-stone-100 p-0.5 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setType('active')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    type === 'active'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tInput.activeEffort}
                </button>
                <button
                  type="button"
                  onClick={() => setType('passive')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    type === 'passive'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tInput.passiveMachine}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-medium text-stone-500">{tInput.placementLabel}</span>
              <div className="inline-flex rounded-md bg-stone-100 p-0.5 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setPlacement('auto')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    placement === 'auto'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tInput.autoArrange}
                </button>
                <button
                  type="button"
                  onClick={() => setPlacement('pre_library')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    placement === 'pre_library'
                      ? 'bg-amber-100 text-amber-900 font-semibold shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tInput.beforeLibrary}
                </button>
                <button
                  type="button"
                  onClick={() => setPlacement('post_library')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    placement === 'post_library'
                      ? 'bg-stone-800 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tInput.afterReturn}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Click Common Chores Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-stone-400">{tInput.commonChoresLabel}</span>
            {quickPresets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setTitle(p);
                  if (p.includes('dishes') || p.includes('碗')) {
                    setCategory('kitchen');
                    setEstimateMinutes(15);
                  } else if (p.includes('trash') || p.includes('垃圾')) {
                    setCategory('errands');
                    setEstimateMinutes(5);
                  } else if (p.includes('machine') || p.includes('洗衣機')) {
                    setCategory('laundry');
                    setType('passive');
                    setEstimateMinutes(5);
                  } else if (p.includes('clothes') || p.includes('衣服')) {
                    setCategory('laundry');
                    setEstimateMinutes(15);
                  } else if (p.includes('desk') || p.includes('bed') || p.includes('書桌') || p.includes('床')) {
                    setCategory('quick_tidy');
                    setEstimateMinutes(10);
                  } else if (p.includes('Vacuum') || p.includes('掃地') || p.includes('吸地')) {
                    setCategory('cleaning');
                    setEstimateMinutes(15);
                  } else if (p.includes('Grocery') || p.includes('採買')) {
                    setCategory('errands');
                    setEstimateMinutes(30);
                  } else if (p.includes('dinner') || p.includes('備料') || p.includes('煮飯')) {
                    setCategory('meal_prep');
                    setEstimateMinutes(20);
                  }
                }}
                className="text-[11px] text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 px-2 py-0.5 rounded transition-colors cursor-pointer"
              >
                + {p}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Task Queue List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-stone-900 text-base">
              {tInput.queuedTitle(tasks.length)}
            </h3>
            <span className="text-xs text-stone-500">
              {tInput.pendingCount(tasks.filter(tItem => !tItem.completed).length)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {completedCount > 0 && (
              <button
                type="button"
                onClick={onClearCompleted}
                className="text-xs text-stone-500 hover:text-stone-800 px-2 py-1 rounded transition-colors cursor-pointer"
              >
                {tInput.clearCompleted(completedCount)}
              </button>
            )}
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <FolderOpen className="w-10 h-10 mx-auto text-stone-300 stroke-1" />
            <div className="font-medium text-stone-800">{tInput.emptyTitle}</div>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {tInput.emptySubtitle}
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => onApplyTemplate(templates[0])}
                className="text-xs font-semibold px-3 py-1.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 cursor-pointer"
              >
                {tInput.loadTemplateBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {tasks.map((task) => {
              const catName = categories[task.category] || task.category;
              return (
                <div
                  key={task.id}
                  className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                    task.completed ? 'bg-stone-50/60 opacity-60' : 'hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => onToggleTask(task.id)}
                      className="text-stone-400 hover:text-amber-600 transition-colors shrink-0 cursor-pointer"
                      aria-label="Toggle task completion"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className={`text-sm font-medium truncate ${task.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {task.title}
                      </div>

                      {/* Clean Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span className="font-medium text-stone-600">{catName}</span>
                        <span aria-hidden="true">·</span>
                        {task.type === 'passive' ? (
                          <span className="text-blue-600 font-medium">{tInput.passiveMachineWait}</span>
                        ) : (
                          <span>{tInput.activeEffort}</span>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>
                          {task.placement === 'pre_library' 
                            ? tInput.beforeLibraryBadge 
                            : task.placement === 'post_library' 
                            ? tInput.afterReturnBadge 
                            : tInput.autoArrangedBadge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 bg-stone-100 rounded-lg px-2 py-1">
                      <button
                        type="button"
                        onClick={() => onUpdateTaskEstimate(task.id, Math.max(5, task.estimateMinutes - 5))}
                        className="text-stone-500 hover:text-stone-900 text-xs px-1 font-mono font-bold cursor-pointer"
                        title="Reduce 5 min"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-semibold text-stone-800 tabular-nums min-w-[32px] text-center">
                        {task.estimateMinutes}m
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateTaskEstimate(task.id, task.estimateMinutes + 5)}
                        className="text-stone-500 hover:text-stone-900 text-xs px-1 font-mono font-bold cursor-pointer"
                        title="Add 5 min"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                      title="Delete task"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

