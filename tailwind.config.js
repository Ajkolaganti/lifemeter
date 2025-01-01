/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        grow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(50%)' }
        }
      },
      animation: {
        grow: 'grow 1.5s ease-out',
        shimmer: 'shimmer 1.5s linear infinite'
      }
    }
  },
  plugins: [],
};
