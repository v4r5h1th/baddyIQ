import { create } from 'zustand';

export type TabName = 'index' | 'matches' | 'record' | 'leaderboard' | 'profile';

export const TAB_ROUTES: { name: TabName; label: string; index: number }[] = [
  { name: 'index', label: 'Coach', index: 0 },
  { name: 'matches', label: 'Matches', index: 1 },
  { name: 'record', label: 'Record', index: 2 },
  { name: 'leaderboard', label: 'Leaderboard', index: 3 },
  { name: 'profile', label: 'Profile', index: 4 },
];

interface TabNavigationState {
  activeTab: TabName;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setActiveTab: (tab: TabName) => void;
  goToTab: (tabOrIndex: TabName | number) => void;
  _scrollToIndex: ((index: number) => void) | null;
  registerScrollHandler: (fn: ((index: number) => void) | null) => void;
}

export const useTabNavigationStore = create<TabNavigationState>((set, get) => ({
  activeTab: 'index',
  activeIndex: 0,
  _scrollToIndex: null,
  setActiveIndex: (index: number) => {
    const safeIndex = Math.max(0, Math.min(TAB_ROUTES.length - 1, index));
    const tab = TAB_ROUTES[safeIndex]?.name ?? 'index';
    set({ activeIndex: safeIndex, activeTab: tab });
  },
  setActiveTab: (tab: TabName) => {
    const item = TAB_ROUTES.find((t) => t.name === tab);
    if (item) {
      set({ activeTab: tab, activeIndex: item.index });
    }
  },
  goToTab: (target: TabName | number) => {
    let index = 0;
    if (typeof target === 'number') {
      index = Math.max(0, Math.min(TAB_ROUTES.length - 1, target));
    } else {
      const item = TAB_ROUTES.find((t) => t.name === target);
      if (item) index = item.index;
    }
    const tab = TAB_ROUTES[index]?.name ?? 'index';
    set({ activeIndex: index, activeTab: tab });
    const scrollFn = get()._scrollToIndex;
    if (scrollFn) {
      scrollFn(index);
    }
  },
  registerScrollHandler: (fn) => {
    set({ _scrollToIndex: fn });
  },
}));
