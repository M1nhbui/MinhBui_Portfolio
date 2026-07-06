/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Arctic glass tokens — the entire palette. One vivid accent.
        bg: '#EDF3FA',                       // icy base
        panel: 'rgba(255,255,255,0.60)',     // glass surfaces (pair with .glass)
        line: '#D6E2EF',                     // hairlines / borders
        dim: '#5B7189',                      // secondary text
        ink: '#233A52',                      // body text
        bright: '#0E2239',                   // headings (deep navy)
        accent: '#1272E8',                   // cobalt — links, highlights, CTAs
        violet: '#7B5CF0',                   // gradient partner only
        amber: '#C98A04',                    // rare secondary highlight
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.5' }],
        display: ['clamp(2.6rem, 8vw, 6.2rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.7rem, 3.5vw, 2.7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vh, 9rem)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(24, 64, 128, 0.10)',
        'glass-lg': '0 16px 48px rgba(24, 64, 128, 0.16)',
      },
    },
  },
  plugins: [],
}
