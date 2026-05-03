/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        vybe: {
          bg: 'var(--vybe-bg)',
          panel: 'var(--vybe-panel)',
          'panel-raised': 'var(--vybe-panel-raised)',
          text: 'var(--vybe-text)',
          muted: 'var(--vybe-muted)',
          subtle: 'var(--vybe-subtle)',
          border: 'var(--vybe-border)',
          amber: 'var(--vybe-amber)',
          'amber-dark': 'var(--vybe-amber-dark)',
          'chip-bg': 'var(--vybe-chip-bg)',
          'card-light': 'var(--vybe-card-light)',
        },
      },
      fontFamily: {
        mono: 'var(--vybe-mono)',
        serif: 'var(--vybe-serif)',
        sans: 'var(--vybe-sans)',
      },
    },
  },
  plugins: [],
};
