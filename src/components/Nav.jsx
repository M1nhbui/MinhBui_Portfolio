import { motion, useScroll, useSpring } from 'framer-motion'
import { SITE, SECTIONS } from '../data/content'

export default function Nav({ activeSection }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      {/* scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full bg-accent origin-left"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <nav
        className="max-w-6xl mx-auto px-5 sm:px-8 h-12 flex items-center justify-between text-2xs"
        aria-label="Primary"
      >
        <a href="#hero" className="text-accent font-bold tracking-tight" data-hover>
          {SITE.handle}<span className="cursor-blink">_</span>
        </a>
        <ul className="hidden md:flex items-center gap-5">
          {SECTIONS.slice(1).map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-hover
                className={`link-sweep transition-colors ${
                  activeSection === s.id ? 'text-accent' : 'text-dim hover:text-ink'
                }`}
              >
                <span className="text-line mr-1">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`${import.meta.env.BASE_URL}${SITE.resumeFile}`}
          download
          data-hover
          className="text-dim hover:text-accent link-sweep"
        >
          resume.pdf ↓
        </a>
      </nav>
    </header>
  )
}
