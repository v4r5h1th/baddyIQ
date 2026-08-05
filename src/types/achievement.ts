export type AchievementCategory = 'playing' | 'improvement' | 'training' | 'leaderboards' | 'social';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  total: number;
}
