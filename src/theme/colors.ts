// Mirrors tailwind.config.js palette for use in SVG / chart code where className isn't available.
export const palette = {
  bg: '#0B0E14',
  bgElevated: '#141926',
  card: '#1B2130',
  input: '#1E2536',
  border: '#262E42',
  borderLight: '#333C54',
  primary: '#5B8CFF',
  primaryLight: '#8FADFF',
  primaryDark: '#3D6BE8',
  accent: '#20E3B2',
  accentLight: '#5CF3D2',
  accentDark: '#0FAF8A',
  warn: '#FFB020',
  danger: '#FF5C6C',
  win: '#20E3B2',
  loss: '#FF5C6C',
  text: '#F4F6FB',
  textSecondary: '#9AA3B8',
  textMuted: '#6B7385',
} as const;

export const chartSeries = [palette.primary, palette.accent, palette.warn, palette.danger, palette.primaryLight];

export const performanceColors: Record<'attack' | 'defence' | 'movement' | 'recovery', string> = {
  attack: '#FF5C6C',
  defence: '#5B8CFF',
  movement: '#20E3B2',
  recovery: '#FFB020',
};
