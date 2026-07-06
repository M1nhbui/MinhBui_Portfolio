import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { PROJECTS } from '../data/content'
import { rise, EASE, useIsCoarsePointer } from '../lib/motion'

/* Glass card with pointer-tracked tilt; expands into a detail overlay. */
function ProjectCard({ p, onOpen }) {
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMove = (e) => {
    if (reduced || coarse || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 4, ry: px * 4 })
  }

  return (
    <motion.article variants={rise} style={{ perspective: 900 }}>
      <motion.button
        ref={ref}
        layoutId={`card-${p.id}`}
        data-hover
        onClick={() => onOpen(p.id)}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="shine group w-full h-full text-left glass rounded-3xl p-7 sm:p-8 relative overflow-hidden hover:shadow-glass-lg transition-shadow duration-300"
        aria-haspopup="dialog"
      >
        {/* ghost index numeral */}
        <span className="absolute -top-3 right-5 font-display text-7xl font-bold text-bright/5 group-hover:text-accent/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 select-none">
          {p.index}
        </span>
        <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-dim mb-3">{p.kind}</p>
        <h3 className="font-display text-xl font-bold text-bright pr-12 group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        <p className="mt-3 text-sm text-dim leading-relaxed">{p.summary}</p>
        <p className="mt-4 text-2xs font-semibold text-violet">{p.metric}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full bg-white/70 border border-line/70 px-3 py-1 text-2xs font-medium text-ink">
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-block text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          View details →
        </span>
      </motion.button>
    </motion.article>
  )
}

function Detail({ p, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-bright/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        layoutId={`card-${p.id}`}
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-strong rounded-3xl p-7 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xs font-semibold uppercase tracking-[0.15em] text-dim">{p.kind} · {p.role}</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-bright">{p.title}</h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            data-hover
            className="shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center text-dim hover:text-accent transition-colors"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-2xs font-semibold text-violet">{p.metric}</p>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink">
          {p.details.map((d, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-accent select-none shrink-0 mt-0.5">▸</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-7 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full bg-white/70 border border-line/70 px-3 py-1 text-2xs font-medium text-ink">{t}</li>
          ))}
        </ul>
        {p.links.length > 0 && (
          <div className="mt-8 flex gap-5">
            {p.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" data-hover className="text-sm font-semibold text-accent link-sweep">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const [openId, setOpenId] = useState(null)
  const open = PROJECTS.find((p) => p.id === openId)

  return (
    <Section id="work" index="02" title="Selected Work">
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} onOpen={setOpenId} />
        ))}
      </div>
      <AnimatePresence>
        {open && <Detail p={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </Section>
  )
}
