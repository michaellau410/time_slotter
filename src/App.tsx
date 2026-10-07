/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { TopNav } from './components/TopNav';
import { TimelineView } from './components/TimelineView';
import { TaskInputSection } from './components/TaskInputSection';
import { StrategySection } from './components/StrategySection';
import { ChoreSprintModal } from './components/ChoreSprintModal';
import { LibraryFocusModal } from './components/LibraryFocusModal';
import { SettingsDrawer } from './components/SettingsDrawer';
import { Task, StrategyId, DayParameters, RoutineTemplate } from './types';
import { INITIAL_TASKS, DEFAULT_DAY_PARAMETERS } from './data/defaults';
import { generateSchedule } from './utils/scheduler';

export default function App() {
  // Tab state: 'schedule' | 'tasks' | 'strategies'
  const [currentTab, setCurrentTab] = useState<'schedule' | 'tasks' | 'strategies'>('schedule');

  // Modals state
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Local storage persisted state
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('sanctuary_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore local storage error
    }
    return INITIAL_TASKS;
  });

  const [strategy, setStrategy] = useState<StrategyId>(() => {
    try {
      const saved = localStorage.getItem('sanctuary_strategy');
      if (saved) return saved as StrategyId;
    } catch (e) {
      // Ignore
    }
    return 'consolidated_sprint';
  });

  const [dayParams, setDayParams] = useState<DayParameters>(() => {
    try {
      const saved = localStorage.getItem('sanctuary_params');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return DEFAULT_DAY_PARAMETERS;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('sanctuary_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('sanctuary_strategy', strategy);
    } catch (e) {}
  }, [strategy]);

  useEffect(() => {
    try {
      localStorage.setItem('sanctuary_params', JSON.stringify(dayParams));
    } catch (e) {}
  }, [dayParams]);

  // Dynamic schedule computation
  const schedule = useMemo(() => {
    return generateSchedule(tasks, strategy, dayParams);
  }, [tasks, strategy, dayParams]);

  // Task actions
  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: `t-${Date.now()}`,
      completed: false,
    };
    setTasks(prev => [task, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdateTaskEstimate = (id: string, newMinutes: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, estimateMinutes: newMinutes } : t))
    );
  };

  const handleApplyTemplate = (template: RoutineTemplate) => {
    const templatedTasks: Task[] = template.tasks.map((t, idx) => ({
      ...t,
      id: `tpl-${Date.now()}-${idx}`,
      completed: false,
    }));
    setTasks(templatedTasks);
    if (template.defaultParams) {
      setDayParams(prev => ({
        ...prev,
        ...template.defaultParams,
      }));
    }
  };

  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  const handleCompleteAllTasks = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: true })));
  };

  // When a chore thought pops up in Library mode, quarantine it to post-library tasks!
  const handleAddQuarantinedChore = (choreTitle: string) => {
    const task: Task = {
      id: `quarantine-${Date.now()}`,
      title: choreTitle,
      estimateMinutes: 10,
      category: 'quick_tidy',
      type: 'active',
      placement: 'post_library',
      completed: false,
      notes: 'Captured during library deep work session',
    };
    setTasks(prev => [...prev, task]);
  };

  const activeChoreCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* 3-Zone Compliant Top Navigation */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSprint={() => setIsSprintOpen(true)}
        onOpenLibraryMode={() => setIsLibraryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeChoreCount={activeChoreCount}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'schedule' && (
          <TimelineView
            schedule={schedule}
            strategyId={strategy}
            dayParams={dayParams}
            onOpenSprint={() => setIsSprintOpen(true)}
            onOpenLibraryMode={() => setIsLibraryOpen(true)}
            onSelectStrategyTab={() => setCurrentTab('strategies')}
            onSelectTaskTab={() => setCurrentTab('tasks')}
            tasks={tasks}
          />
        )}

        {currentTab === 'tasks' && (
          <TaskInputSection
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskEstimate={handleUpdateTaskEstimate}
            onApplyTemplate={handleApplyTemplate}
            onClearCompleted={handleClearCompleted}
            libraryHours={dayParams.libraryTargetHours}
          />
        )}

        {currentTab === 'strategies' && (
          <StrategySection
            currentStrategy={strategy}
            onSelectStrategy={setStrategy}
            onGoToTimeline={() => setCurrentTab('schedule')}
          />
        )}
      </main>

      {/* Simple, Non-ornamental Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">Sanctuary</span>
            <span aria-hidden="true">·</span>
            <span>Standalone Time Batching for Solo Living Students</span>
            <span aria-hidden="true">·</span>
            <span>100% Client-Side Private Storage</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (confirm('Reset to standard student routine template?')) {
                  setTasks(INITIAL_TASKS);
                  setStrategy('consolidated_sprint');
                  setDayParams(DEFAULT_DAY_PARAMETERS);
                }
              }}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
            <span aria-hidden="true">·</span>
            <span>Protects Deep Study Hours</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ChoreSprintModal
        tasks={tasks}
        isOpen={isSprintOpen}
        onClose={() => setIsSprintOpen(false)}
        onCompleteTask={handleToggleTask}
        onCompleteAll={handleCompleteAllTasks}
      />

      <LibraryFocusModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        studyTopic={dayParams.studyTopic}
        targetHours={dayParams.libraryTargetHours}
        onAddQuarantinedChore={handleAddQuarantinedChore}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        params={dayParams}
        onSave={setDayParams}
      />
    </div>
  );
}
