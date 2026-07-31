/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-soft": "var(--paper-soft)",
        card: "var(--card)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        line: "var(--line)",
        sage: "var(--sage)",
        "sage-soft": "var(--sage-soft)",
        plum: "var(--plum)",
        "plum-soft": "var(--plum-soft)",
        clay: "var(--clay)",
        "clay-soft": "var(--clay-soft)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,41,38,0.04), 0 8px 24px rgba(43,41,38,0.05)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
