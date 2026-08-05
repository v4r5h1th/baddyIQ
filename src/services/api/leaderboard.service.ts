import { mockLeaderboards } from '@/data/mock/leaderboard';
import { simulate } from '@/services/api/mock-client';
import type { LeaderboardEntry, LeaderboardScope } from '@/types';

export const leaderboardService = {
  get(scope: LeaderboardScope): Promise<LeaderboardEntry[]> {
    return simulate(mockLeaderboards[scope], 500);
  },
};
