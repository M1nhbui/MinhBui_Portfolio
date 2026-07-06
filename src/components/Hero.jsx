import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'
import Magnetic from './Magnetic'
import { SITE } from '../data/content'
import { EASE } from '../lib/motion'

function TypedName({ text, start }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (reduced || !start) return
    let i = 0
    const t = setInterval(() => {
      i++
      setN(i)
      if (i >= text.length) clearInterval(t)
    }, 55)
    return () => clearInterval(t)
  }, [start, reduced, text])
  return (
    <>
      {text.slice(0, n)}
      <span className="text-accent cursor-blink" aria-hidden="true">▮</span>
    </>
  )
}

/* Terminal-framed portrait. Renders nothing if /public/portrait.jpg is missing. */
function Portrait({ booted }) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={booted ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
      className="relative w-44 sm:w-56 lg:w-72 shrink-0"
    >
      <div className="relative border border-line bg-panel">
        {/* title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-line text-2xs text-dim">
          <span>$ open portrait.jpg</span>
          <span className="text-accent" aria-hidden="true">●</span>
        </div>
        <div className="relative overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}${SITE.portrait}`}
            alt={`Portrait of ${SITE.name}`}
            onError={() => setOk(false)}
            className="block w-full aspect-[4/5] object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
          />
          {/* green phosphor wash + scan tint */}
          <div className="absolute inset-0 bg-accent/10 mix-blend-color pointer-events-none" aria-hidden="true" />
        </div>
      </div>
      {/* corner brackets, echoing the cursor */}
      <span className="absolute -top-2 -left-2 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-accent" aria-hidden="true" />
      <span className="absolute -top-2 -right-2 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-accent" aria-hidden="true" />
      <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-accent" aria-hidden="true" />
      <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-accent" aria-hidden="true" />
    </motion.figure>
  )
}

export default function Hero({ booted }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  // parallax: canvas & content drift at different rates
  const yContent = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 120])
  const yCanvas = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 40])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section id="hero" className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: yCanvas }}>
        <HeroCanvas />
      </motion.div>
      {/* vignette so type stays readable over the canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg)_85%)]" aria-hidden="true" />

      <motion.div
        className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full pt-24 pb-16"
        style={{ y: yContent, opacity }}
      >
        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-10 lg:gap-16">
          <div className="min-w-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={booted ? { opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xs text-dim mb-5"
            >
              <span className="text-accent">●</span> session established — {SITE.location}
            </motion.p>

            <h1 className="text-display font-extrabold text-bright uppercase" aria-label={SITE.name}>
              <TypedName text={SITE.name} start={booted} />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
              className="mt-7 max-w-2xl"
            >
              <p className="text-ink text-base sm:text-lg">
                <span className="text-dim">$ whoami → </span>{SITE.role}
              </p>
              <p className="mt-3 text-dim leading-relaxed">{SITE.tagline}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.15, duration: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Magnetic>
                <a
                  href="#work"
                  data-hover
                  className="inline-block border border-accent text-accent px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors duration-300"
                >
                  view work →
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={`${import.meta.env.BASE_URL}${SITE.resumeFile}`}
                  download
                  data-hover
                  className="inline-block border border-line text-dim px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-ink hover:text-ink transition-colors duration-300"
                >
                  resume.pdf ↓
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <Portrait booted={booted} />
        </div>
      </motion.div>

      <motion.a
        href="#about"
        data-hover
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xs text-dim hover:text-accent"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        scroll ↓
      </motion.a>
    </section>
  )
}
