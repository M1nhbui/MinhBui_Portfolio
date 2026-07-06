/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens — the entire palette. One accent, used deliberately.
        bg: '#0A0E12',        // near-black blue
        panel: '#0E141B',     // raised surfaces
        line: '#1C2630',      // hairlines / borders
        dim: '#5A6B7A',       // secondary text
        ink: '#C9D6E2',       // body text
        bright: '#EDF4FA',    // headings
        accent: '#54F196',    // phosphor green — links, cursor, highlights only
        amber: '#E8B84B',     // rare secondary highlight (statuses, warnings)
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Type scale — 1.333 ratio on a 16px base
        '2xs': ['0.6875rem', { lineHeight: '1.5' }],
        display: ['clamp(2.6rem, 8vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.6rem, 3.5vw, 2.6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vh, 9rem)',
      },
    },
  },
  plugins: [],
}
