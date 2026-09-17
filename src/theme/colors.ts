// Exact color palette as requested by user
export const palette = {
  // Backgrounds & Surfaces
  bg: '#F5DDFD',              // Main background
  card: '#F9EDFD',            // Surface / Card
  surfaceSecondary: '#F8E9FD',// Secondary Surface
  input: '#F8E9FD',           // Input background
  bgElevated: '#F8E9FD',

  // Borders
  border: '#EAD0F5',
  borderLight: '#F3E2FB',

  // Primary Purple
  primary: '#6E32CC',         // Primary Purple
  primaryLight: '#8B52E3',
  primaryDark: '#5621A8',

  // Accent Pink
  accent: '#FAC0F6',          // Accent Pink
  accentLight: '#FCE0FB',
  accentDark: '#D46CC7',

  // Status
  warn: '#FFA726',
  danger: '#EF5350',
  win: '#6E32CC',
  loss: '#D46CC7',

  // Typography
  text: '#0A0841',            // Primary Text
  textSecondary: '#615092',   // Secondary Text
  textMuted: '#8F7FB8',
} as const;

export const chartSeries = [
  palette.primary,
  palette.accentDark,
  palette.primaryLight,
  palette.accent,
  '#A87FE8',
];

export const performanceColors: Record<'attack' | 'defence' | 'movement' | 'recovery', string> = {
  attack: '#6E32CC',
  defence: '#D46CC7',
  movement: '#8B52E3',
  recovery: '#FAC0F6',
};
