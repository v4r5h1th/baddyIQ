import { mockAchievements } from '@/data/mock/achievements';
import { simulate } from '@/services/api/mock-client';
import type { Achievement } from '@/types';

export const achievementsService = {
  list(): Promise<Achievement[]> {
    return simulate(mockAchievements, 400);
  },
};
