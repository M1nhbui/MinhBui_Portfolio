import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Magnetic from './Magnetic'
import { SITE } from '../data/content'
import { EASE, useIsCoarsePointer } from '../lib/motion'

/* Letter-by-letter name reveal; the last word gets the gradient. */
function AnimatedName() {
  const reduced = useReducedMotion()
  const words = SITE.name.split(' ')
  const lastWord = words.pop()

  if (reduced) {
    return (
      <h1 className="font-display text-display font-bold text-bright">
        {words.join(' ')} <span className="text-gradient">{lastWord}</span>
      </h1>
    )
  }

  let i = 0
  const letter = {
    hidden: { opacity: 0, y: '0.55em', rotate: 5 },
    show: (idx) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { delay: 0.15 + idx * 0.045, duration: 0.65, ease: EASE },
    }),
  }
  const renderWord = (word, gradient) =>
    word.split('').map((ch) => (
      <motion.span
        key={i}
        custom={i++}
        variants={letter}
        initial="hidden"
        animate="show"
        className={`inline-block ${gradient ? 'text-gradient' : ''}`}
      >
        {ch}
      </motion.span>
    ))

  return (
    <h1 className="font-display text-display font-bold text-bright" aria-label={SITE.name}>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi} className="inline-block mr-[0.28em]">{renderWord(w, false)}</span>
        ))}
        <span className="inline-block">{renderWord(lastWord, true)}</span>
      </span>
    </h1>
  )
}

/* Slow-floating gradient blobs behind the hero content. */
function Blobs() {
  const reduced = useReducedMotion()
  if (reduced) return null
  const blobs = [
    { cls: 'w-72 h-72 top-[12%] left-[5%] from-accent/25 to-transparent', dur: 13, dx: 22, dy: -26 },
    { cls: 'w-96 h-96 top-[45%] right-[2%] from-violet/25 to-transparent', dur: 17, dx: -28, dy: 20 },
    { cls: 'w-64 h-64 bottom-[8%] left-[35%] from-cyan-300/30 to-transparent', dur: 15, dx: 18, dy: 24 },
  ]
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl bg-gradient-to-br ${b.cls}`}
          animate={{ x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* Glass portrait: pointer tilt + gentle idle float. Hidden if image missing. */
function Portrait() {
  const [ok, setOk] = useState(true)
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  if (!ok) return null

  const onMove = (e) => {
    if (reduced || coarse || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setTilt({
      rx: -((e.clientY - r.top) / r.height - 0.5) * 10,
      ry: ((e.clientX - r.left) / r.width - 0.5) * 10,
    })
  }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
      className="relative w-48 sm:w-60 lg:w-80 shrink-0"
      style={{ perspective: 800 }}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-violet/20 to-transparent blur-2xl float-y"
      />
      <div className={reduced ? '' : 'float-y'}>
        <motion.div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
          animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative glass rounded-3xl p-3 shadow-glass-lg shine"
        >
          <img
            src={`${import.meta.env.BASE_URL}${SITE.portrait}`}
            alt={`Portrait of ${SITE.name}`}
            onError={() => setOk(false)}
            className="block w-full aspect-[4/5] object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </motion.figure>
  )
}

const enter = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.75, ease: EASE },
})

export default function Hero() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const yContent = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 110])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <Blobs />
      <motion.div
        className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full pt-28 pb-16"
        style={{ y: yContent, opacity }}
      >
        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-12 lg:gap-20">
          <div className="min-w-0">
            <motion.p {...enter(0.05)} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-2xs font-semibold text-dim mb-7">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              {SITE.location}
            </motion.p>

            <AnimatedName />

            <motion.div {...enter(0.55)} className="mt-7 max-w-2xl">
              <p className="text-lg sm:text-xl font-semibold text-ink">{SITE.role}</p>
              <p className="mt-3 text-dim leading-relaxed">{SITE.tagline}</p>
            </motion.div>

            <motion.div {...enter(0.7)} className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#work"
                  data-hover
                  className="shine inline-block rounded-full bg-accent text-white px-7 py-3.5 text-sm font-semibold shadow-glass hover:bg-bright transition-colors duration-300"
                >
                  View work →
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={`${import.meta.env.BASE_URL}${SITE.resumeFile}`}
                  download
                  data-hover
                  className="shine inline-block glass rounded-full px-7 py-3.5 text-sm font-semibold text-ink hover:text-accent transition-colors duration-300"
                >
                  Download resume ↓
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <Portrait />
        </div>
      </motion.div>

      <motion.a
        href="#about"
        data-hover
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-2xs font-semibold text-dim hover:text-accent"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        scroll ↓
      </motion.a>
    </section>
  )
}
