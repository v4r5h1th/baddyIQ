export type DrillCategory =
  | 'recovery'
  | 'footwork'
  | 'smash'
  | 'drop'
  | 'net'
  | 'backhand'
  | 'defence';

export type DrillDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Drill {
  id: string;
  title: string;
  category: DrillCategory;
  illustration: string;
  videoUrl: string;
  instructions: string[];
  durationMinutes: number;
  difficulty: DrillDifficulty;
  expectedImprovement: string;
  progress: number;
  isFavourite: boolean;
  isCompleted: boolean;
}

export interface TrainingPlanItem {
  day: string;
  drillId: string;
  focus: string;
  isCompleted: boolean;
}
