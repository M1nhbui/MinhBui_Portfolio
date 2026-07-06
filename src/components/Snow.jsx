import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../lib/motion'

/**
 * Site-wide snow drift: pale specks falling slowly with a sine sway.
 * Sits behind all content (negative z), never intercepts input.
 * Disabled entirely under prefers-reduced-motion; lower density on mobile.
 */
export default function Snow() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const COUNT = coarse ? 70 : 190
    const flakes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.0 + Math.random() * 2.0,          // radius
      vy: 0.25 + Math.random() * 0.6,        // fall speed
      sway: 0.4 + Math.random() * 0.9,       // sway amplitude
      phase: Math.random() * Math.PI * 2,
      alpha: 0.35 + Math.random() * 0.35,
      ex: 0,                                  // extra velocity from cursor
      ey: 0,
    }))

    // cursor state — position + velocity (for gusts) + click bursts
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 }
    const onMove = (e) => {
      mouse.vx = e.clientX - mouse.x
      mouse.vy = e.clientY - mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    // click = shockwave: every flake in a wide radius gets blasted outward
    const onDown = (e) => {
      const BURST = 260
      for (const f of flakes) {
        const dx = f.x - e.clientX
        const dy = f.y - e.clientY
        const d2 = dx * dx + dy * dy
        if (d2 < BURST * BURST) {
          const d = Math.sqrt(d2) || 1
          const force = Math.pow(1 - d / BURST, 1.5)
          f.ex += (dx / d) * force * 14
          f.ey += (dy / d) * force * 14
        }
      }
    }

    const REACH = 190 // px radius of cursor influence
    let t = 0
    const loop = () => {
      t += 0.008
      mouse.vx *= 0.85 // gust fades even without new events
      mouse.vy *= 0.85
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        // cursor interaction: push away + drag along fast movements
        const dx = f.x - mouse.x
        const dy = f.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < REACH * REACH) {
          const d = Math.sqrt(d2) || 1
          const force = 1 - d / REACH
          f.ex += (dx / d) * force * 1.7 + mouse.vx * force * 0.09
          f.ey += (dy / d) * force * 1.7 + mouse.vy * force * 0.09
        }
        // extra velocity decays so flakes settle back into their fall
        f.ex *= 0.93
        f.ey *= 0.93

        f.y += f.vy + f.ey
        f.x += Math.sin(t * 1.6 + f.phase) * f.sway * 0.3 + f.ex

        if (f.y > h + 4) {
          f.y = -4
          f.x = Math.random() * w
        }
        if (f.y < -6) f.y = h + 4
        if (f.x > w + 4) f.x = -4
        if (f.x < -4) f.x = w + 4

        // agitated flakes glow slightly brighter
        const energy = Math.min(Math.abs(f.ex) + Math.abs(f.ey), 6) / 6
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r * (1 + energy * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${88 + energy * 60}, ${128 + energy * 40}, ${182 + energy * 60}, ${Math.min(f.alpha + energy * 0.3, 0.9)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(loop)
    }
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVis)
    if (!coarse) window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [reduced, coarse])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
