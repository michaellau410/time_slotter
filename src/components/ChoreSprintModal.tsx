import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  Check, 
  Plus, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Task } from '../types';

interface ChoreSprintModalProps {
  tasks: Task[];
  isOpen: boolean;
  onClose: () => void;
  onCompleteTask: (id: string) => void;
  onCompleteAll: () => void;
}

export const ChoreSprintModal: React.FC<ChoreSprintModalProps> = ({
  tasks,
  isOpen,
  onClose,
  onCompleteTask,
  onCompleteAll,
}) => {
  const sprintTasks = tasks.filter(t => !t.completed && t.type === 'active');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentTask = sprintTasks[currentIndex];

  // Initialize timer when task changes
  useEffect(() => {
    if (currentTask) {
      setSecondsRemaining(currentTask.estimateMinutes * 60);
      setIsRunning(true);
    }
  }, [currentIndex, currentTask?.id]);

  // Countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            // Beep audio synthetic cue
            if (soundEnabled && typeof window !== 'undefined') {
              try {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                osc.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
              } catch (e) {
                // AudioContext might be restricted until user gesture
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, soundEnabled]);

  if (!isOpen) return null;

  const handleDoneCurrent = () => {
    if (currentTask) {
      onCompleteTask(currentTask.id);
    }
    if (currentIndex < sprintTasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all
      onCompleteAll();
      onClose();
    }
  };

  const handleSkip = () => {
    if (currentIndex < sprintTasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleAddMinutes = (mins: number) => {
    setSecondsRemaining(prev => prev + mins * 60);
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalOriginalSeconds = currentTask ? currentTask.estimateMinutes * 60 : 1;
  const progressPercent = Math.max(0, Math.min(100, ((totalOriginalSeconds - secondsRemaining) / totalOriginalSeconds) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-stone-100 flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide text-white uppercase">
              Chore Speedrun Mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {sprintTasks.length === 0 ? (
          <div className="p-8 text-center space-y-4">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">All Chores Cleared!</h3>
            <p className="text-sm text-stone-300 max-w-xs mx-auto">
              Your apartment is reset. Grab your bag and head straight to the library!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Ready to Depart for Library
            </button>
          </div>
        ) : !currentTask ? (
          <div className="p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Sprint Completed!</h3>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-amber-400 text-stone-900 font-bold text-sm rounded-xl transition-colors"
            >
              Close Runner
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Step Counter */}
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Task {currentIndex + 1} of {sprintTasks.length}</span>
              <span>Estimated: {currentTask.estimateMinutes}m</span>
            </div>

            {/* Task Name Title */}
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                Current Objective
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {currentTask.title}
              </h3>
            </div>

            {/* Digital Clock Display */}
            <div className="text-center py-2">
              <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-amber-400 tabular-nums">
                {formatTimer(secondsRemaining)}
              </div>
              <p className="text-xs text-stone-400 mt-2">
                {secondsRemaining === 0 ? 'Time up! Wrap it up swiftly!' : 'Focus strictly on this chore — zero phone checks.'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isRunning ? 'Pause Timer' : 'Resume Timer'}</span>
                </button>

                <button
                  onClick={() => handleAddMinutes(2)}
                  className="px-3 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-xs rounded-xl transition-colors"
                  title="Add 2 minutes"
                >
                  +2m
                </button>

                <button
                  onClick={handleDoneCurrent}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Done & Next</span>
                </button>
              </div>

              {currentIndex < sprintTasks.length - 1 && (
                <div className="flex items-center justify-between pt-2 text-xs text-stone-400">
                  <span className="truncate mr-2">
                    Next up: <strong className="text-stone-300">{sprintTasks[currentIndex + 1]?.title}</strong>
                  </span>
                  <button
                    onClick={handleSkip}
                    className="hover:text-white transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Skip</span>
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
