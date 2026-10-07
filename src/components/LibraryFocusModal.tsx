import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  Plus, 
  Coffee,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Task, Language } from '../types';
import { translations } from '../i18n/translations';

interface LibraryFocusModalProps {
  isOpen: boolean;
  onClose: () => void;
  studyTopic: string;
  targetHours: number;
  onAddQuarantinedChore: (choreTitle: string) => void;
  lang: Language;
}

export const LibraryFocusModal: React.FC<LibraryFocusModalProps> = ({
  isOpen,
  onClose,
  studyTopic,
  targetHours,
  onAddQuarantinedChore,
  lang,
}) => {
  const t = translations[lang].libraryModal;
  const packingItems = translations[lang].packingItems;
  const isZh = lang === 'zh-TW';

  const [activeTab, setActiveTab] = useState<'timer' | 'quarantine' | 'checklist'>('timer');
  const [activeTopic, setActiveTopic] = useState<string>(studyTopic || (isZh ? '數學與高等演算' : 'Mathematics Deep Work'));
  const [studySeconds, setStudySeconds] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [choreThought, setChoreThought] = useState('');
  const [quarantineSuccess, setQuarantineSuccess] = useState(false);

  useEffect(() => {
    if (studyTopic) {
      setActiveTopic(studyTopic);
    }
  }, [studyTopic]);
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    packingItems.forEach(item => {
      initial[item] = true;
    });
    return initial;
  });

  useEffect(() => {
    let interval: any = null;
    if (isStudying) {
      interval = setInterval(() => {
        setStudySeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  if (!isOpen) return null;

  const targetSeconds = Math.round(targetHours * 3600);
  const progressPercent = Math.min(100, (studySeconds / (targetSeconds || 1)) * 100);

  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleQuarantineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!choreThought.trim()) return;

    onAddQuarantinedChore(choreThought.trim());
    setChoreThought('');
    setQuarantineSuccess(true);
    setTimeout(() => setQuarantineSuccess(false), 3000);
  };

  const toggleChecklistItem = (item: string) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-stone-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-bold text-sm tracking-wide text-white block">
                {t.badge}
              </span>
              <span className="text-[11px] text-stone-400">
                {t.zeroDistraction}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Nav Tabs */}
            <div className="flex items-center bg-stone-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('timer')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'timer' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                {t.tabDeepWork}
              </button>
              <button
                onClick={() => setActiveTab('quarantine')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'quarantine' ? 'bg-stone-700 text-amber-400 font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                {t.tabQuarantine}
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'checklist' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                {t.tabChecklist}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Deep Work Timer */}
        {activeTab === 'timer' && (
          <div className="p-6 sm:p-10 text-center space-y-6 overflow-y-auto">
            {/* Subject Banner */}
            <div className="bg-stone-800/80 border border-stone-700/60 rounded-xl p-4 max-w-md mx-auto space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block">
                {t.targetTitle}
              </span>
              <h2 className="text-lg font-bold text-white">
                {activeTopic}
              </h2>
              {/* Quick 3-Subject Switcher */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTopic(isZh ? '數學（深度演算與微積分）' : 'Maths (Proofs & Calculus)')}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTopic.includes('Math') || activeTopic.includes('數學')
                      ? 'bg-amber-400 text-stone-900 font-bold'
                      : 'bg-stone-700/80 text-stone-300 hover:text-white'
                  }`}
                >
                  📐 {isZh ? '數學' : 'Maths'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTopic(isZh ? 'AI 線上課程（影片＋PyTorch 代碼實作）' : 'A.I. Course (Videos & Python Code)')}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTopic.includes('AI') || activeTopic.includes('課程')
                      ? 'bg-blue-500 text-white font-bold'
                      : 'bg-stone-700/80 text-stone-300 hover:text-white'
                  }`}
                >
                  💻 {isZh ? 'AI 課程' : 'A.I. Course'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTopic(isZh ? '日語文法與讀解（安靜自修）' : 'Japanese (Grammar & Reading)')}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTopic.includes('Japanese') || activeTopic.includes('日語')
                      ? 'bg-rose-500 text-white font-bold'
                      : 'bg-stone-700/80 text-stone-300 hover:text-white'
                  }`}
                >
                  🌸 {isZh ? '日語' : 'Japanese'}
                </button>
              </div>
            </div>

            {/* Huge Timer */}
            <div className="py-4">
              <div className="font-mono text-6xl sm:text-7xl font-extrabold text-emerald-400 tracking-tight tabular-nums">
                {formatTime(studySeconds)}
              </div>
              <div className="text-xs text-stone-400 font-mono mt-3">
                {t.targetProgress(targetHours, Math.round(progressPercent))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto bg-stone-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsStudying(!isStudying)}
                className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                  isStudying
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                }`}
              >
                {isStudying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>{t.pauseSession}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{studySeconds === 0 ? t.beginDeepWork : t.resumeFlow}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsStudying(false);
                  setStudySeconds(0);
                }}
                className="p-3.5 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                title={t.resetTooltip}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quiet Philosophy Rule */}
            <div className="pt-4 text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              {t.peaceRule}
            </div>
          </div>
        )}

        {/* Tab 2: Chore Quarantine Scratchpad */}
        {activeTab === 'quarantine' && (
          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>{t.quarantineTitle}</span>
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.quarantineDesc}
              </p>
            </div>

            <form onSubmit={handleQuarantineSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={choreThought}
                  onChange={(e) => setChoreThought(e.target.value)}
                  placeholder={t.quarantinePlaceholder}
                  className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.quarantineBtn}</span>
                </button>
              </div>

              {quarantineSuccess && (
                <div className="p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{t.quarantineSuccess}</span>
                </div>
              )}
            </form>

            <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-800 text-xs text-stone-400 space-y-1">
              <span className="font-semibold text-stone-300 block">{t.psychologyTitle}</span>
              <p>
                {t.psychologyDesc}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Bag Checklist */}
        {activeTab === 'checklist' && (
          <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
            <div>
              <h3 className="font-bold text-base text-white">
                {t.checklistTitle}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {t.checklistDesc}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {packingItems.map((item) => {
                const isChecked = checklist[item] ?? true;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChecklistItem(item)}
                    className="w-full p-3 rounded-xl bg-stone-800/70 hover:bg-stone-800 border border-stone-700/60 flex items-center gap-3 text-left transition-colors cursor-pointer"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-500 shrink-0" />
                    )}
                    <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-stone-200' : 'text-stone-400 line-through'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

