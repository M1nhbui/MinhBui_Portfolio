import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../lib/motion'

/** Wraps children; pulls them toward the cursor within the element bounds. */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })

  const active = !reduced && !coarse

  const onMove = (e) => {
    if (!active || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left - r.width / 2) * strength)
    my.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
