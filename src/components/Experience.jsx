import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import { EXPERIENCE } from '../data/content'
import { rise } from '../lib/motion'

/** Timeline whose spine draws itself as you scroll through it. */
export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <Section id="experience" index="03" title="experience">
      <div ref={listRef} className="relative pl-7 sm:pl-10">
        {/* static track + animated spine */}
        <div className="absolute left-[5px] sm:left-[9px] top-1 bottom-1 w-px bg-line" aria-hidden="true" />
        <motion.div
          className="absolute left-[5px] sm:left-[9px] top-1 bottom-1 w-px bg-accent origin-top"
          style={{ scaleY }}
          aria-hidden="true"
        />
        <ol className="space-y-14">
          {EXPERIENCE.map((e) => (
            <motion.li key={e.org + e.period} variants={rise} className="relative">
              {/* node */}
              <span
                className={`absolute -left-7 sm:-left-10 top-1.5 w-[11px] h-[11px] border ${
                  e.current ? 'border-accent bg-accent/30' : 'border-dim bg-bg'
                }`}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-base sm:text-lg font-bold text-bright">{e.org}</h3>
                <span className="text-2xs text-dim">{e.period}</span>
                {e.current && (
                  <span className="text-2xs text-accent border border-accent/40 px-1.5 py-0.5">running</span>
                )}
              </div>
              <p className="mt-1 text-xs text-amber">{e.role}</p>
              <p className="mt-0.5 text-2xs text-dim">{e.stack} · {e.location}</p>
              <ul className="mt-4 space-y-2 max-w-3xl text-sm leading-relaxed">
                {e.points.map((pt, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-dim select-none shrink-0">-</span>
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
