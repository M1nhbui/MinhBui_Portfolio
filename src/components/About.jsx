import { motion } from 'framer-motion'
import Section from './Section'
import { ABOUT } from '../data/content'
import { rise, fadeSlide, stagger } from '../lib/motion'

const STATUS_STYLE = {
  daily: 'bg-accent/10 text-accent',
  active: 'bg-violet/10 text-violet',
  loaded: 'bg-line/60 text-dim',
}

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <motion.div variants={rise} className="space-y-5 leading-relaxed text-ink text-[1.05rem]">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        {/* live tech stack */}
        <motion.div variants={rise}>
          <div className="glass rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-line/70">
              <span className="text-2xs font-semibold uppercase tracking-[0.15em] text-dim">Current stack</span>
              <span className="inline-flex items-center gap-1.5 text-2xs font-semibold text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" /> live
              </span>
            </div>
            <motion.ul variants={stagger(0.04)} className="p-6 space-y-2.5 text-sm">
              {ABOUT.stack.map((t) => (
                <motion.li
                  key={t.name}
                  variants={fadeSlide}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-ink font-medium">{t.name}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-2xs font-semibold ${STATUS_STYLE[t.status]}`}>
                    {t.status}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
