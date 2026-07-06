# minh_bui — portfolio

Terminal/systems-themed personal portfolio. React + Tailwind + Framer Motion.

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

- One accent (`#54F196` phosphor green) + one rare secondary (`#E8B84B` amber). Tokens in `tailwind.config.js` and `src/index.css`.
- Type: JetBrains Mono everywhere; scale defined in `tailwind.config.js`.
- Signature moments: boot-sequence intro (skippable), bracket-frame custom cursor + magnetic buttons, particle-network hero canvas, scroll-drawn experience timeline, expand-to-detail project cards, grain + scanline texture.
- Accessibility: semantic HTML, keyboard nav + focus rings, skip link, `prefers-reduced-motion` disables the boot intro, cursor, canvas animation, and parallax. Heavy effects auto-disable on touch devices.
