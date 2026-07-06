import { motion } from 'framer-motion'
import { stagger, rise } from '../lib/motion'

/** Section shell: `// NN — title` header, hairline rule, staggered reveal. */
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
        <motion.div variants={rise} className="mb-10">
          <h2 className="text-h2 font-extrabold text-bright tracking-tight">
            <span className="text-dim font-light select-none">{'// '}</span>
            <span className="text-accent font-light">{index}</span>
            <span className="text-dim font-light select-none"> — </span>
            {title}
          </h2>
          <div className="rule-node mt-5" />
        </motion.div>
        {children}
      </motion.div>
    </section>
  )
}
