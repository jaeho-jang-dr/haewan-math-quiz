/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        sparkle: {
          '0%, 100%': {
            opacity: '0',
            transform: 'scale(0.5)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#667eea',
          600: '#5a6fd8',
          700: '#4c5fd6',
        },
        secondary: {
          500: '#764ba2',
          600: '#6a4190',
        },
      },
      fontFamily: {
        'comic': ['"Comic Sans MS"', 'cursive', 'sans-serif'],
        'trebuchet': ['"Trebuchet MS"', 'sans-serif'],
        'arial-black': ['"Arial Black"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}