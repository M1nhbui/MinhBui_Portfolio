import { SITE } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-3 text-2xs text-dim">
        <p>
          © {new Date().getFullYear()} {SITE.name} — built with react · tailwind · framer-motion
        </p>
        <p>
          <span className="text-accent">exit 0</span> — process completed successfully
        </p>
      </div>
    </footer>
  )
}
