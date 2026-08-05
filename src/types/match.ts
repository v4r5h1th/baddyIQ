import type { PerformanceMetrics } from '@/types/user';

export type MatchResult = 'win' | 'loss';
export type MatchFormat = 'singles' | 'doubles';
export type BookmarkType = 'key-rally' | 'turning-point' | 'biggest-mistake' | 'best-rally';

export interface Bookmark {
  id: string;
  label: string;
  type: BookmarkType;
  timestampSeconds: number;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

export interface ShotDistributionItem {
  shot: string;
  count: number;
  percentage: number;
}

export interface Match {
  id: string;
  opponentName: string;
  opponentAvatar: string;
  format: MatchFormat;
  date: string;
  durationSeconds: number;
  result: MatchResult;
  scoreSelf: number[];
  scoreOpponent: number[];
  overallScore: number;
  ratingChange: number;
  performance: PerformanceMetrics;
  todaysFocus: string;
  biggestStrength: string;
  biggestWeakness: string;
  coachSummary: string;
  isFavourite: boolean;
  isShared: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  bookmarks: Bookmark[];
  shotDistribution: ShotDistributionItem[];
  heatmap: HeatmapPoint[];
  idealPath: { x: number; y: number }[];
  actualPath: { x: number; y: number }[];
  longestRallySeconds: number;
  avgRallyLengthSeconds: number;
  distanceCoveredKm: number;
  rallyLengths: number[];
}

export type ProcessingStage =
  | 'uploading'
  | 'court-detection'
  | 'player-tracking'
  | 'shuttle-tracking'
  | 'pose-estimation'
  | 'shot-classification'
  | 'generating-analysis'
  | 'coach-report'
  | 'complete';
