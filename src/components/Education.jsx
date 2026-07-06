import { motion } from 'framer-motion'
import Section from './Section'
import { EDUCATION, ACHIEVEMENTS } from '../data/content'
import { rise } from '../lib/motion'

export default function Education() {
  return (
    <Section id="education" index="06" title="Education & Achievements">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* education */}
        <motion.div variants={rise} className="glass rounded-3xl p-7 sm:p-8">
          <p className="text-2xs font-semibold uppercase tracking-[0.2em] text-dim mb-4">Education</p>
          <h3 className="font-display text-xl font-bold text-bright">{EDUCATION.school}</h3>
          <p className="mt-2 text-sm font-semibold text-ink">{EDUCATION.degree}</p>
          <p className="text-sm text-dim">{EDUCATION.certificate}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-accent/10 text-accent text-xs font-bold px-3 py-1">GPA {EDUCATION.gpa}</span>
            <span className="rounded-full bg-white/70 border border-line/70 text-ink text-xs font-medium px-3 py-1">{EDUCATION.graduation}</span>
            <span className="rounded-full bg-white/70 border border-line/70 text-ink text-xs font-medium px-3 py-1">{EDUCATION.location}</span>
          </div>
          <p className="mt-7 text-2xs font-semibold uppercase tracking-[0.2em] text-dim mb-3">Relevant coursework</p>
          <ul className="flex flex-wrap gap-2">
            {EDUCATION.coursework.map((c) => (
              <li key={c} className="rounded-full bg-white/70 border border-line/70 px-3 py-1 text-2xs font-medium text-ink">{c}</li>
            ))}
          </ul>
        </motion.div>

        {/* achievements */}
        <motion.div variants={rise} className="glass rounded-3xl p-7 sm:p-8">
          <p className="text-2xs font-semibold uppercase tracking-[0.2em] text-dim mb-5">Achievements</p>
          <ul className="space-y-6">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title} className="flex gap-4">
                <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-accent to-violet shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-bright">{a.title}</p>
                  <p className="mt-0.5 text-sm text-ink">{a.detail}</p>
                  <p className="mt-1.5 text-2xs font-semibold uppercase tracking-wide text-violet">{a.tag}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}
