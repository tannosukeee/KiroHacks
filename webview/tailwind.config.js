/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        vybe: {
          bg: "var(--vybe-bg)",
          panel: "var(--vybe-panel)",
          raised: "var(--vybe-raised)",
          text: "var(--vybe-text)",
          muted: "var(--vybe-muted)",
          subtle: "var(--vybe-subtle)",
          border: "var(--vybe-border)",
          amber: "var(--vybe-amber)",
          chip: "var(--vybe-chip)",
        },
      },
      fontFamily: {
        mono: "var(--vybe-mono)",
      },
    },
  },
  plugins: [],
};
