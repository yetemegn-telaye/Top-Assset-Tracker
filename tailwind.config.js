/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#146A98',
          light: 'rgba(20,106,152,0.7)',
          lighter: 'rgba(20,106,152,0.2)',
        },
        secondary: {
          DEFAULT: '#008000',
          light: 'rgba(0,128,0,0.6)',
          lighter: 'rgba(0,128,0,0.2)'
        },
        error: {
          DEFAULT: '#E10505',
          light: 'rgba(255,5,5,0.6)',
          lighter: ' rgba(255,5,5,0.20)',
        },
        info: {
          DEFAULT: '#3DB8E6',
        },
        accent: {
          DEFAULT: '#938E8E',
          light: 'rgba(147,142,142,0.2)',
          lighter: 'rgba(147,142,142,0.20)'
        },
        background: {
          DEFAULT: '#F7F9F5',
          paper: '#FFFFFF',
        },
      },
      fontFamily: {
        jetbrainsmono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

