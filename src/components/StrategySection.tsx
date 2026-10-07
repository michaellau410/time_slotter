import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Building2, 
  Cpu, 
  Timer, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { StrategyId, Language } from '../types';
import { translations, STRATEGY_DETAILS_I18N } from '../i18n/translations';

interface StrategySectionProps {
  currentStrategy: StrategyId;
  onSelectStrategy: (id: StrategyId) => void;
  onGoToTimeline: () => void;
  lang: Language;
}

export const StrategySection: React.FC<StrategySectionProps> = ({
  currentStrategy,
  onSelectStrategy,
  onGoToTimeline,
  lang,
}) => {
  const t = translations[lang].strategiesView;
  const stratDetails = STRATEGY_DETAILS_I18N[lang];

  const strategyIds: StrategyId[] = [
    'consolidated_sprint',
    'library_bookends',
    'two_zone_partition',
    'passive_parallelizer',
  ];

  const getIcon = (id: StrategyId) => {
    switch (id) {
      case 'consolidated_sprint':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 'library_bookends':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'two_zone_partition':
        return <Building2 className="w-5 h-5 text-indigo-600" />;
      case 'passive_parallelizer':
        return <Cpu className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Intro Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>{t.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          {t.heroTitle}
        </h2>
        <p className="mt-3 text-stone-600 leading-relaxed text-sm sm:text-base max-w-3xl">
          {t.heroDescription}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-lg bg-red-50/60 border border-red-100 text-sm">
            <div className="font-semibold text-red-900 flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-red-600" />
              {t.fragmentedTrapTitle}
            </div>
            <p className="text-red-800/90 text-xs sm:text-sm leading-relaxed">
              {t.fragmentedTrapDesc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-100 text-sm">
            <div className="font-semibold text-emerald-900 flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t.sanctuaryMethodTitle}
            </div>
            <p className="text-emerald-800/90 text-xs sm:text-sm leading-relaxed">
              {t.sanctuaryMethodDesc}
            </p>
          </div>
        </div>
      </div>

      {/* The 4-5 Architectural Models */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-stone-900 px-1">
          {t.selectModelTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {strategyIds.map((stratId) => {
            const strat = stratDetails[stratId];
            const isSelected = currentStrategy === stratId;
            return (
              <div
                key={stratId}
                className={`relative rounded-xl p-6 transition-all border ${
                  isSelected
                    ? 'bg-amber-50/40 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-stone-100 rounded-lg">
                      {getIcon(stratId)}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-base">
                        {strat.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium mt-0.5">
                        {t.bestForPrefix}{strat.bestFor}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                      {t.activeBadge}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm text-stone-700 leading-relaxed font-normal">
                  {strat.description}
                </p>

                <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    {t.coreRulesTitle}
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {strat.principles.map((pr, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">·</span>
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      onSelectStrategy(stratId);
                      onGoToTimeline();
                    }}
                    className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-stone-900 hover:bg-amber-400'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <span>{isSelected ? t.configuredBtn : t.applyStrategyBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus Idea 5: Parkinson's Law Speedrun Insight */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-7 border border-stone-800 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-stone-800 rounded-xl shrink-0">
            <Timer className="w-6 h-6 text-amber-400" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">
              {t.parkinsonTitle}
            </h4>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t.parkinsonDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

