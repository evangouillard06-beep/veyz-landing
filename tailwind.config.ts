import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fonds sombres (échelle "ink" conservée pour compat, remappée sur la palette officielle)
        ink: {
          950: "#0A0E1A", // fond principal
          900: "#0E1730", // fond secondaire
          850: "#101A33",
          800: "#131C36", // surface / carte
          700: "#1E293B", // bordure visible
        },
        // Alias sémantiques de fond
        bg: {
          DEFAULT: "#0A0E1A",
          soft: "#0E1730",
        },
        surface: "#131C36",
        // Accent de marque : indigo + cyan (dégradé signature #6366F1 → #22D3EE)
        accent: {
          DEFAULT: "#6366F1", // indigo
          soft: "#A5B4FC", // indigo clair (texte/icônes sur fond sombre, contraste AA)
          deep: "#4F46E5",
        },
        accent2: {
          DEFAULT: "#22D3EE", // cyan
          soft: "#67E8F9",
        },
        // Texte
        text: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
          faint: "#64748B",
        },
        line: "#1E293B", // bordure visible
        // Sémantique (à doser, jamais comme couleur de marque)
        success: {
          DEFAULT: "#10B981", // succès / disponible / envoyé
          soft: "#6EE7B7",
        },
        warn: "#F59E0B", // alerte / à valider (ambre)
        coral: "#FB7185", // lead chaud (corail)
        danger: "#EF4444", // erreur
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1240px",
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.12)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.8)", opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
