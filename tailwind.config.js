/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      'none': '0px',
      'xs': '0px',
      'sm': '0px',
      DEFAULT: '0px',
      'md': '0px',
      'lg': '0px',
      'xl': '0px',
      '2xl': '0px',
      '3xl': '0px',
      'full': '0px',
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          'navy-dark': '#0B1120',
          'navy-light': '#1E293B',
          royal: {
            DEFAULT: '#2563EB',
            300: '#93C5FD',
          },
          violet: {
            DEFAULT: '#7C3AED',
            light: '#A78BFA',
          },
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
