/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Blueprint palette — dark base, paper light base, cyan accent
        ink: {
          DEFAULT: '#0a0e12',
          50: '#0d1217',
          100: '#11171d',
          200: '#161d24',
          300: '#1d262f',
        },
        paper: {
          DEFAULT: '#f4f1ea',
          100: '#eceae1',
          200: '#dedacd',
        },
        accent: {
          DEFAULT: '#22d3ee',
          soft: '#67e8f9',
          deep: '#0891b2',
        },
        line: {
          dark: 'rgba(120, 200, 215, 0.14)',
          'dark-strong': 'rgba(120, 200, 215, 0.28)',
          light: 'rgba(20, 40, 50, 0.14)',
          'light-strong': 'rgba(20, 40, 50, 0.30)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Newsreader"', 'ui-serif', 'Georgia', 'serif'],
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
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        sweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        sweep: 'sweep 4s linear infinite',
      },
    },
  },
  plugins: [],
};
