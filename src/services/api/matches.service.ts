import { getMatchById, mockMatches } from '@/data/mock/matches';
import { simulate } from '@/services/api/mock-client';
import type { Match } from '@/types';

export const matchesService = {
  list(): Promise<Match[]> {
    return simulate(mockMatches, 500);
  },
  getById(id: string): Promise<Match | undefined> {
    return simulate(getMatchById(id), 400);
  },
};
