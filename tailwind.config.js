/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0E14',
          elevated: '#141926',
          card: '#1B2130',
          input: '#1E2536',
        },
        surface: '#1B2130',
        border: {
          DEFAULT: '#262E42',
          light: '#333C54',
        },
        primary: {
          DEFAULT: '#5B8CFF',
          50: '#EEF3FF',
          100: '#DCE6FF',
          200: '#B9CDFF',
          300: '#8FADFF',
          400: '#6E97FF',
          500: '#5B8CFF',
          600: '#3D6BE8',
          700: '#2E52B8',
          800: '#213A87',
          900: '#152556',
        },
        accent: {
          DEFAULT: '#20E3B2',
          light: '#5CF3D2',
          dark: '#0FAF8A',
        },
        warn: '#FFB020',
        danger: '#FF5C6C',
        win: '#20E3B2',
        loss: '#FF5C6C',
        text: {
          DEFAULT: '#F4F6FB',
          secondary: '#9AA3B8',
          muted: '#6B7385',
        },
      },
      fontFamily: {
        display: ['System'],
      },
      borderRadius: {
        xl2: '28px',
      },
    },
  },
  plugins: [],
};
