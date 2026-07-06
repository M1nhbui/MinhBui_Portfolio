import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SITE } from '../data/content'

const LINES = [
  { text: `$ ssh ${SITE.handle}@portfolio`, delay: 0 },
  { text: '[ ok ] auth: public key accepted', delay: 380, cls: 'text-dim' },
  { text: '[ ok ] mounting /work /experience /skills', delay: 620, cls: 'text-dim' },
  { text: '[ ok ] gpa=4.0 icpc_rank=14/86 pipelines=stable', delay: 860, cls: 'text-dim' },
  { text: '$ ./init --render', delay: 1150 },
]

export default function BootSequence({ onDone }) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(!reduced)
  const [shown, setShown] = useState(0)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setVisible(false)
    onDone?.()
  }

  useEffect(() => {
    if (reduced) { onDone?.(); return }
    const timers = LINES.map((l, i) =>
      setTimeout(() => setShown(i + 1), l.delay)
    )
    timers.push(setTimeout(finish, 1900))
    const skip = (e) => {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== 'Escape' && e.key !== ' ') return
      finish()
    }
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center px-6"
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
        >
          <div className="w-full max-w-md text-2xs sm:text-xs leading-relaxed">
            {LINES.slice(0, shown).map((l, i) => (
              <p key={i} className={l.cls || 'text-accent'}>{l.text}</p>
            ))}
            <span className="inline-block w-2 h-4 bg-accent cursor-blink align-middle" aria-hidden="true" />
          </div>
          <button
            onClick={finish}
            className="absolute bottom-6 right-6 text-2xs text-dim hover:text-accent link-sweep"
          >
            [ skip ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
