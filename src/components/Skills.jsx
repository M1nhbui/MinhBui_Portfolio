import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { SKILLS } from '../data/content'
import { rise, stagger, EASE } from '../lib/motion'

const tile = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

function SkillTile({ skill }) {
  const [failed, setFailed] = useState(false)
  const showIcon = skill.icon && !failed

  return (
    <motion.li variants={tile}>
      <div
        data-hover
        className="group h-full flex flex-col items-center justify-center gap-3 border border-line bg-panel px-4 py-7 hover:border-accent/70 hover:-translate-y-1 transition-all duration-300"
      >
        {showIcon ? (
          <img
            src={`https://cdn.simpleicons.org/${skill.icon}`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width="40"
            height="40"
            onError={() => setFailed(true)}
            className="w-10 h-10 object-contain grayscale-[35%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
          />
        ) : (
          <span
            aria-hidden="true"
            className="w-10 h-10 flex items-center justify-center border border-accent/50 text-accent text-sm font-bold group-hover:bg-accent group-hover:text-bg transition-colors duration-300"
          >
            {'>_'}
          </span>
        )}
        <span className="text-xs text-ink text-center group-hover:text-accent transition-colors duration-300">
          {skill.name}
        </span>
      </div>
    </motion.li>
  )
}

export default function Skills() {
  return (
    <Section id="skills" index="04" title="skills" className="grid-bg">
      <div className="space-y-12">
        {SKILLS.map((group) => (
          <motion.div key={group.category} variants={rise}>
            <h3 className="text-2xs text-dim mb-4">
              $ ls skills/<span className="text-accent">{group.category}</span>/
            </h3>
            <motion.ul
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {group.items.map((s) => (
                <SkillTile key={s.name} skill={s} />
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
