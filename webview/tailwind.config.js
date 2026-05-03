/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        vybe: {
          bg: "var(--vybe-bg)",
          panel: "var(--vybe-panel)",
          "panel-2": "var(--vybe-panel-2)",
          card: "var(--vybe-card)",
          "card-raised": "var(--vybe-card-raised)",
          text: "var(--vybe-text)",
          muted: "var(--vybe-muted)",
          border: "var(--vybe-border)",
          "border-muted": "var(--vybe-border-muted)",
          // Cal Poly accents
          "poly-green": "var(--vybe-poly-green)",
          "mustang-gold": "var(--vybe-mustang-gold)",
          "stadium-gold": "var(--vybe-stadium-gold)",
          "poly-canyon": "var(--vybe-poly-canyon)",
          "farmers-green": "var(--vybe-farmers-green)",
          "dexter-green": "var(--vybe-dexter-green)",
          // Status
          success: "var(--vybe-success)",
          "success-deep": "var(--vybe-success-deep)",
          warning: "var(--vybe-warning)",
          error: "var(--vybe-error)",
          "error-bg": "var(--vybe-error-bg)",
        },
      },
      fontFamily: {
        mono: "var(--vybe-mono)",
      },
    },
  },
  plugins: [],
};
