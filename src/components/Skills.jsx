import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { SKILLS } from '../data/content'
import { rise, stagger, EASE } from '../lib/motion'

const CATEGORY_LABEL = {
  languages: 'Languages',
  ml_and_llms: 'ML & LLMs',
  data_engineering: 'Data Engineering',
  infra_and_tools: 'Infra & Tools',
}

const tile = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

/* Hand-drawn icons for skills that have no brand logo on any icon CDN. */
const CUSTOM_ICONS = {
  SQL: (
    <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true" fill="none" stroke="#1272E8" strokeWidth="1.8" strokeLinecap="round">
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </svg>
  ),
  XGBoost: (
    <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
      <defs>
        <linearGradient id="xgb-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1272E8" />
          <stop offset="1" stopColor="#7B5CF0" />
        </linearGradient>
      </defs>
      <rect x="3.5" y="13" width="4" height="8" rx="1" fill="url(#xgb-g)" opacity="0.55" />
      <rect x="10" y="8.5" width="4" height="12.5" rx="1" fill="url(#xgb-g)" opacity="0.8" />
      <rect x="16.5" y="3" width="4" height="18" rx="1" fill="url(#xgb-g)" />
    </svg>
  ),
  'LoRA / QLoRA': (
    <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true" fill="none" strokeLinecap="round">
      <path d="M4 6.5h16" stroke="#1272E8" strokeWidth="1.8" />
      <circle cx="9" cy="6.5" r="2.2" fill="#1272E8" />
      <path d="M4 12h16" stroke="#7B5CF0" strokeWidth="1.8" />
      <circle cx="15.5" cy="12" r="2.2" fill="#7B5CF0" />
      <path d="M4 17.5h16" stroke="#1272E8" strokeWidth="1.8" />
      <circle cx="7" cy="17.5" r="2.2" fill="#1272E8" />
    </svg>
  ),
}

function SkillTile({ skill }) {
  const [failed, setFailed] = useState(false)
  const custom = CUSTOM_ICONS[skill.name]
  const showIcon = skill.icon && !failed

  return (
    <motion.li variants={tile}>
      <motion.div
        data-hover
        whileHover={{ rotate: [0, -2.5, 2.5, 0], transition: { duration: 0.45 } }}
        className="group h-full flex flex-col items-center justify-center gap-3 glass rounded-2xl px-4 py-7 hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-300"
      >
        {showIcon ? (
          <img
            src={skill.icon.startsWith('http') ? skill.icon : `https://cdn.simpleicons.org/${skill.icon}`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width="40"
            height="40"
            onError={() => setFailed(true)}
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : custom ? (
          <span className="group-hover:scale-110 transition-transform duration-300">{custom}</span>
        ) : (
          <span
            aria-hidden="true"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent to-violet text-white text-xs font-bold"
          >
            {skill.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()}
          </span>
        )}
        <span className="text-xs font-medium text-ink text-center group-hover:text-accent transition-colors duration-300">
          {skill.name}
        </span>
      </motion.div>
    </motion.li>
  )
}

export default function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="space-y-12">
        {SKILLS.map((group) => (
          <motion.div key={group.category} variants={rise}>
            <h3 className="text-2xs font-semibold uppercase tracking-[0.2em] text-dim mb-4">
              {CATEGORY_LABEL[group.category] ?? group.category}
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
