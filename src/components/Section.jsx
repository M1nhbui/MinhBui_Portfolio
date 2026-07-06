import { motion } from 'framer-motion'
import { stagger, rise, EASE } from '../lib/motion'

const ruleDraw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.2 } },
}

/** Section shell: numbered eyebrow, display heading, gradient rule, staggered reveal. */
export default function Section({ id, index, title, children, className = '' }) {
  return (
    <section id={id} className={`py-section scroll-mt-16 ${className}`}>
      <motion.div
        className="max-w-6xl mx-auto px-5 sm:px-8"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={rise} className="mb-12">
          <p className="text-2xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">
            {index}
          </p>
          <h2 className="font-display text-h2 font-bold text-bright">{title}</h2>
          <motion.div variants={ruleDraw} className="rule-node mt-6 origin-left" />
        </motion.div>
        {children}
      </motion.div>
    </section>
  )
}
