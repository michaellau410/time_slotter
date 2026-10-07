import { Language, ChoreCategory, StrategyId } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  nav: {
    timeline: string;
    tasks: string;
    strategies: string;
    startSprint: string;
    librarySanctuary: string;
    settings: string;
  };
  stats: {
    activeChoreOverhead: string;
    activeChoreSubtitle: string;
    passiveWaiting: string;
    passiveSubtitle: string;
    protectedStudyBlock: string;
    protectedStudySubtitle: string;
    distractionsEliminated: string;
    distractionsSubtitle: string;
    blocksCount: string;
  };
  timeline: {
    flowTitle: string;
    flowSubtitle: (wake: string, sleep: string) => string;
    departHome: string;
    returnHome: string;
    choreOverhead: string;
    speedrunChores: (mins: string) => string;
    enterLibrary: string;
    protectedArchitecture: string;
    strategyPrefix: string;
    unbrokenFocusBlock: (duration: string) => string;
    heroDescription: string;
    sacredSanctuaryBadge: string;
    batchedWindowBadge: string;
    tasksInsideBatch: string;
    editTasksBtn: string;
    runTimerBtn: string;
    launchRoomBtn: string;
    whyThisSavesSemester: string;
    fragmentedTrapTitle: string;
    fragmentedTrapItems: string[];
    batchedArchTitle: string;
    batchedArchItems: (departTime: string, focusDuration: string) => string[];
  };
  taskInput: {
    title: string;
    subtitle: string;
    taskNameLabel: string;
    taskNamePlaceholder: string;
    estimateLabel: string;
    addBtn: string;
    categoryLabel: string;
    natureLabel: string;
    activeEffort: string;
    passiveMachine: string;
    placementLabel: string;
    autoArrange: string;
    beforeLibrary: string;
    afterReturn: string;
    commonChoresLabel: string;
    quickPresetLabel: string;
    queuedTitle: (total: number) => string;
    pendingCount: (count: number) => string;
    clearCompleted: (count: number) => string;
    emptyTitle: string;
    emptySubtitle: string;
    loadTemplateBtn: string;
    autoArrangedBadge: string;
    beforeLibraryBadge: string;
    afterReturnBadge: string;
    passiveMachineWait: string;
  };
  strategiesView: {
    badge: string;
    heroTitle: string;
    heroDescription: string;
    fragmentedTrapTitle: string;
    fragmentedTrapDesc: string;
    sanctuaryMethodTitle: string;
    sanctuaryMethodDesc: string;
    selectModelTitle: string;
    bestForPrefix: string;
    coreRulesTitle: string;
    activeBadge: string;
    applyStrategyBtn: string;
    configuredBtn: string;
    parkinsonTitle: string;
    parkinsonDesc: string;
  };
  sprintModal: {
    badge: string;
    allClearedTitle: string;
    allClearedDesc: string;
    readyDepartBtn: string;
    sprintCompletedTitle: string;
    closeBtn: string;
    taskStep: (current: number, total: number) => string;
    estimatedLabel: (mins: number) => string;
    currentObjective: string;
    timerTipTimeUp: string;
    timerTipFocus: string;
    pauseTimer: string;
    resumeTimer: string;
    doneAndNext: string;
    nextUp: string;
    skip: string;
  };
  libraryModal: {
    badge: string;
    zeroDistraction: string;
    tabDeepWork: string;
    tabQuarantine: string;
    tabChecklist: string;
    targetTitle: string;
    targetProgress: (hours: number, percent: number) => string;
    beginDeepWork: string;
    resumeFlow: string;
    pauseSession: string;
    resetTooltip: string;
    peaceRule: string;
    quarantineTitle: string;
    quarantineDesc: string;
    quarantinePlaceholder: string;
    quarantineBtn: string;
    quarantineSuccess: string;
    psychologyTitle: string;
    psychologyDesc: string;
    checklistTitle: string;
    checklistDesc: string;
  };
  settingsDrawer: {
    title: string;
    studyTargetLabel: string;
    studyTargetHours: (h: number) => string;
    studyTopicLabel: string;
    studyTopicPlaceholder: string;
    wakeTimeLabel: string;
    commuteLabel: string;
    commuteMinutes: (m: number) => string;
    sleepTimeLabel: string;
    saveBtn: string;
  };
  categories: Record<ChoreCategory, string>;
  templates: {
    standardLibrary: { name: string; desc: string };
    weekendReset: { name: string; desc: string };
    examCrunch: { name: string; desc: string };
  };
  packingItems: string[];
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Sanctuary',
    appSubtitle: 'Solo Student Focus Architect',
    nav: {
      timeline: 'Day Timeline',
      tasks: 'Tasks & Estimates',
      strategies: '4 Batching Models',
      startSprint: 'Start Chore Sprint',
      librarySanctuary: 'Library Sanctuary',
      settings: 'Settings',
    },
    stats: {
      activeChoreOverhead: 'Active Chore Overhead',
      activeChoreSubtitle: 'Hands-on cleaning',
      passiveWaiting: 'Passive Waiting',
      passiveSubtitle: 'Machine cycles',
      protectedStudyBlock: 'Protected Study Block',
      protectedStudySubtitle: 'Uninterrupted library time',
      distractionsEliminated: 'Distractions Eliminated',
      distractionsSubtitle: 'Zero micro-interruptions',
      blocksCount: 'blocks',
    },
    timeline: {
      flowTitle: "Today's Chronological Master Flow",
      flowSubtitle: (wake, sleep) => `Wake: ${wake} · Sleep: ${sleep}`,
      departHome: 'Depart Home:',
      returnHome: 'Return Home:',
      choreOverhead: 'Chore Overhead:',
      speedrunChores: (mins) => `Speedrun Chores (${mins})`,
      enterLibrary: 'Enter Library Mode',
      protectedArchitecture: 'Protected Flow Architecture',
      strategyPrefix: 'Strategy:',
      unbrokenFocusBlock: (duration) => `${duration} Unbroken Library Focus Block`,
      heroDescription: 'Household chores have been bundled into dedicated batch windows. Your afternoon library session is mathematically shielded from chore debt.',
      sacredSanctuaryBadge: 'Sacred Sanctuary Block',
      batchedWindowBadge: 'Batched Window',
      tasksInsideBatch: 'Tasks packed inside this batch:',
      editTasksBtn: 'Edit Tasks & Estimates',
      runTimerBtn: 'Run Timer',
      launchRoomBtn: 'Launch Study Room',
      whyThisSavesSemester: 'Why This Saves Your Academic Semester',
      fragmentedTrapTitle: 'The Fragmented "Living Alone" Trap',
      fragmentedTrapItems: [
        'You wake up and wash 1 breakfast dish (10m).',
        'You sit down to study at your desk, but notice the dirty floor and grab the broom (20m).',
        'You prepare lunch and dirty another pot (45m).',
        'By 3:00 PM, you realize you haven’t left for the library yet. You feel drained without having done real studying.',
      ],
      batchedArchTitle: 'The Sanctuary Batched Architecture',
      batchedArchItems: (departTime, focusDuration) => [
        'All tasks are calculated upfront with estimated minutes.',
        'Speedrun chores in a single focused morning blitz.',
        `Depart at a fixed time (${departTime}) without guilt.`,
        `Enjoy ${focusDuration} of deep, distraction-free flow state at the library.`,
      ],
    },
    taskInput: {
      title: 'Input Household Task & Estimated Time',
      subtitle: 'Quantify each chore in minutes so the scheduler can seal them into a protected batch window.',
      taskNameLabel: 'Task Name',
      taskNamePlaceholder: 'What household chore needs to be done?',
      estimateLabel: 'Estimate (Minutes)',
      addBtn: 'Add to Batch',
      categoryLabel: 'Category:',
      natureLabel: 'Nature:',
      activeEffort: 'Active Effort',
      passiveMachine: 'Passive Machine',
      placementLabel: 'Schedule Preference:',
      autoArrange: 'Auto-Arrange',
      beforeLibrary: 'Before Library',
      afterReturn: 'After Return',
      commonChoresLabel: 'Common solo student chores:',
      quickPresetLabel: 'Quick Preset:',
      queuedTitle: (total) => `Queued Household Tasks (${total})`,
      pendingCount: (count) => `· ${count} pending`,
      clearCompleted: (count) => `Clear completed (${count})`,
      emptyTitle: 'Your chore batch is empty!',
      emptySubtitle: 'Add your upcoming chores above or click a template to automatically generate a student schedule.',
      loadTemplateBtn: 'Load Standard Library Day',
      autoArrangedBadge: 'Auto-arranged',
      beforeLibraryBadge: 'Pre-Library Launch',
      afterReturnBadge: 'Post-Library Cooldown',
      passiveMachineWait: 'Passive Machine Wait',
    },
    strategiesView: {
      badge: 'Strategic Frameworks for Solo Living',
      heroTitle: 'How to Stop Miscellaneous Chores from Fragmenting Your Study Time',
      heroDescription: 'Living alone creates a unique cognitive trap: without roommates or family, every chore (a dirty cup, laundry pile, full trash can) is visible and demanding your attention. When chores are tackled reactively throughout the day, your focus is shattered into 30-minute fragments, making it impossible to go to the library for deep, continuous learning.',
      fragmentedTrapTitle: 'The Fragmented Trap (Reactive Chores)',
      fragmentedTrapDesc: 'Wash 1 plate at 10am · Take out trash at 11:30am · Start laundry at 1pm. You feel busy all day, never leave the house, and reach 5pm with 0 hours of deep study.',
      sanctuaryMethodTitle: 'The Sanctuary Method (Batch & Shield)',
      sanctuaryMethodDesc: 'Estimate tasks, bundle them into one timed block, and establish a firm departure deadline. Once at the library, chores are mathematically barred from your brain.',
      selectModelTitle: 'Select Your Time Arrangement Strategy:',
      bestForPrefix: 'Best for: ',
      coreRulesTitle: 'Core Operating Rules:',
      activeBadge: 'Active',
      applyStrategyBtn: 'Apply This Strategy',
      configuredBtn: 'Configured · View Day',
      parkinsonTitle: "Idea 5: Parkinson's Law Speedrun Mode (Built into Sanctuary)",
      parkinsonDesc: '"Work expands to fill the time available for its completion." If you give yourself a vague Sunday morning to clean your room, dishwashing and wiping will take 3 hours. But with Sanctuary\'s Chore Sprint Timer, you enter your task estimate (e.g., dishes: 15m, trash: 5m, sweep: 10m), tap "Start Sprint", and race against a firm countdown timer. It forces swift execution and propels you straight out the door to the library.',
    },
    sprintModal: {
      badge: 'Chore Speedrun Mode',
      allClearedTitle: 'All Chores Cleared!',
      allClearedDesc: 'Your apartment is reset. Grab your bag and head straight to the library!',
      readyDepartBtn: 'Ready to Depart for Library',
      sprintCompletedTitle: 'Sprint Completed!',
      closeBtn: 'Close Runner',
      taskStep: (cur, tot) => `Task ${cur} of ${tot}`,
      estimatedLabel: (mins) => `Estimated: ${mins}m`,
      currentObjective: 'Current Objective',
      timerTipTimeUp: 'Time up! Wrap it up swiftly!',
      timerTipFocus: 'Focus strictly on this chore — zero phone checks.',
      pauseTimer: 'Pause Timer',
      resumeTimer: 'Resume Timer',
      doneAndNext: 'Done & Next',
      nextUp: 'Next up: ',
      skip: 'Skip',
    },
    libraryModal: {
      badge: 'Library Focus Sanctuary',
      zeroDistraction: 'Zero Domestic Distraction Zone',
      tabDeepWork: 'Deep Work',
      tabQuarantine: 'Chore Quarantine',
      tabChecklist: 'Bag Checklist',
      targetTitle: 'Current Study Target',
      targetProgress: (hours, percent) => `Target: ${hours}h 00m (${percent}% completed)`,
      beginDeepWork: 'Begin Deep Work',
      resumeFlow: 'Resume Flow',
      pauseSession: 'Pause Session',
      resetTooltip: 'Reset session timer',
      peaceRule: 'Household chores do not exist right now. Your home is locked and paused until you return.',
      quarantineTitle: 'The Chore Quarantine Box',
      quarantineDesc: 'When living alone, random chore thoughts often attack you mid-study: "Did I buy laundry detergent? I should wipe the stove tonight." Never derail your study flow or search shopping apps now. Dump it here immediately. Sanctuary queues it for your post-library return window.',
      quarantinePlaceholder: 'e.g. Buy paper towels, clean air conditioner filter...',
      quarantineBtn: 'Quarantine It',
      quarantineSuccess: 'Captured and safely queued for post-library! Clear your mind and return to studying.',
      psychologyTitle: 'The Psychology:',
      psychologyDesc: 'The Zeigarnik effect states that uncompleted tasks stick in your working memory until written down. Writing it down tricks the brain into letting go so you can maintain deep focus.',
      checklistTitle: 'Pre-Departure Bag Checklist',
      checklistDesc: 'Never get to the library only to realize you forgot your charger or student ID.',
    },
    settingsDrawer: {
      title: 'Daily Anchor Parameters',
      studyTargetLabel: 'Library Study Target',
      studyTargetHours: (h) => `${h} Hours`,
      studyTopicLabel: 'Primary Academic Topic Today',
      studyTopicPlaceholder: 'e.g. Econometrics Assignment, Organic Chemistry',
      wakeTimeLabel: 'Wake Up Time',
      commuteLabel: 'One-Way Transit to Library',
      commuteMinutes: (m) => `${m} Minutes`,
      sleepTimeLabel: 'Evening Wind-Down / Bedtime',
      saveBtn: 'Update Schedule Anchors',
    },
    categories: {
      kitchen: 'Kitchen & Dishes',
      laundry: 'Laundry & Clothes',
      cleaning: 'Cleaning & Wipe',
      errands: 'Trash & Errands',
      meal_prep: 'Meal Prep',
      quick_tidy: 'Quick Tidy',
    },
    templates: {
      standardLibrary: {
        name: 'Standard Library Day (4.5h Focus)',
        desc: 'Quick morning launchpad, afternoon deep study block, light evening tidy.',
      },
      weekendReset: {
        name: 'Weekend Reset + Study (3.5h Focus)',
        desc: 'Full apartment laundry, bathroom wipe, groceries, followed by relaxed library session.',
      },
      examCrunch: {
        name: 'Exam Crunch Sprint (6h Focus)',
        desc: 'Absolute minimum chores (20 mins total). 6 solid hours at library.',
      },
    },
    packingItems: [
      'Laptop & power charger',
      'Student ID / Library pass',
      'Noise-canceling earphones',
      'Water bottle / insulated thermos',
      'Notebook & study pens',
      'Jacket / sweater (library A/C)',
      'Apartment keys',
    ],
  },
  'zh-TW': {
    appName: 'Sanctuary 庇護所',
    appSubtitle: '獨居學生深度專注排程器',
    nav: {
      timeline: '一日時間軸',
      tasks: '任務與預估時間',
      strategies: '4大批次策略',
      startSprint: '開始雜務衝刺',
      librarySanctuary: '圖書館專注室',
      settings: '參數設定',
    },
    stats: {
      activeChoreOverhead: '主動雜務總工時',
      activeChoreSubtitle: '實際動手清潔打掃',
      passiveWaiting: '機器被動等待',
      passiveSubtitle: '洗衣機等運轉週期',
      protectedStudyBlock: '完整保護的專注時段',
      protectedStudySubtitle: '不被中斷的圖書館時間',
      distractionsEliminated: '消除零碎中斷',
      distractionsSubtitle: '杜絕做一件事分心一次',
      blocksCount: '個區塊',
    },
    timeline: {
      flowTitle: '今日全天節奏總覽',
      flowSubtitle: (wake, sleep) => `起床時間：${wake} · 就寢時間：${sleep}`,
      departHome: '預計出門：',
      returnHome: '預計返家：',
      choreOverhead: '雜務總工時：',
      speedrunChores: (mins) => `衝刺雜務 (${mins})`,
      enterLibrary: '進入圖書館模式',
      protectedArchitecture: '專注心流保護架構',
      strategyPrefix: '目前採用策略：',
      unbrokenFocusBlock: (duration) => `${duration} 完整無中斷的圖書館深度專注區塊`,
      heroDescription: '瑣碎家務已集中封裝於特定時段，你的下午圖書館學習時段受到嚴格保護，完全免受家務焦慮干擾。',
      sacredSanctuaryBadge: '神聖專注時段',
      batchedWindowBadge: '集中雜務時段',
      tasksInsideBatch: '此批次涵蓋的家務任務：',
      editTasksBtn: '編輯任務與預估時間',
      runTimerBtn: '啟動計時',
      launchRoomBtn: '進入專注空間',
      whyThisSavesSemester: '為什麼這個方法能拯救你的學期成績',
      fragmentedTrapTitle: '獨居者的「碎片化時間」陷阱',
      fragmentedTrapItems: [
        '早上起床洗了 1 個早餐盤子（10分鐘）。',
        '坐在書桌前準備讀書，看到地板有灰塵又拿起掃把（20分鐘）。',
        '中午煮個麵弄髒另一個鍋子（45分鐘）。',
        '到了下午 3 點，發現自己根本還沒出門去圖書館，精力耗盡卻沒真正讀到書。',
      ],
      batchedArchTitle: 'Sanctuary 批次保護架構',
      batchedArchItems: (departTime, focusDuration) => [
        '事先列出所有雜務並預估所需分鐘數。',
        '在早晨以限時衝刺方式一次性徹底解決。',
        `於固定時間（${departTime}）準時出發，毫無心理包袱。`,
        `在圖書館享受長達 ${focusDuration} 零干擾的極致心流學習狀態。`,
      ],
    },
    taskInput: {
      title: '輸入家務任務與預估時間',
      subtitle: '以分鐘為單位量化每項家務，系統將自動將其打包成受保護的批次時段。',
      taskNameLabel: '任務名稱',
      taskNamePlaceholder: '今天有什麼家務需要處理？',
      estimateLabel: '預估時間（分鐘）',
      addBtn: '加入批次',
      categoryLabel: '類別：',
      natureLabel: '性質：',
      activeEffort: '主動勞動',
      passiveMachine: '被動機器運轉',
      placementLabel: '排程偏好：',
      autoArrange: '智能自動編排',
      beforeLibrary: '去圖書館前',
      afterReturn: '返家後處理',
      commonChoresLabel: '獨居學生常見家務快速加入：',
      quickPresetLabel: '預設範本：',
      queuedTitle: (total) => `待處理家務清單 (${total})`,
      pendingCount: (count) => `· 尚有 ${count} 項未完成`,
      clearCompleted: (count) => `清除已完成 (${count})`,
      emptyTitle: '目前沒有待辦家務！',
      emptySubtitle: '在上方新增即將進行的家務，或點選預設範本以快速生成排程。',
      loadTemplateBtn: '載入標準圖書館日範本',
      autoArrangedBadge: '智能編排',
      beforeLibraryBadge: '出發前衝刺',
      afterReturnBadge: '返家後整理',
      passiveMachineWait: '機器被動等待',
    },
    strategiesView: {
      badge: '獨居生活的時間管理架構',
      heroTitle: '如何防止瑣碎家務碎裂你的整塊讀書時間',
      heroDescription: '獨居生活有一種特殊的認知陷阱：沒有室友或家人分擔，生活環境中的每一處凌亂（髒杯子、待洗衣物、滿溢的垃圾桶）都會不斷向大腦索取注意力。如果隨性零散地做家務，專注力會被切碎成 30 分鐘的碎片，導致你根本無法出門去圖書館進行長時間的深度學習。',
      fragmentedTrapTitle: '碎片化陷阱（被動隨性做家務）',
      fragmentedTrapDesc: '早上 10 點洗一個盤子 · 11 點半倒垃圾 · 下午 1 點洗衣服。整天感覺忙得不可開交，卻一步也沒踏出門，到了下午 5 點讀書進度依舊是零。',
      sanctuaryMethodTitle: 'Sanctuary 庇護所方法（集中批次與保護）',
      sanctuaryMethodDesc: '精確預估任務時間，將雜務打包為單一限時區塊，並設定嚴格的出門大限。一旦踏入圖書館，家務在數學邏輯上就被完全隔離在大腦之外。',
      selectModelTitle: '選擇你的時間編排策略：',
      bestForPrefix: '最適合：',
      coreRulesTitle: '核心執行準則：',
      activeBadge: '使用中',
      applyStrategyBtn: '採用此策略',
      configuredBtn: '已設定 · 查看時間軸',
      parkinsonTitle: '策略 5：帕金森定律極速衝刺（內建於 Sanctuary）',
      parkinsonDesc: '「工作會不斷膨脹，直到填滿所有可用時間。」如果週末早晨漫無目的地整理房間，洗碗擦桌子往往會拖成 3 個小時。但在 Sanctuary 的「雜務衝刺計時器」中，你輸入每項任務的預估時間（例如洗碗 15 分鐘、倒垃圾 5 分鐘、掃地 10 分鐘），按下開始後與倒數計時競賽，這會迫使你迅速搞定家務，準時拎著書包走向圖書館。',
    },
    sprintModal: {
      badge: '雜務極速衝刺模式',
      allClearedTitle: '所有家務均已搞定！',
      allClearedDesc: '房間已經恢復整潔。現在帶上背包，立刻出發去圖書館吧！',
      readyDepartBtn: '準備好前往圖書館',
      sprintCompletedTitle: '衝刺完成！',
      closeBtn: '關閉計時器',
      taskStep: (cur, tot) => `任務 ${cur} / ${tot}`,
      estimatedLabel: (mins) => `預估：${mins} 分鐘`,
      currentObjective: '當前執行項目',
      timerTipTimeUp: '時間到！請迅速收尾！',
      timerTipFocus: '專注於眼前這項家務 — 嚴禁拿起手機滑社群。',
      pauseTimer: '暫停計時',
      resumeTimer: '繼續計時',
      doneAndNext: '完成並進入下一項',
      nextUp: '下一項：',
      skip: '跳過',
    },
    libraryModal: {
      badge: '圖書館專注庇護所',
      zeroDistraction: '零家務干擾專注空間',
      tabDeepWork: '深度專注',
      tabQuarantine: '雜務隔離便簽',
      tabChecklist: '背包物品檢查',
      targetTitle: '今日專注主題',
      targetProgress: (hours, percent) => `目標：${hours} 小時 00 分（已完成 ${percent}%）`,
      beginDeepWork: '開始深度學習',
      resumeFlow: '繼續專注心流',
      pauseSession: '暫停計時',
      resetTooltip: '重設計時器',
      peaceRule: '家務此刻完全不存在。你的住所已經鎖定並暫停，直到你學成歸來。',
      quarantineTitle: '雜務隔離便簽（Chore Quarantine）',
      quarantineDesc: '獨居讀書時，腦海常會突然冒出瑣碎念頭：「洗潔精是不是快用光了？晚上要不要擦抽油煙機？」千萬別中斷學習或開啟購物網站！立刻記在隔離便簽中，系統會將它自動排入返家後的雜務時段。',
      quarantinePlaceholder: '例如：買廚房紙巾、清理冷氣濾網、繳水費...',
      quarantineBtn: '隔離此念頭',
      quarantineSuccess: '已成功隔離並排入返家時段！請放下雜念，繼續全心學習。',
      psychologyTitle: '心理學原理：',
      psychologyDesc: '蔡格尼效應（Zeigarnik effect）指出：未完成的任務會持續霸佔工作記憶。將念頭白紙黑字寫下來，能讓大腦確認「這件事已經被記錄」，從而釋放專注力。',
      checklistTitle: '出門背包必備檢查清單',
      checklistDesc: '避免到了圖書館才發現忘了帶充電器或學生證。',
    },
    settingsDrawer: {
      title: '每日生活節奏參數',
      studyTargetLabel: '圖書館目標學習時數',
      studyTargetHours: (h) => `${h} 小時`,
      studyTopicLabel: '今日主要攻讀課題',
      studyTopicPlaceholder: '例如：計量經濟學期中複習、有機化學作業',
      wakeTimeLabel: '預計起床時間',
      commuteLabel: '單程前往圖書館通勤時間',
      commuteMinutes: (m) => `${m} 分鐘`,
      sleepTimeLabel: '晚間放鬆 / 就寢時間',
      saveBtn: '儲存並更新時間軸',
    },
    categories: {
      kitchen: '廚房洗碗',
      laundry: '洗衣曬衣',
      cleaning: '環境擦拭',
      errands: '倒垃圾跑腿',
      meal_prep: '料理備餐',
      quick_tidy: '快速整理',
    },
    templates: {
      standardLibrary: {
        name: '標準圖書館日（4.5小時專注）',
        desc: '晨間快速啟動、下午深度學習、晚間輕鬆整理。',
      },
      weekendReset: {
        name: '週末重整日（3.5小時專注）',
        desc: '洗床單衣物、擦浴室鏡子、採買物資，隨後進行輕鬆學習。',
      },
      examCrunch: {
        name: '期末衝刺日（6小時專注）',
        desc: '家務壓至最低（僅20分鐘），將 6 小時全部投入圖書館。',
      },
    },
    packingItems: [
      '筆記型電腦與充電器',
      '學生證 / 圖書館借書證',
      '降噪耳機',
      '水壺 / 保溫杯',
      '筆記本與文具筆',
      '保暖外套 / 披肩（圖書館冷氣強）',
      '家門鑰匙',
    ],
  },
};

export const STRATEGY_DETAILS_I18N: Record<Language, Record<StrategyId, {
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  principles: string[];
}>> = {
  en: {
    consolidated_sprint: {
      name: '1. Consolidated Batch & Protect',
      tagline: 'Bundle all chores into one morning speedrun; shield unbroken 4-5 hours at the library.',
      description: 'Stop letting chores trickle through your morning. All miscellaneous tasks are grouped into a single protected 45-60 minute blitz before departure. Once done, you leave for the library with zero domestic mental residue.',
      bestFor: 'Days when you have high cognitive tasks (papers, problem sets, exam prep) that require deep flow state.',
      principles: [
        'Zero trickle: Never wash one spoon at a time or interrupt study to tidy up.',
        'One sprint threshold: Clean non-stop until the timer dings, then head straight out.',
        'Unbroken Library Block: Afternoon remains 100% sacred for continuous learning.'
      ],
    },
    library_bookends: {
      name: '2. Library Bookends (Warmup & Cooldown)',
      tagline: 'Minimal 15m pre-departure launchpad; defer physical chores for brain decompression afterward.',
      description: 'Doing heavy cleaning in the morning wastes your freshest brain energy. This strategy leaves only critical hygiene (dishes & trash) before leaving, and saves repetitive physical chores (folding, sweeping) as a mental cooldown after studying.',
      bestFor: 'Students who feel physically exhausted if they clean too much before studying.',
      principles: [
        'Preserve morning mental freshness: Do only essential departure chores (15 mins max).',
        'Chore as cognitive rest: Physical tasks upon returning home let your prefrontal cortex recover.',
        'Guaranteed escape: You are out the door by 10:30 AM before procrastination kicks in.'
      ],
    },
    two_zone_partition: {
      name: '3. The 2-Zone Spatial Partition',
      tagline: 'Strict physical boundary: Home = Domestic & Rest, Library = Sacred Focus Sanctuary.',
      description: 'Eliminates boundary blurring. Living alone tempts you to study at your kitchen table where dirty dishes, unmade beds, and chores scream for attention. This partitions your day strictly into Home hours (life/chores) and Library hours (pure focus) with travel buffers.',
      bestFor: 'Solo students easily distracted by their apartment environment.',
      principles: [
        'Quarantine domestic tasks to Home hours only.',
        'The Library threshold rule: The moment you step into the library, chores cease to exist.',
        'Chore capture notepad: Any chores remembered at the library are jotted down to process later.'
      ],
    },
    passive_parallelizer: {
      name: '4. Passive Machine Parallelizer',
      tagline: 'Stack machine runtimes (washer, slow-cooker) in parallel with getting ready and transit.',
      description: 'Differentiates active physical labor from machine wait times. Laundry machines take 45 mins, but your actual hands-on time is 3 minutes. Trigger machines right before breakfast or departure so waiting never holds you hostage.',
      bestFor: 'Laundry days and days with meal preparation.',
      principles: [
        'Isolate active minutes vs passive machine runtime.',
        'Start cycles before showers/meals, not after.',
        'Compress 90 minutes of perceived chores into 25 minutes of real physical effort.'
      ],
    },
  },
  'zh-TW': {
    consolidated_sprint: {
      name: '1. 整合批次保護法（晨間集中衝刺）',
      tagline: '將所有瑣碎雜務集中於晨間一鼓作氣解決，徹底守護下午 4–5 小時圖書館心流。',
      description: '杜絕家務在早晨斷斷續續發生。出發前將所有瑣碎雜務（洗碗、擦桌、倒垃圾）收納進一個 45–60 分鐘的衝刺區塊。一旦衝刺結束，立刻動身前往圖書館，不留任何心理掛念。',
      bestFor: '需要高度專注的學習日（寫論文、寫程式、準備大考、期中期末）。',
      principles: [
        '零碎片化：嚴禁洗一個碗就停下來，或在讀書時看到髒亂又去拿抹布。',
        '單一衝刺門檻：在計時器歸零前連續收拾，時間一到拎包出發。',
        '不可侵犯的圖書館時段：整個下午百分之百奉獻給深度知識吸收。',
      ],
    },
    library_bookends: {
      name: '2. 圖書館前後錨定法（晨間啟動＋返家放鬆）',
      tagline: '出門前僅花 15 分鐘做必要衛生；體力性家務留到返家後作為大腦放鬆。',
      description: '一早做繁重家務會過早消耗意志力。此策略在出門前只做關鍵衛生（泡水洗碗、順手倒垃圾），而將折衣服、掃拖地等重複性家務留到讀完書回家後，當作腦力疲勞後的散心與伸展。',
      bestFor: '如果在讀書前打掃太久會感到精疲力竭、沒力氣讀書的學生。',
      principles: [
        '保護早晨最清醒的腦力：出門前只做最高限度的衛生啟動（上限 15 分鐘）。',
        '將家務轉化為大腦散心：讀完書返家後的體力動作能讓前額葉皮質有效修復。',
        '保證準時脫身：在拖延症發作前（約 10:30）就已坐進圖書館。',
      ],
    },
    two_zone_partition: {
      name: '3. 雙區域嚴格隔離法（空間與時間硬切分）',
      tagline: '嚴格的物理界線：家＝生活與休息，圖書館＝神聖專注庇護所。',
      description: '徹底消除界線模糊。獨居最容易坐在書桌前時，眼睛餘光看到雜亂又忍不住動手收拾。此策略將一天切分為「居家生活區」與「圖書館專注區」，中間設有交通轉換緩衝。',
      bestFor: '容易被住處環境雜物吸走注意力的獨居學生。',
      principles: [
        '家務嚴格隔離在家中時段，絕不隨身帶入圖書館。',
        '圖書館門檻原則：一踏入圖書館大門，家務在認知上即刻歸零。',
        '雜務捕捉便簽：在圖書館突然想到的生活瑣事，一律寫在便簽後忘掉，回家再辦。',
      ],
    },
    passive_parallelizer: {
      name: '4. 被動家電平行運作法（機器運轉重疊）',
      tagline: '讓洗衣機、電鍋等被動等待時間，與洗漱、用餐或交通平行進行。',
      description: '清楚區分「動手勞動」與「機器等待時間」。洗衣服需要 45 分鐘，但你真正動手只有 3 分鐘。在吃早餐或換衣服前搶先啟動家電，讓等待在背景靜悄悄完成，絕不浪費時間乾等。',
      bestFor: '大洗衣服的日子或有備餐需求的學習日。',
      principles: [
        '精確拆解主動勞動時間與機器等待時間。',
        '在吃飯或洗澡前先啟動機器，而非事後才啟動。',
        '將原先體感 90 分鐘的繁雜家務，壓縮至實際只需 20 分鐘動手。',
      ],
    },
  },
};
