import { SITE } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-7 flex flex-wrap items-center justify-between gap-3 text-2xs text-dim">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <p>Built with React, Tailwind & Framer Motion</p>
      </div>
    </footer>
  )
}
