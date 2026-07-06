import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import { EXPERIENCE } from '../data/content'
import { rise } from '../lib/motion'

/** Timeline whose gradient spine draws itself as you scroll through it. */
export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <Section id="experience" index="03" title="Experience">
      <div ref={listRef} className="relative pl-8 sm:pl-12">
        <div className="absolute left-[6px] sm:left-[10px] top-1 bottom-1 w-px bg-line" aria-hidden="true" />
        <motion.div
          className="absolute left-[6px] sm:left-[10px] top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-accent to-violet rounded-full"
          style={{ scaleY }}
          aria-hidden="true"
        />
        <ol className="space-y-14">
          {EXPERIENCE.map((e) => (
            <motion.li key={e.org + e.period} variants={rise} className="relative">
              <span
                className={`absolute -left-8 sm:-left-12 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                  e.current ? 'border-accent bg-accent/25' : 'border-line bg-white'
                }`}
                aria-hidden="true"
              >
                {e.current && (
                  <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
                )}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-bold text-bright">{e.org}</h3>
                <span className="text-2xs font-medium text-dim">{e.period}</span>
                {e.current && (
                  <span className="rounded-full bg-accent/10 text-accent text-2xs font-semibold px-2.5 py-0.5">
                    current
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-semibold text-violet">{e.role}</p>
              <p className="mt-0.5 text-2xs text-dim">{e.stack} · {e.location}</p>
              <ul className="mt-4 space-y-2 max-w-3xl text-sm leading-relaxed text-ink">
                {e.points.map((pt, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-accent select-none shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
