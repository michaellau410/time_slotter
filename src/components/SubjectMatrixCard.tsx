import React, { useState } from 'react';
import { 
  Calculator, 
  Cpu, 
  Languages, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Lightbulb,
  Compass,
  Laptop
} from 'lucide-react';
import { Language, SubjectSlot } from '../types';
import { getSubjectRecommendations } from '../data/subjectRecommendations';

interface SubjectMatrixCardProps {
  lang: Language;
  onApplySubjectPlan: (topicTitle: string, targetHours: number) => void;
  onOpenLibraryWithSubject?: (subjectName: string) => void;
}

export const SubjectMatrixCard: React.FC<SubjectMatrixCardProps> = ({
  lang,
  onApplySubjectPlan,
  onOpenLibraryWithSubject,
}) => {
  const isZh = lang === 'zh-TW';
  const subjects = getSubjectRecommendations(lang);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('subj-maths');

  const getSubjectIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'maths':
        return <Calculator className="w-5 h-5 text-amber-500" />;
      case 'ai':
        return <Cpu className="w-5 h-5 text-blue-500" />;
      case 'japanese':
        return <Languages className="w-5 h-5 text-rose-500" />;
      default:
        return <Compass className="w-5 h-5 text-stone-500" />;
    }
  };

  const combinedTopicTitle = isZh
    ? '數學（120分） → AI 線上課程（105分） → 日語文法讀解（35分）'
    : 'Maths (120m) → A.I. Course (105m) → Japanese Grammar (35m)';

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-stone-900 text-stone-100 p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>{isZh ? '認知負荷排程指引' : 'Cognitive Load Allocation Guide'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {isZh ? '3大攻讀科目：最佳地點與時段科學配置' : '3-Subject Focus: Where & When to Study'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              {isZh
                ? '數學、AI 線上課程與日語擁有截然不同的認知特性。若全部混在同一地點或同一時段，會造成大腦工作記憶重載或昏睡。'
                : 'Maths, A.I. Online Courses, and Japanese have completely different cognitive profiles. Stacking them correctly prevents mental exhaustion.'}
            </p>
          </div>

          <button
            onClick={() => onApplySubjectPlan(combinedTopicTitle, 4.5)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isZh ? '一鍵套用3科排程至今日目標' : 'Apply 3-Subject Plan to Sanctuary'}</span>
          </button>
        </div>
      </div>

      {/* 3 Subject Cards Grid */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {subjects.map((subj) => {
            const isSelected = selectedSubjectId === subj.id;
            return (
              <div
                key={subj.id}
                onClick={() => setSelectedSubjectId(subj.id)}
                className={`rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/40 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                    : 'bg-stone-50/60 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-2xs">
                        {getSubjectIcon(subj.categoryKey)}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-base leading-tight">
                          {subj.name}
                        </h4>
                        <span className="text-[11px] text-stone-500 font-mono font-medium">
                          {subj.targetMinutes} {isZh ? '分鐘/日' : 'min/day'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Timeslot Badges */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-stone-200/80 space-y-1">
                      <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>{isZh ? '建議地點：' : 'Ideal Location:'}</span>
                      </div>
                      <div className="text-stone-600 pl-5 text-[11px] font-medium">
                        {subj.idealLocation}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-stone-200/80 space-y-1">
                      <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>{isZh ? '最佳時段：' : 'Suggested Timeslot:'}</span>
                      </div>
                      <div className="text-stone-600 pl-5 text-[11px] font-medium">
                        {subj.suggestedTimeslot}
                      </div>
                    </div>
                  </div>

                  {/* Scientific Rationale */}
                  <div className="text-xs text-stone-600 leading-relaxed">
                    <span className="font-semibold text-stone-800 block mb-1">
                      {isZh ? '生理與認知原理：' : 'Cognitive Rationale:'}
                    </span>
                    <p className="text-[12px] text-stone-600">
                      {subj.rationale}
                    </p>
                  </div>

                  {/* Recommended Activities */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                      {isZh ? '具體執行事項：' : 'Actionable Flow:'}
                    </span>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {subj.recommendedActivities.map((act, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-amber-600 font-bold">·</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pro tip box */}
                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-start gap-2 text-[11px] text-stone-500">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{subj.tips}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Day Timeline Blueprint */}
        <div className="p-5 rounded-xl bg-stone-100/70 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>{isZh ? '3科目全天無縫銜接藍圖（推薦一日實踐）' : 'Complete 3-Subject Seamless Daily Flow'}</span>
            </h4>
            <span className="text-[11px] text-stone-500 font-mono">
              {isZh ? '總專注：約 5.2 小時（含通勤碎片）' : 'Total Focus: ~5.2 hrs (with transit)'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="text-[11px] font-mono font-bold text-rose-600">
                09:30 – 09:50 · 🚇 {isZh ? '去程通勤' : 'Transit Out'}
              </div>
              <div className="font-bold text-stone-800">{isZh ? '日語 Anki 單字' : 'Japanese Anki Vocab'}</div>
              <div className="text-[11px] text-stone-500">
                {isZh ? '在車上刷 50 張單字卡或聽日語播客' : '50 Anki cards or listening podcast'}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="text-[11px] font-mono font-bold text-amber-600">
                10:00 – 12:00 · 🏛️ {isZh ? '圖書館靜音區' : 'Library Silent'}
              </div>
              <div className="font-bold text-stone-800">{isZh ? '數學高難度演算' : 'Mathematics Deep Work'}</div>
              <div className="text-[11px] text-stone-500">
                {isZh ? '大腦最清晰時段，紙筆證明與題庫推導' : 'Pencil & paper proofs, zero phone checks'}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="text-[11px] font-mono font-bold text-blue-600">
                13:00 – 14:45 · 💻 {isZh ? '圖書館筆電區' : 'Library Laptop'}
              </div>
              <div className="font-bold text-stone-800">{isZh ? 'A.I. 課程與代碼實作' : 'A.I. Course & Coding'}</div>
              <div className="text-[11px] text-stone-500">
                {isZh ? '看影片教學＋Jupyter/PyTorch 編程實作' : 'Video lectures + Jupyter notebook coding'}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
              <div className="text-[11px] font-mono font-bold text-rose-600">
                15:00 – 15:45 · 📖 {isZh ? '圖書館自修尾聲' : 'Library Tail'}
              </div>
              <div className="font-bold text-stone-800">{isZh ? '日語文法與讀解' : 'Japanese Grammar'}</div>
              <div className="text-[11px] text-stone-500">
                {isZh ? '安靜讀文法書、解讀長篇日語閱讀文章' : 'Grammar drills & reading comprehension'}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 bg-white/70 p-2.5 rounded-lg border border-stone-200/60 flex items-center justify-between">
            <span>
              💡 <strong>{isZh ? '口說跟讀（Shadowing）去哪裡練？' : 'Where to practice speaking?'}</strong> {isZh ? '晚上回到住處（20:00 - 20:20），關上房門放聲大聲跟讀日劇或教材，既不打擾圖書館安寧，又能徹底放鬆身心！' : 'At home in the evening (20:00 - 20:20), close your door and speak aloud freely!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
