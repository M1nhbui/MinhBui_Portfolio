import { motion } from 'framer-motion'
import Section from './Section'
import { ABOUT } from '../data/content'
import { rise, fadeSlide, stagger } from '../lib/motion'

const STATUS_COLOR = {
  daily: 'text-accent',
  active: 'text-ink',
  loaded: 'text-dim',
}

export default function About() {
  return (
    <Section id="about" index="01" title="about">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
        <motion.div variants={rise} className="space-y-5 leading-relaxed text-ink">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}>
              <span className="text-dim select-none">{'> '}</span>
              {p}
            </p>
          ))}
        </motion.div>

        {/* live tech stack — process table */}
        <motion.div variants={rise}>
          <div className="border border-line bg-panel">
            <div className="flex items-center justify-between px-4 py-2 border-b border-line text-2xs text-dim">
              <span>$ ps aux | grep stack</span>
              <span className="text-accent">● live</span>
            </div>
            <motion.ul variants={stagger(0.04)} className="p-4 space-y-1.5 text-xs">
              {ABOUT.stack.map((t) => (
                <motion.li key={t.name} variants={fadeSlide} className="flex justify-between gap-4">
                  <span className="text-ink">{t.name}</span>
                  <span className={STATUS_COLOR[t.status]}>[{t.status}]</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
