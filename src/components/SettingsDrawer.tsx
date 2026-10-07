import React, { useState } from 'react';
import { X, Clock, MapPin, BookOpen, Moon, Sun, Save, Sliders } from 'lucide-react';
import { DayParameters } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  params: DayParameters;
  onSave: (newParams: DayParameters) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  params,
  onSave,
}) => {
  const [wakeTime, setWakeTime] = useState(params.wakeTime);
  const [sleepTime, setSleepTime] = useState(params.sleepTime);
  const [libraryTargetHours, setLibraryTargetHours] = useState(params.libraryTargetHours);
  const [commuteMinutes, setCommuteMinutes] = useState(params.commuteMinutes);
  const [studyTopic, setStudyTopic] = useState(params.studyTopic);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...params,
      wakeTime,
      sleepTime,
      libraryTargetHours: Number(libraryTargetHours),
      commuteMinutes: Number(commuteMinutes),
      studyTopic,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex justify-end">
      <div className="bg-stone-900 border-l border-stone-800 w-full max-w-md h-full shadow-2xl text-stone-100 flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">
              Daily Anchor Parameters
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-6 flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Study Target */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Library Study Target</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  {libraryTargetHours} Hours
                </span>
              </label>
              <input
                type="range"
                min="2"
                max="8"
                step="0.5"
                value={libraryTargetHours}
                onChange={(e) => setLibraryTargetHours(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>2.0h</span>
                <span>4.5h</span>
                <span>8.0h</span>
              </div>
            </div>

            {/* Study Topic */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">
                Primary Academic Topic Today
              </label>
              <input
                type="text"
                value={studyTopic}
                onChange={(e) => setStudyTopic(e.target.value)}
                placeholder="e.g. Econometrics Assignment, Organic Chemistry"
                className="w-full px-3.5 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Wake Up Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Wake Up Time</span>
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Transit / Commute Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>One-Way Transit to Library</span>
                </span>
                <span className="font-mono text-blue-400 font-bold tabular-nums">
                  {commuteMinutes} Minutes
                </span>
              </label>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={commuteMinutes}
                onChange={(e) => setCommuteMinutes(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>5m</span>
                <span>20m</span>
                <span>60m</span>
              </div>
            </div>

            {/* Sleep / Bedtime */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-purple-400" />
                <span>Evening Wind-Down / Bedtime</span>
              </label>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800">
            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Schedule Anchors</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
