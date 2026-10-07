export type Language = 'en' | 'zh-TW';

export type ChoreCategory = 
  | 'kitchen'
  | 'laundry'
  | 'cleaning'
  | 'errands'
  | 'meal_prep'
  | 'quick_tidy';

export type ChoreType = 'active' | 'passive'; // passive: machine running like washer or slow cooker

export type ChorePlacement = 'auto' | 'pre_library' | 'post_library';

export interface Task {
  id: string;
  title: string;
  estimateMinutes: number;
  category: ChoreCategory;
  type: ChoreType;
  placement: ChorePlacement;
  completed: boolean;
  notes?: string;
}

export type StrategyId = 
  | 'consolidated_sprint' 
  | 'library_bookends' 
  | 'two_zone_partition' 
  | 'passive_parallelizer';

export interface StrategyInfo {
  id: StrategyId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  iconName: string;
  principles: string[];
}

export interface DayParameters {
  wakeTime: string; // e.g. "08:00"
  sleepTime: string; // e.g. "23:30"
  libraryTargetHours: number; // e.g. 4.5
  commuteMinutes: number; // e.g. 20
  preferredStudyTimeOfDay: 'morning' | 'afternoon' | 'evening';
  studyTopic: string;
}

export type BlockType = 
  | 'wake_routine'
  | 'chore_sprint'
  | 'chore_cooldown'
  | 'commute'
  | 'library_deep_focus'
  | 'meal'
  | 'leisure'
  | 'wind_down';

export interface ScheduleBlock {
  id: string;
  title: string;
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  startMinutes: number; // minutes from 00:00
  durationMinutes: number;
  type: BlockType;
  tasks?: Task[];
  description: string;
  isLibraryBlock?: boolean;
}

export interface RoutineTemplate {
  id: string;
  name: string;
  description: string;
  tasks: Omit<Task, 'id' | 'completed'>[];
  defaultParams: Partial<DayParameters>;
}
