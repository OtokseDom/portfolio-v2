/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ── Brutalist palette: ink, paper, one loud accent ──────────────
      colors: {
        ink: '#1a1a1a',
        paper: '#ffffff',
        accent: '#e74c3c',
        fog: '#f3f2ef', // warm off-white for alternating sections
      },
      // ── Type system: monospace display + grotesk body ───────────────
      fontFamily: {
        heading: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // ── Hard offset shadows (the brutalist "drop shadow") ───────────
      boxShadow: {
        'brutal-sm': '4px 4px 0 0 #1a1a1a',
        brutal: '6px 6px 0 0 #1a1a1a',
        'brutal-lg': '10px 10px 0 0 #1a1a1a',
        'brutal-accent': '6px 6px 0 0 #e74c3c',
        'brutal-accent-lg': '10px 10px 0 0 #e74c3c',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 44s linear infinite',
      },
    },
  },
  plugins: [],
}
