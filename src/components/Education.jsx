import { motion } from 'framer-motion'
import Section from './Section'
import { EDUCATION, ACHIEVEMENTS } from '../data/content'
import { rise } from '../lib/motion'

export default function Education() {
  return (
    <Section id="education" index="06" title="education_&_achievements">
      <div className="grid lg:grid-cols-2 gap-5">
        {/* education */}
        <motion.div variants={rise} className="border border-line bg-panel p-6 sm:p-8">
          <p className="text-2xs text-dim mb-4">$ cat education.log</p>
          <h3 className="text-lg font-bold text-bright">{EDUCATION.school}</h3>
          <p className="mt-2 text-sm text-ink">{EDUCATION.degree}</p>
          <p className="text-sm text-dim">{EDUCATION.certificate}</p>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <p><span className="text-dim">gpa:</span> <span className="text-accent font-bold">{EDUCATION.gpa}</span></p>
            <p><span className="text-dim">grad:</span> <span className="text-ink">{EDUCATION.graduation}</span></p>
            <p><span className="text-dim">loc:</span> <span className="text-ink">{EDUCATION.location}</span></p>
          </div>
          <p className="mt-7 text-2xs text-dim mb-3">relevant coursework:</p>
          <ul className="flex flex-wrap gap-2">
            {EDUCATION.coursework.map((c) => (
              <li key={c} className="text-2xs border border-line px-2 py-1 text-dim">{c}</li>
            ))}
          </ul>
        </motion.div>

        {/* achievements */}
        <motion.div variants={rise} className="border border-line bg-panel p-6 sm:p-8">
          <p className="text-2xs text-dim mb-4">$ tail -f achievements.log</p>
          <ul className="space-y-6">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title} className="flex gap-3">
                <span className="text-accent select-none shrink-0 mt-0.5">▸</span>
                <div>
                  <p className="text-sm font-bold text-bright">{a.title}</p>
                  <p className="mt-0.5 text-sm text-ink">{a.detail}</p>
                  <p className="mt-1 text-2xs text-amber">#{a.tag}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}
