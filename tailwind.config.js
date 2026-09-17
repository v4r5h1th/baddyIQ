/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // ── BaddyIQ Lavender/Purple Design System ──────────────────────
        bg: {
          DEFAULT: '#F0ECFF',   // soft lavender background
          elevated: '#E8E2FF',  // slightly deeper lavender
          card: '#FFFFFF',      // white card surface
          input: '#EDE8FF',     // input field background
        },
        surface: '#FFFFFF',
        border: {
          DEFAULT: '#D8CFFF',   // soft purple border
          light: '#E5DFFF',     // lighter border
        },
        primary: {
          DEFAULT: '#7B4FD4',   // deep purple primary
          50:  '#F5F0FF',
          100: '#EDE8FF',
          200: '#D8CFFF',
          300: '#B9A5FF',
          400: '#9975E8',
          500: '#7B4FD4',       // main purple accent
          600: '#6437BB',
          700: '#4E2A99',
          800: '#3A1F77',
          900: '#281455',
        },
        accent: {
          DEFAULT: '#F06292',   // soft pink accent
          light: '#F8A5C1',     // lighter pink
          dark: '#D14D77',      // deeper pink
        },
        lavender: {
          DEFAULT: '#C5B3FF',   // lavender highlight
          light: '#DDD6FF',     // light lavender
          deep: '#9F85F0',      // deeper lavender
        },
        warn: '#FFB020',
        danger: '#FF5C6C',
        win: '#7B4FD4',         // use purple for wins
        loss: '#F06292',        // use pink for losses
        text: {
          DEFAULT: '#1E1448',   // dark navy/purple text
          secondary: '#5C4F8A', // mid-purple secondary
          muted: '#9087B8',     // muted purple-grey
        },
      },
      fontFamily: {
        display: ['System'],
      },
      borderRadius: {
        xl2: '28px',
        xl3: '32px',
      },
    },
  },
  plugins: [],
};
