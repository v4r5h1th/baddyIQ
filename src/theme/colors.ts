// Mirrors tailwind.config.js palette for use in SVG / chart code where className isn't available.
export const palette = {
  // Backgrounds
  bg: '#F0ECFF',
  bgElevated: '#E8E2FF',
  card: '#FFFFFF',
  input: '#EDE8FF',
  // Borders
  border: '#D8CFFF',
  borderLight: '#E5DFFF',
  // Primary purple
  primary: '#7B4FD4',
  primaryLight: '#9F85F0',
  primaryDark: '#6437BB',
  // Pink accent
  accent: '#F06292',
  accentLight: '#F8A5C1',
  accentDark: '#D14D77',
  // Lavender
  lavender: '#C5B3FF',
  lavenderLight: '#DDD6FF',
  lavenderDeep: '#9F85F0',
  // Status
  warn: '#FFB020',
  danger: '#FF5C6C',
  win: '#7B4FD4',
  loss: '#F06292',
  // Text (dark navy/purple)
  text: '#1E1448',
  textSecondary: '#5C4F8A',
  textMuted: '#9087B8',
} as const;

export const chartSeries = [
  palette.primary,       // deep purple
  palette.accent,        // pink
  palette.lavender,      // lavender
  palette.lavenderDeep,  // deeper lavender
  palette.accentLight,   // light pink
];

export const performanceColors: Record<'attack' | 'defence' | 'movement' | 'recovery', string> = {
  attack: '#7B4FD4',   // purple
  defence: '#F06292',  // pink
  movement: '#9F85F0', // lavender
  recovery: '#C5B3FF', // light lavender
};
