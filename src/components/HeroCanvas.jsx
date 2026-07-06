import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../lib/motion'

/**
 * Hero background: a drifting particle field connected into a faint
 * network graph, plus occasional "packets" that travel along edges.
 * Static single frame on reduced-motion; lower density on mobile.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()
  const coarse = useIsCoarsePointer()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, dpr, raf
    let mouse = { x: -9999, y: -9999 }

    const density = coarse ? 26 : 60
    const nodes = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    for (let i = 0; i < density; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
      })
    }

    const LINK = 130
    const draw = (animate) => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (animate) {
          n.x += n.vx
          n.y += n.vy
          // gentle mouse repulsion
          const dx = n.x - mouse.x, dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 90 * 90) {
            n.x += dx / Math.sqrt(d2) * 0.6
            n.y += dy / Math.sqrt(d2) * 0.6
          }
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
        }
        ctx.fillStyle = 'rgba(84, 241, 150, 0.5)'
        ctx.fillRect(n.x - n.r / 2, n.y - n.r / 2, n.r, n.r)
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(84, 241, 150, ${0.09 * (1 - d / LINK)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    if (reduced) {
      draw(false)
    } else {
      const loop = () => {
        draw(true)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onResize = () => { resize(); if (reduced) draw(false) }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced, coarse])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-70"
    />
  )
}
