import { SubjectSlot, Language } from '../types';

export const SUBJECT_RECOMMENDATIONS_EN: SubjectSlot[] = [
  {
    id: 'subj-maths',
    name: 'Mathematics',
    categoryKey: 'maths',
    idealLocation: '🏛️ University Library — Silent Study Floor',
    suggestedTimeslot: '10:30 AM – 12:30 PM (Late Morning Peak)',
    targetMinutes: 120,
    focusType: 'heavy_analytical',
    rationale: 'Prefrontal executive function and working memory peak 2-4 hours after waking. Math proofs, calculus, linear algebra, and problem sets require zero auditory distractions and sustained working memory.',
    recommendedActivities: [
      'Problem sets & textbook derivations (pencil & paper)',
      'Theorem proofs and formal logic reviews',
      'High-friction problem solving without multitasking',
    ],
    tips: 'Put your phone in your backpack. Do not listen to vocal music; use brown noise or silence only.',
  },
  {
    id: 'subj-ai',
    name: 'A.I. Related Online Course',
    categoryKey: 'ai',
    idealLocation: '💻 Library Laptop / Tech Desk (Near Power Outlet)',
    suggestedTimeslot: '1:15 PM – 3:00 PM (Early Afternoon Execution)',
    targetMinutes: 105,
    focusType: 'interactive_coding',
    rationale: 'After lunch, abstract theoretical focus dips, but interactive multimodal learning (video lectures + coding in PyTorch/Jupyter/Python) stimulates active engagement and fights off afternoon sleepiness.',
    recommendedActivities: [
      'Watch lecture modules at 1.25x speed with notes',
      'Hands-on coding in Jupyter Notebook / VS Code',
      'Model training experiments, debugging, and project builds',
    ],
    tips: 'Use headphones for video lessons; choose a desk with a reliable wall outlet so battery limits never disrupt your momentum.',
  },
  {
    id: 'subj-japanese',
    name: 'Japanese Language',
    categoryKey: 'japanese',
    idealLocation: '🚇 Commute Transit + 🏠 Home Speaking Corner (Split)',
    suggestedTimeslot: 'Commute (40m total) + Library Tail (35m) + Home Shadowing (15m)',
    targetMinutes: 90,
    focusType: 'language_spaced_rep',
    rationale: 'Language retention depends on spaced repetition (SRS) and daily frequency, not exhausting marathons. Furthermore, speaking and shadowing aloud are prohibited in silent libraries, so split into transit, library, and home.',
    recommendedActivities: [
      'Transit to/from library (40m): Anki / SRS flashcards + Japanese podcast listening',
      'Library wind-down (35m): Grammar drills (Genki / Minna no Nihongo) & Kanji reading',
      'Home evening (15m): Aloud shadowing and pronunciation drills in private',
    ],
    tips: 'Never sit down for 3 hours of Japanese at once. Three 30-minute micro-sessions yield 3x higher retention.',
  },
];

export const SUBJECT_RECOMMENDATIONS_ZH: SubjectSlot[] = [
  {
    id: 'subj-maths',
    name: '數學（Mathematics）',
    categoryKey: 'maths',
    idealLocation: '🏛️ 大學圖書館 — 深度靜音自修樓層',
    suggestedTimeslot: '10:30 – 12:30（早晨出門抵達後黃金時段）',
    targetMinutes: 120,
    focusType: 'heavy_analytical',
    rationale: '大腦前額葉皮質在起床後 2 至 4 小時認知敏銳度達到峰值。高等微積分、線性代數與嚴密推導需要極高的工作記憶，一旦被細微聲響打斷就會前功盡棄，最適合圖書館絕對靜音區。',
    recommendedActivities: [
      '紙筆推導與題庫演算（純紙筆深思，避免螢幕干擾）',
      '定理證明邏輯梳理與錯題複盤',
      '高認知阻力的核心難題突破',
    ],
    tips: '手機調至飛行模式並放進書包；切勿聽有人聲歌詞的音樂，建議純白噪音或全靜音。',
  },
  {
    id: 'subj-ai',
    name: 'A.I. 線上課程與程式實作',
    categoryKey: 'ai',
    idealLocation: '💻 圖書館筆電區 / 多媒體自修桌（附電源插座）',
    suggestedTimeslot: '13:15 – 15:00（午後主動實作時段）',
    targetMinutes: 105,
    focusType: 'interactive_coding',
    rationale: '午餐後的生理時鐘容易感到昏沉，此時純理論推導容易瞌睡，但「看影片＋敲代碼（PyTorch / Python / Jupyter）」具有即時回饋感（Dopamine Loop），能主動擊退午後疲憊。',
    recommendedActivities: [
      '以 1.25x 倍速觀看線上課程章節並整理架構心智圖',
      '在 VS Code / Colab 進行演算法與神經網路程式碼實作',
      '模型訓練調參、Bug 除錯與實作專題練習',
    ],
    tips: '配戴降噪耳機觀看課程；務必挑選有穩定插座的座位，避免電量焦慮中斷心流。',
  },
  {
    id: 'subj-japanese',
    name: '日語學習（Japanese）',
    categoryKey: 'japanese',
    idealLocation: '🚇 往返通勤路程 ＋ 🏠 居家口說角（分流策略）',
    suggestedTimeslot: '通勤碎片（40分）＋ 圖書館尾聲（35分）＋ 居家跟讀（15分）',
    targetMinutes: 90,
    focusType: 'language_spaced_rep',
    rationale: '語言習得極度依賴間隔重複（SRS）與每日高頻接觸，而非單次 3 小時的疲乏馬拉松。此外，口說跟讀（Shadowing）在圖書館嚴禁出聲，因此必須聰明分流到通勤與住處。',
    recommendedActivities: [
      '往返圖書館通勤（40分鐘）：利用公車/捷運刷 Anki 單字卡與聽聽力播客',
      '圖書館自修尾聲（35分鐘）：安靜閱讀文法書（大家學標準日本語/大家的日本語）與讀解題',
      '返家晚間（15分鐘）：在個人套房內大聲進行 Shadowing 口說跟讀與發音矯正',
    ],
    tips: '切勿將日語堆在同一時段苦讀。將其拆成 3 段 20–30 分鐘的微時段，大腦記憶留存率高出 3 倍！',
  },
];

export function getSubjectRecommendations(lang: Language): SubjectSlot[] {
  return lang === 'zh-TW' ? SUBJECT_RECOMMENDATIONS_ZH : SUBJECT_RECOMMENDATIONS_EN;
}
