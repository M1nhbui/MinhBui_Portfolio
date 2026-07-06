import { useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { SITE, SECTIONS } from '../data/content'
import { EASE } from '../lib/motion'

export default function Nav({ activeSection }) {
  const reduced = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const [hidden, setHidden] = useState(false)

  // hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(!reduced && y > prev && y > 180)
  })

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50 glass-strong !border-x-0 !border-t-0"
    >
      {/* scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent to-violet"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <nav
        className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between text-xs"
        aria-label="Primary"
      >
        <a href="#hero" data-hover className="font-display font-bold text-sm text-bright tracking-tight">
          Minh<span className="text-gradient">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-6">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-hover
                className={`link-sweep font-medium transition-colors ${
                  activeSection === s.id ? 'text-accent' : 'text-dim hover:text-bright'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`${import.meta.env.BASE_URL}${SITE.resumeFile}`}
          download
          data-hover
          className="shine rounded-full bg-accent text-white px-4 py-1.5 font-semibold hover:bg-bright transition-colors duration-300"
        >
          Resume
        </a>
      </nav>
    </motion.header>
  )
}
