export type DominantHand = 'left' | 'right';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'pro';
export type PrimaryGoal =
  | 'improve-technique'
  | 'compete'
  | 'lose-weight'
  | 'have-fun'
  | 'become-pro';

export interface CareerStats {
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  favouriteShot: string;
  longestRallySeconds: number;
  avgRallyLengthSeconds: number;
  distanceCoveredKm: number;
  currentStreak: number;
}

export interface PerformanceMetrics {
  attack: number;
  defence: number;
  movement: number;
  recovery: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bannerUrl: string;
  age: number;
  dominantHand: DominantHand;
  skillLevel: SkillLevel;
  goal: PrimaryGoal;
  country: string;
  countryFlag: string;
  rating: number;
  globalRank: number;
  regionalRank: number;
  friendRank: number;
  careerStats: CareerStats;
  radar: PerformanceMetrics & { consistency: number };
  createdAt: string;
}
