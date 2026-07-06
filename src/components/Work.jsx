import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { PROJECTS } from '../data/content'
import { rise, EASE, useIsCoarsePointer } from '../lib/motion'

/* Card with pointer-tracked tilt; expands into a detail overlay via layoutId. */
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
    setTilt({ rx: -py * 5, ry: px * 5 })
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
        className="group w-full text-left border border-line bg-panel p-6 sm:p-8 hover:border-accent/60 transition-colors duration-300 relative overflow-hidden"
        aria-haspopup="dialog"
      >
        {/* corner index */}
        <span className="absolute top-4 right-5 text-4xl font-extrabold text-line group-hover:text-accent/30 transition-colors select-none">
          {p.index}
        </span>
        <p className="text-2xs text-dim mb-3">{p.kind}</p>
        <h3 className="text-lg sm:text-xl font-bold text-bright pr-14 group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        <p className="mt-3 text-sm text-dim leading-relaxed">{p.summary}</p>
        <p className="mt-4 text-2xs text-amber">{p.metric}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {p.tech.map((t) => (
            <li key={t} className="text-2xs border border-line px-2 py-0.5 text-dim group-hover:border-accent/40 transition-colors">
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-block text-2xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          [ expand → ]
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
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        layoutId={`card-${p.id}`}
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-accent/50 bg-panel p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xs text-dim">{p.kind} · {p.role}</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-bright">{p.title}</h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            data-hover
            className="text-dim hover:text-accent text-sm shrink-0"
            aria-label="Close details"
          >
            [ esc ]
          </button>
        </div>
        <p className="mt-4 text-2xs text-amber">{p.metric}</p>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed">
          {p.details.map((d, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-accent select-none shrink-0">▸</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-7 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="text-2xs border border-line px-2 py-0.5 text-dim">{t}</li>
          ))}
        </ul>
        {p.links.length > 0 && (
          <div className="mt-7 flex gap-5">
            {p.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" data-hover className="text-xs text-accent link-sweep">
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
    <Section id="work" index="02" title="selected_work">
      <div className="grid md:grid-cols-2 gap-5">
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
