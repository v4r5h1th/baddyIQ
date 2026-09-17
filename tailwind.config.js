/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F5DDFD',      // Main background
          card: '#F9EDFD',         // Surface / Card
          surface2: '#F8E9FD',     // Secondary Surface
          input: '#F8E9FD',
          elevated: '#F8E9FD',
        },
        border: {
          DEFAULT: '#EAD0F5',
          light: '#F3E2FB',
        },
        primary: {
          50:  '#FBF5FE',
          100: '#F6EBFC',
          200: '#EAD0F5',
          300: '#D5A8ED',
          400: '#8B52E3',
          500: '#6E32CC',          // Primary Purple
          600: '#5F28B5',
          700: '#5621A8',
          800: '#431985',
          900: '#2F115E',
        },
        accent: {
          DEFAULT: '#FAC0F6',      // Accent Pink
          light: '#FCE0FB',
          dark: '#D46CC7',
        },
        warn: '#FFA726',
        danger: '#EF5350',
        win: '#6E32CC',
        loss: '#D46CC7',
        text: {
          DEFAULT: '#0A0841',      // Primary Text
          secondary: '#615092',    // Secondary Text
          muted: '#8F7FB8',
        },
      },
      fontFamily: {
        display: ['System'],
      },
      borderRadius: {
        xl2: '28px',
        xl3: '36px',
      },
    },
  },
  plugins: [],
};
