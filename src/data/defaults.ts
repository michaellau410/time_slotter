import { Task, StrategyInfo, DayParameters, RoutineTemplate } from '../types';

export const INITIAL_TASKS_ZH: Task[] = [
  {
    id: 't-1',
    title: '清洗早餐碗盤並擦拭廚房流理台',
    estimateMinutes: 15,
    category: 'kitchen',
    type: 'active',
    placement: 'pre_library',
    completed: false,
  },
  {
    id: 't-2',
    title: '啟動洗衣機清洗衣物（被動運轉）',
    estimateMinutes: 5,
    category: 'laundry',
    type: 'passive',
    placement: 'pre_library',
    completed: false,
    notes: '出門準備時洗衣機同步運轉 45 分鐘',
  },
  {
    id: 't-3',
    title: '打包房間與廚房垃圾並拿去回收桶',
    estimateMinutes: 5,
    category: 'errands',
    type: 'active',
    placement: 'pre_library',
    completed: false,
  },
  {
    id: 't-4',
    title: '快速整理書桌與房間掃地',
    estimateMinutes: 10,
    category: 'quick_tidy',
    type: 'active',
    placement: 'pre_library',
    completed: false,
  },
  {
    id: 't-5',
    title: '將洗好的衣服掛上曬衣架晾曬',
    estimateMinutes: 15,
    category: 'laundry',
    type: 'active',
    placement: 'post_library',
    completed: false,
  },
  {
    id: 't-6',
    title: '洗米煮飯與簡易備料（電鍋準備）',
    estimateMinutes: 20,
    category: 'meal_prep',
    type: 'active',
    placement: 'post_library',
    completed: false,
  },
];

export const ROUTINE_TEMPLATES_ZH: RoutineTemplate[] = [
  {
    id: 'tpl-library-grind',
    name: '標準圖書館日（4.5h 專注）',
    description: '晨間快速啟動、下午深度專注、返家輕鬆整理。',
    defaultParams: {
      wakeTime: '08:00',
      sleepTime: '23:30',
      libraryTargetHours: 4.5,
      commuteMinutes: 20,
      preferredStudyTimeOfDay: 'afternoon',
    },
    tasks: [
      { title: '洗碗並擦拭流理台', estimateMinutes: 15, category: 'kitchen', type: 'active', placement: 'pre_library' },
      { title: '倒垃圾與資源回收', estimateMinutes: 5, category: 'errands', type: 'active', placement: 'pre_library' },
      { title: '快速整理書桌與鋪床', estimateMinutes: 10, category: 'quick_tidy', type: 'active', placement: 'pre_library' },
      { title: '電鍋煮飯與簡易備餐', estimateMinutes: 25, category: 'meal_prep', type: 'active', placement: 'post_library' },
    ],
  },
  {
    id: 'tpl-weekend-reset',
    name: '週末重整日（3.5h 專注）',
    description: '洗床單衣物、擦浴室鏡子、採買物資，隨後進行輕鬆學習。',
    defaultParams: {
      wakeTime: '09:00',
      sleepTime: '00:00',
      libraryTargetHours: 3.5,
      commuteMinutes: 25,
      preferredStudyTimeOfDay: 'afternoon',
    },
    tasks: [
      { title: '洗衣機洗床單被套（被動運轉）', estimateMinutes: 5, category: 'laundry', type: 'passive', placement: 'pre_library', notes: '45分鐘機洗' },
      { title: '廚房徹底清潔與洗碗', estimateMinutes: 20, category: 'kitchen', type: 'active', placement: 'pre_library' },
      { title: '浴室洗手台與鏡子擦拭', estimateMinutes: 10, category: 'cleaning', type: 'active', placement: 'pre_library' },
      { title: '曬衣服與床單', estimateMinutes: 15, category: 'laundry', type: 'active', placement: 'pre_library' },
      { title: '超市採買一週生活日用品', estimateMinutes: 30, category: 'errands', type: 'active', placement: 'post_library' },
    ],
  },
  {
    id: 'tpl-exam-crunch',
    name: '期末衝刺日（6.0h 專注）',
    description: '家務壓至最低（僅20分鐘），將 6 小時全部投入圖書館。',
    defaultParams: {
      wakeTime: '07:30',
      sleepTime: '23:30',
      libraryTargetHours: 6.0,
      commuteMinutes: 15,
      preferredStudyTimeOfDay: 'morning',
    },
    tasks: [
      { title: '快速沖洗杯盤', estimateMinutes: 5, category: 'kitchen', type: 'active', placement: 'pre_library' },
      { title: '出門順手帶垃圾下樓', estimateMinutes: 5, category: 'errands', type: 'active', placement: 'pre_library' },
      { title: '整理書包：筆電、充電線、考古題、保溫瓶', estimateMinutes: 10, category: 'quick_tidy', type: 'active', placement: 'pre_library' },
    ],
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Wash breakfast dishes & wipe kitchen counter',
    estimateMinutes: 15,
    category: 'kitchen',
    type: 'active',
    placement: 'pre_library',
    completed: false,
  },
  {
    id: 't-2',
    title: 'Start washing machine cycle (laundry)',
    estimateMinutes: 5,
    category: 'laundry',
    type: 'passive',
    placement: 'pre_library',
    completed: false,
    notes: 'Takes 45 mins machine cycle while getting ready',
  },
  {
    id: 't-3',
    title: 'Take kitchen & room trash down to bins',
    estimateMinutes: 5,
    category: 'errands',
    type: 'active',
    placement: 'pre_library',
    completed: false,
  },
  {
    id: 't-4',
    title: 'Quick floor sweep & desk tidy',
    estimateMinutes: 10,
    category: 'quick_tidy',
    type: 'active',
    placement: 'pre_library',
    completed: false,
  },
  {
    id: 't-5',
    title: 'Hang washed clothes on drying rack',
    estimateMinutes: 15,
    category: 'laundry',
    type: 'active',
    placement: 'post_library',
    completed: false,
  },
  {
    id: 't-6',
    title: 'Prep simple dinner / rice cooker',
    estimateMinutes: 20,
    category: 'meal_prep',
    type: 'active',
    placement: 'post_library',
    completed: false,
  },
];

export const STRATEGIES: StrategyInfo[] = [
  {
    id: 'consolidated_sprint',
    name: '1. Consolidated Batch & Protect',
    tagline: 'Bundle all chores into one morning speedrun; shield unbroken 4-5 hours at the library.',
    description: 'Stop letting chores trickle through your morning. All miscellaneous tasks are grouped into a single protected 45-60 minute blitz before departure. Once done, you leave for the library with zero domestic mental residue.',
    bestFor: 'Days when you have high cognitive tasks (papers, problem sets, exam prep) that require deep flow state.',
    iconName: 'ShieldCheck',
    principles: [
      'Zero trickle: Never wash one spoon at a time or interrupt study to tidy up.',
      'One sprint threshold: Clean non-stop until the timer dings, then head straight out.',
      'Unbroken Library Block: Afternoon remains 100% sacred for continuous learning.'
    ],
  },
  {
    id: 'library_bookends',
    name: '2. Library Bookends (Warmup & Cooldown)',
    tagline: 'Minimal 15m pre-departure launchpad; defer physical chores for brain decompression afterward.',
    description: 'Doing heavy cleaning in the morning wastes your freshest brain energy. This strategy leaves only critical hygiene (dishes & trash) before leaving, and saves repetitive physical chores (folding, sweeping) as a mental cooldown after studying.',
    bestFor: 'Students who feel physically exhausted if they clean too much before studying.',
    iconName: 'BookOpen',
    principles: [
      'Preserve morning mental freshness: Do only essential departure chores (15 mins max).',
      'Chore as cognitive rest: Physical tasks upon returning home let your prefrontal cortex recover.',
      'Guaranteed escape: You are out the door by 10:30 AM before procrastination kicks in.'
    ],
  },
  {
    id: 'two_zone_partition',
    name: '3. The 2-Zone Spatial Partition',
    tagline: 'Strict physical boundary: Home = Domestic & Rest, Library = Sacred Focus Sanctuary.',
    description: 'Eliminates boundary blurring. Living alone tempts you to study at your kitchen table where dirty dishes, unmade beds, and chores scream for attention. This partitions your day strictly into Home hours (life/chores) and Library hours (pure focus) with travel buffers.',
    bestFor: 'Solo students easily distracted by their apartment environment.',
    iconName: 'Building2',
    principles: [
      'Quarantine domestic tasks to Home hours only.',
      'The Library threshold rule: The moment you step into the library, chores cease to exist.',
      'Chore capture notepad: Any chores remembered at the library are jotted down to process later.'
    ],
  },
  {
    id: 'passive_parallelizer',
    name: '4. Passive Machine Parallelizer',
    tagline: 'Stack machine runtimes (washer, slow-cooker) in parallel with getting ready and transit.',
    description: 'Differentiates active physical labor from machine wait times. Laundry machines take 45 mins, but your actual hands-on time is 3 minutes. Trigger machines right before breakfast or departure so waiting never holds you hostage.',
    bestFor: 'Laundry days and days with meal preparation.',
    iconName: 'Cpu',
    principles: [
      'Isolate active minutes vs passive machine runtime.',
      'Start cycles before showers/meals, not after.',
      'Compress 90 minutes of perceived chores into 25 minutes of real physical effort.'
    ],
  },
];

export const DEFAULT_DAY_PARAMETERS: DayParameters = {
  wakeTime: '08:00',
  sleepTime: '23:30',
  libraryTargetHours: 4.5,
  commuteMinutes: 20,
  preferredStudyTimeOfDay: 'afternoon',
  studyTopic: 'Algorithms & Data Structures / Term Paper',
};

export const ROUTINE_TEMPLATES: RoutineTemplate[] = [
  {
    id: 'tpl-library-grind',
    name: 'Standard Library Day (4.5h Focus)',
    description: 'Quick morning launchpad, afternoon deep study block, light evening tidy.',
    defaultParams: {
      wakeTime: '08:00',
      sleepTime: '23:30',
      libraryTargetHours: 4.5,
      commuteMinutes: 20,
      preferredStudyTimeOfDay: 'afternoon',
    },
    tasks: [
      { title: 'Wash dishes & wipe counter', estimateMinutes: 15, category: 'kitchen', type: 'active', placement: 'pre_library' },
      { title: 'Take out garbage & recycling', estimateMinutes: 5, category: 'errands', type: 'active', placement: 'pre_library' },
      { title: 'Quick desk & bed tidy', estimateMinutes: 10, category: 'quick_tidy', type: 'active', placement: 'pre_library' },
      { title: 'Prep evening dinner & air room', estimateMinutes: 25, category: 'meal_prep', type: 'active', placement: 'post_library' },
    ],
  },
  {
    id: 'tpl-weekend-reset',
    name: 'Weekend Reset + Study (3.5h Focus)',
    description: 'Full apartment laundry, bathroom wipe, groceries, followed by relaxed library session.',
    defaultParams: {
      wakeTime: '09:00',
      sleepTime: '00:00',
      libraryTargetHours: 3.5,
      commuteMinutes: 25,
      preferredStudyTimeOfDay: 'afternoon',
    },
    tasks: [
      { title: 'Laundry machine cycle 1 (sheets & clothes)', estimateMinutes: 5, category: 'laundry', type: 'passive', placement: 'pre_library', notes: '45m cycle' },
      { title: 'Dishes & kitchen thorough clean', estimateMinutes: 20, category: 'kitchen', type: 'active', placement: 'pre_library' },
      { title: 'Bathroom sink & mirror wipe', estimateMinutes: 10, category: 'cleaning', type: 'active', placement: 'pre_library' },
      { title: 'Hang clothes to dry', estimateMinutes: 15, category: 'laundry', type: 'active', placement: 'pre_library' },
      { title: 'Quick grocery run for weekly essentials', estimateMinutes: 30, category: 'errands', type: 'active', placement: 'post_library' },
    ],
  },
  {
    id: 'tpl-exam-crunch',
    name: 'Exam Crunch Sprint (6h Focus)',
    description: 'Absolute minimum chores (20 mins total). 6 solid hours at library.',
    defaultParams: {
      wakeTime: '07:30',
      sleepTime: '23:30',
      libraryTargetHours: 6.0,
      commuteMinutes: 15,
      preferredStudyTimeOfDay: 'morning',
    },
    tasks: [
      { title: 'Quick rinse mug & dish', estimateMinutes: 5, category: 'kitchen', type: 'active', placement: 'pre_library' },
      { title: 'Trash drop-off on way out', estimateMinutes: 5, category: 'errands', type: 'active', placement: 'pre_library' },
      { title: 'Pack bag: laptop, charger, formula sheets, thermos', estimateMinutes: 10, category: 'quick_tidy', type: 'active', placement: 'pre_library' },
    ],
  },
];

export const LIBRARY_PACKING_ITEMS = [
  'Laptop & power charger',
  'Student ID / Library pass',
  'Noise-canceling earphones',
  'Water bottle / insulated thermos',
  'Notebook & study pens',
  'Jacket / sweater (library A/C)',
  'Apartment keys',
];
