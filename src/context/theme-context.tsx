import React, { createContext, useContext } from 'react';
import { THEME_PALETTES, type ThemePalette, useThemePaletteStore } from '@/store/theme-palette.store';

// Fallback to default purple theme
const defaultTheme = THEME_PALETTES[0];

export const ThemeContext = createContext<ThemePalette>(defaultTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemePaletteStore((s) => s.theme);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Hook to consume the current app theme palette in any component. */
export function useAppTheme() {
  return useContext(ThemeContext);
}
