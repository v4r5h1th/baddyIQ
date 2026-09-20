import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePaletteId = 'purple' | 'green' | 'orange';

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  emoji: string;
  primary: string;
  background: string;
  card: string;
  surfaceSecondary: string;
  border: string;
  white: string;
  text: string;
  accent: string;
  accentDark: string;
  textSecondary: string;
  textMuted: string;
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'purple',
    name: 'Purple',
    emoji: '💜',
    primary: '#6E32CC',
    background: '#F5DDFD',
    card: '#F9EDFD',
    surfaceSecondary: '#F8E9FD',
    border: '#EAD0F5',
    white: '#FFFFFF',
    text: '#0A0841',
    accent: '#FAC0F6',
    accentDark: '#D46CC7',
    textSecondary: '#615092',
    textMuted: '#8F7FB8',
  },
  {
    id: 'green',
    name: 'Forest',
    emoji: '🌿',
    primary: '#427450',
    background: '#F9FFEF',
    card: '#FFFFFF',
    surfaceSecondary: '#EEF8E6',
    border: '#E0EAE0',
    white: '#FFFFFF',
    text: '#000000',
    accent: '#A8D5B5',
    accentDark: '#2D5C3C',
    textSecondary: '#4A6B55',
    textMuted: '#7A9B84',
  },
  {
    id: 'orange',
    name: 'Sunset',
    emoji: '🍊',
    primary: '#FF914D',
    background: '#FFFAE8',
    card: '#FFFFFF',
    surfaceSecondary: '#FFF2D6',
    border: '#F2E8D2',
    white: '#FFFFFF',
    text: '#000000',
    accent: '#FFD19A',
    accentDark: '#E06820',
    textSecondary: '#7A5030',
    textMuted: '#B07850',
  },
];

interface ThemePaletteState {
  activeThemeId: ThemePaletteId;
  theme: ThemePalette;
  setTheme: (id: ThemePaletteId) => void;
}

export const useThemePaletteStore = create<ThemePaletteState>()(
  persist(
    (set) => ({
      activeThemeId: 'purple',
      theme: THEME_PALETTES[0],
      setTheme: (id) => {
        const palette = THEME_PALETTES.find((p) => p.id === id) ?? THEME_PALETTES[0];
        set({ activeThemeId: id, theme: palette });
      },
    }),
    {
      name: 'baddyiq-theme-palette',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state && state.activeThemeId) {
          const palette = THEME_PALETTES.find((p) => p.id === state.activeThemeId) ?? THEME_PALETTES[0];
          state.theme = palette;
        }
      },
    }
  )
);
