import { leaderboardService } from '@/services/api';
import type { LeaderboardEntry, LeaderboardPeriod, LeaderboardScope, LeaderboardSkill } from '@/types';
import { create } from 'zustand';

interface LeaderboardState {
  scope: LeaderboardScope;
  period: LeaderboardPeriod;
  skill: LeaderboardSkill;
  entries: LeaderboardEntry[];
  isLoading: boolean;
  setScope: (scope: LeaderboardScope) => Promise<void>;
  setPeriod: (period: LeaderboardPeriod) => void;
  setSkill: (skill: LeaderboardSkill) => void;
  fetch: () => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  scope: 'global',
  period: 'weekly',
  skill: 'singles',
  entries: [],
  isLoading: false,
  setScope: async (scope) => {
    set({ scope });
    await get().fetch();
  },
  setPeriod: (period) => set({ period }),
  setSkill: (skill) => set({ skill }),
  fetch: async () => {
    set({ isLoading: true });
    const entries = await leaderboardService.get(get().scope);
    set({ entries, isLoading: false });
  },
}));
