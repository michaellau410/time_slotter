import React from 'react';
import { Sparkles, BookOpen, Clock, Settings, Play, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TopNavProps {
  currentTab: 'schedule' | 'tasks' | 'strategies';
  onSelectTab: (tab: 'schedule' | 'tasks' | 'strategies') => void;
  onOpenSprint: () => void;
  onOpenLibraryMode: () => void;
  onOpenSettings: () => void;
  activeChoreCount: number;
  lang: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenSprint,
  onOpenLibraryMode,
  onOpenSettings,
  activeChoreCount,
  lang,
  onToggleLanguage,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('schedule')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              {t.appName}
            </span>
            <span className="hidden sm:inline text-xs text-stone-400 ml-2 font-normal">
              {t.appSubtitle}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('schedule')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'schedule'
                ? 'bg-stone-800 text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            {t.nav.timeline}
          </button>
          <button
            onClick={() => onSelectTab('tasks')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'tasks'
                ? 'bg-stone-800 text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <span>{t.nav.tasks}</span>
            {activeChoreCount > 0 && (
              <span className="text-[10px] bg-stone-700 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                {activeChoreCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onSelectTab('strategies')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'strategies'
                ? 'bg-stone-800 text-amber-400 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.nav.strategies}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher Segmented Control */}
          <div className="inline-flex rounded-lg bg-stone-800/90 p-0.5 border border-stone-700/80 text-xs">
            <button
              type="button"
              onClick={() => onToggleLanguage('en')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                lang === 'en'
                  ? 'bg-stone-700 text-amber-400 font-semibold shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLanguage('zh-TW')}
              className={`px-2 py-1 rounded-md font-medium transition-all ${
                lang === 'zh-TW'
                  ? 'bg-stone-700 text-amber-400 font-semibold shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="切換為繁體中文"
            >
              繁中
            </button>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            title={t.nav.settings}
            aria-label={t.nav.settings}
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSprint}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.nav.startSprint}</span>
          </button>

          <button
            onClick={onOpenLibraryMode}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.nav.librarySanctuary}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

