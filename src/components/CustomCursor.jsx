import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../lib/motion'

/**
 * Soft cursor: a cobalt dot + a lagging ring that swells over hover targets.
 * Disabled for touch devices and prefers-reduced-motion.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (reduced || coarse) return
    document.body.classList.add('custom-cursor-active')

    let x = -100, y = -100
    let fx = -100, fy = -100
    let hovering = false
    let raf

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      hovering = !!e.target.closest('a, button, [data-hover], input, textarea, select, [role="button"]')
    }

    const loop = () => {
      fx += (x - fx) * 0.16
      fy += (y - fy) * 0.16
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`
      }
      if (ringRef.current) {
        const s = hovering ? 1.8 : 1
        ringRef.current.style.transform = `translate(${fx - 17}px, ${fy - 17}px) scale(${s})`
        ringRef.current.style.opacity = hovering ? 0.9 : 0.45
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [reduced, coarse])

  if (reduced || coarse) return null

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[90] pointer-events-none hidden md:block">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-[34px] h-[34px] rounded-full border-[1.5px] border-accent transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
