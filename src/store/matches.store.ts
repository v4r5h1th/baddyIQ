import { matchesService } from '@/services/api';
import type { Match } from '@/types';
import { create } from 'zustand';

export type MatchSort = 'newest' | 'oldest' | 'highest-score' | 'rating-change';
export type MatchFilter = 'all' | 'wins' | 'losses' | 'favourites' | 'shared';

interface MatchesState {
  matches: Match[];
  isLoading: boolean;
  searchQuery: string;
  filter: MatchFilter;
  sort: MatchSort;
  fetchMatches: () => Promise<void>;
  addMatch: (match: Match) => void;
  toggleFavourite: (id: string) => void;
  deleteMatch: (id: string) => void;
  setSearchQuery: (q: string) => void;
  setFilter: (f: MatchFilter) => void;
  setSort: (s: MatchSort) => void;
}

export const useMatchesStore = create<MatchesState>((set) => ({
  matches: [],
  isLoading: false,
  searchQuery: '',
  filter: 'all',
  sort: 'newest',
  fetchMatches: async () => {
    set({ isLoading: true });
    const matches = await matchesService.list();
    set({ matches, isLoading: false });
  },
  addMatch: (match) => set((state) => ({ matches: [match, ...state.matches] })),
  toggleFavourite: (id) =>
    set((state) => ({
      matches: state.matches.map((m) => (m.id === id ? { ...m, isFavourite: !m.isFavourite } : m)),
    })),
  deleteMatch: (id) => set((state) => ({ matches: state.matches.filter((m) => m.id !== id) })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
}));
