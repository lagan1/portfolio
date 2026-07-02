/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Terminal palette — phosphor green on near-black, paper light mode
        ink: {
          DEFAULT: '#0a0e0b',
          50: '#0d120e',
          100: '#101611',
          200: '#151c16',
          300: '#1c241d',
        },
        paper: {
          DEFAULT: '#f4f1e6',
          100: '#ebe7d9',
          200: '#ddd8c6',
        },
        accent: {
          DEFAULT: '#4ade80',
          soft: '#86efac',
          deep: '#16a34a',
        },
        warn: '#fbbf24',
        err: '#f87171',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        sweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        sweep: 'sweep 4s linear infinite',
      },
    },
  },
  plugins: [],
};
