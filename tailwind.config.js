/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#146A98',
          light: '#3DB8E6',
        },
        secondary: {
          DEFAULT: '#008000',
          light: 'rgba(0, 128, 0, 0.2)',
        },
        error: {
          DEFAULT: '#E10505',
          light: 'rgba(225, 5, 5, 0.2)',
        },
        info: {
          DEFAULT: '#938E8E',
          light: '#E3E3E1',
        },
        background: {
          DEFAULT: '#FFFFFF',
          paper: '#F7F9F5',
        },
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

