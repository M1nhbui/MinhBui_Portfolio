# Minh Le Bui — portfolio

Arctic-glass personal portfolio. React + Tailwind + Framer Motion.

## Editing content

Everything — name, roles, projects, skills, education, achievements, socials — lives in
**`src/data/content.js`**. Edit that one file; every section reads from it.
The resume served by the download buttons is **`public/MinhLeBui_Resume.pdf`** (replace to update).

## Run locally

```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)

Already wired up: pushing to `main` runs `.github/workflows/deploy.yml`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

The site is served at `https://<user>.github.io/MinhBui_Portfolio/`. If you rename the
repo (e.g. to `m1nhbui.github.io`), change `base` in `vite.config.js` to `'/'`.

## Design system

- Arctic glass: icy `#EDF3FA` base with aurora gradient washes, frosted-glass cards, cobalt accent (`#1272E8`) + violet gradient partner (`#7B5CF0`). Tokens in `tailwind.config.js` and `src/index.css`.
- Type: Space Grotesk (display) + Inter (body).
- Signature moments: site-wide snow drift (`src/components/Snow.jsx`), soft dot+ring custom cursor, magnetic buttons, scroll-drawn gradient timeline, tilt + expand-to-detail project cards.
- LeetCode stats sync at build time via `scripts/fetch-leetcode.mjs` (daily cron in the deploy workflow).
- Accessibility: semantic HTML, keyboard nav + focus rings, skip link, `prefers-reduced-motion` disables snow, cursor, and parallax. Heavy effects auto-disable on touch devices.
