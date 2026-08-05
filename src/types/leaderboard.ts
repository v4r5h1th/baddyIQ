export type TrendDirection = 'up' | 'down' | 'same';
export type LeaderboardScope = 'friends' | 'regional' | 'global';
export type LeaderboardPeriod = 'weekly' | 'monthly' | 'season' | 'all-time';
export type LeaderboardSkill = 'singles' | 'doubles';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string;
  country: string;
  countryFlag: string;
  rating: number;
  trend: TrendDirection;
  trendDelta: number;
  winRate: number;
  currentStreak: number;
  currentMission: string;
  isFriend: boolean;
}
