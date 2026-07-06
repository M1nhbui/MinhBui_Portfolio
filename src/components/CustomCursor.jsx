import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../lib/motion'

/**
 * Terminal crosshair cursor: a solid dot + a lagging bracket frame.
 * Frame expands over anything marked data-hover (or links/buttons).
 * Disabled for touch devices and prefers-reduced-motion.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const dotRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (reduced || coarse) return
    document.body.classList.add('custom-cursor-active')

    let x = -100, y = -100        // target
    let fx = -100, fy = -100      // lagged frame
    let hovering = false
    let raf

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target.closest('a, button, [data-hover], input, textarea, select, [role="button"]')
      hovering = !!t
    }

    const loop = () => {
      fx += (x - fx) * 0.18
      fy += (y - fy) * 0.18
      const dot = dotRef.current
      const frame = frameRef.current
      if (dot) dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`
      if (frame) {
        const s = hovering ? 2.2 : 1
        frame.style.transform = `translate(${fx - 14}px, ${fy - 14}px) scale(${s})`
        frame.style.opacity = hovering ? 1 : 0.55
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
      {/* dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-[6px] h-[6px] bg-accent"
        style={{ mixBlendMode: 'difference' }}
      />
      {/* bracket frame */}
      <svg
        ref={frameRef}
        className="absolute top-0 left-0 transition-opacity duration-200"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        style={{ willChange: 'transform' }}
      >
        <path d="M1 8 V1 H8" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <path d="M20 1 H27 V8" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <path d="M27 20 V27 H20" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <path d="M8 27 H1 V20" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
