import { colorScheme } from 'nativewind';
import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  setMode: (mode) => {
    colorScheme.set(mode);
    set({ mode });
  },
}));
