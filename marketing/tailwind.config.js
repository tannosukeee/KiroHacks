/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          900: '#1E4D2B',
          800: '#245832',
          700: '#2d6e3e',
          600: '#3a8a50',
          500: '#4a9e62',
        },
        gold: {
          500: '#C8A951',
          400: '#d4b96a',
          300: '#e0cc8e',
          200: '#ecddb2',
          100: '#f5efd6',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F2EDE0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(30,77,43,0.08), 0 1px 4px 0 rgba(30,77,43,0.04)',
        'card-hover': '0 8px 32px 0 rgba(30,77,43,0.14), 0 2px 8px 0 rgba(30,77,43,0.06)',
        'ide': '0 24px 80px 0 rgba(0,0,0,0.35), 0 8px 24px 0 rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
