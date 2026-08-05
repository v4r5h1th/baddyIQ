export interface WeeklyReport {
  id: string;
  weekLabel: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  bestMatchId: string;
  worstMatchId: string;
  mostImprovedArea: string;
  currentMission: string;
  leaderboardChange: number;
  coachAdvice: string;
  ratingHistory: { label: string; value: number }[];
  heatmap: { x: number; y: number; intensity: number }[];
}

export interface PersonalRecord {
  label: string;
  value: string;
}

export interface MonthlyReport {
  id: string;
  monthLabel: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  improvementPercent: number;
  longestRallySeconds: number;
  favouriteShot: string;
  personalRecords: PersonalRecord[];
  coachSummary: string;
  performanceTrend: { label: string; value: number }[];
  heatmap: { x: number; y: number; intensity: number }[];
  matchIds: string[];
}
