import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { LEETCODE } from '../data/content'
import { rise, EASE } from '../lib/motion'

const DIFF_COLOR = {
  easy: '#00A88B',
  medium: 'var(--amber)',
  hard: '#E05B5B',
}

/* Number that counts up when it scrolls into view. */
function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const t0 = performance.now()
    const dur = 1300
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      setN(value * (1 - Math.pow(1 - p, 3))) // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick)
      else setN(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value])

  const shown = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()
  return <span ref={ref}>{shown}{suffix}</span>
}

/* Donut whose arcs draw themselves on scroll into view. */
function SolvedDonut({ solved }) {
  const total = solved.easy.done + solved.medium.done + solved.hard.done
  const R = 52
  const GAP = 0.012 // fraction of circumference between arcs
  let start = 0
  const arcs = ['easy', 'medium', 'hard'].map((k) => {
    const frac = solved[k].done / total
    const arc = { key: k, frac: Math.max(frac - GAP, 0.01), start }
    start += frac
    return arc
  })

  return (
    <div className="relative w-40 h-40 shrink-0" role="img" aria-label={`${total} problems solved`}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="7" opacity="0.6" />
        {arcs.map((a, i) => (
          <motion.circle
            key={a.key}
            cx="60" cy="60" r={R}
            fill="none"
            stroke={DIFF_COLOR[a.key]}
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: a.start }}
            whileInView={{ pathLength: a.frac, pathOffset: a.start }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, delay: 0.15 + i * 0.2, ease: EASE }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-bright"><CountUp value={total} /></span>
        <span className="text-2xs font-medium text-dim">solved</span>
      </div>
    </div>
  )
}

const DAY = 86400
const lvl = (n) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4)
const ALPHA = [0, 0.25, 0.45, 0.7, 1]

/**
 * Activity heatmap — cells cascade in when scrolled into view.
 * Real calendar data ({epochSeconds: count}) when available, else illustrative.
 */
function Heatmap({ calendar }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  const cells = useMemo(() => {
    const weeks = 52
    if (calendar) {
      const today = Math.floor(Date.now() / 1000 / DAY) * DAY
      const startTs = today - (weeks * 7 - 1) * DAY
      const out = []
      for (let d = startTs; d <= today; d += DAY) out.push(lvl(calendar[String(d)] ?? 0))
      return out
    }
    const out = []
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const s = Math.abs(Math.sin(w * 7.13 + d * 3.71))
        const v = s * (0.55 + 0.45 * (w / weeks))
        out.push(v < 0.55 ? 0 : v < 0.72 ? 1 : v < 0.84 ? 2 : v < 0.94 ? 3 : 4)
      }
    }
    return out
  }, [calendar])

  const animate = inView && !reduced

  return (
    <div ref={ref} aria-hidden="true" className="overflow-x-auto pb-1">
      <div className="grid grid-flow-col gap-[3px] w-max" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
        {cells.map((v, i) => (
          <span
            key={i}
            className={`w-[9px] h-[9px] rounded-[2px] ${animate ? 'hm-cell' : ''}`}
            style={{
              background: v === 0 ? 'var(--line)' : `rgba(18, 114, 232, ${ALPHA[v]})`,
              opacity: !animate && !reduced ? 0 : undefined,
              animationDelay: animate ? `${Math.floor(i / 7) * 14 + (i % 7) * 22}ms` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function LeetCode() {
  const [stats, setStats] = useState(LEETCODE)

  // Load stats generated at build time; falls back to content.js values.
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${import.meta.env.BASE_URL}leetcode.json`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.solved) return
        setStats((s) => ({
          ...s,
          contest: d.contest ?? s.contest,
          solved: d.solved,
          pastYear: d.pastYear ?? s.pastYear,
          calendar: d.calendar ?? null,
        }))
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  const c = stats.contest
  const top = [
    { label: 'contest rating', node: <CountUp value={c.rating} />, accent: true },
    { label: 'top', node: <CountUp value={c.topPercentage} decimals={2} suffix="%" />, accent: true },
    {
      label: 'global ranking',
      node: <><CountUp value={c.globalRanking} /> <span className="text-dim text-sm">/ {c.totalParticipants.toLocaleString()}</span></>,
    },
    { label: 'contests attended', node: <CountUp value={c.attended} /> },
  ]

  return (
    <Section id="leetcode" index="05" title="Problem Solving">
      {/* top stat strip */}
      <motion.dl variants={rise} className="glass rounded-3xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line/70 overflow-hidden">
        {top.map((s) => (
          <div key={s.label} className="p-6">
            <dt className="text-2xs font-semibold uppercase tracking-[0.15em] text-dim">{s.label}</dt>
            <dd className={`mt-1.5 font-display text-xl font-bold ${s.accent ? 'text-accent' : 'text-bright'}`}>
              {s.node}
            </dd>
          </div>
        ))}
      </motion.dl>

      <div className="mt-6 grid lg:grid-cols-[1fr_1.5fr] gap-6">
        {/* overview */}
        <motion.div variants={rise} className="glass rounded-3xl p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xs font-semibold uppercase tracking-[0.15em] text-dim">LeetCode overview</h3>
            <a
              href={LEETCODE.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="text-xs font-semibold text-accent link-sweep"
            >
              View profile →
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <SolvedDonut solved={stats.solved} />
            <ul className="w-full space-y-3">
              {['easy', 'medium', 'hard'].map((k) => (
                <motion.li
                  key={k}
                  whileHover={{ x: 5 }}
                  className="rounded-2xl bg-white/70 border border-line/70 px-4 py-2.5 flex items-center justify-between text-sm"
                >
                  <span style={{ color: DIFF_COLOR[k] }} className="capitalize font-bold">{k}</span>
                  <span>
                    <span className="text-bright font-bold"><CountUp value={stats.solved[k].done} /></span>
                    <span className="text-dim text-xs"> /{stats.solved[k].total}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* activity */}
        <motion.div variants={rise} className="glass rounded-3xl p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-6">
            <h3 className="text-sm">
              <span className="font-display text-xl font-bold text-bright"><CountUp value={stats.pastYear.submissions} /></span>
              <span className="text-dim"> submissions in the past year</span>
            </h3>
            <p className="text-2xs text-dim">
              active days: <span className="text-ink font-bold">{stats.pastYear.activeDays}</span>
              <span className="mx-2 text-line">|</span>
              max streak: <span className="text-ink font-bold">{stats.pastYear.maxStreak}</span>
            </p>
          </div>
          <Heatmap calendar={stats.calendar} />
          <div className="mt-4 flex items-center justify-end gap-1.5 text-2xs text-dim">
            less
            {ALPHA.slice(1).map((a) => (
              <span key={a} className="w-[9px] h-[9px] rounded-[2px]" style={{ background: `rgba(18, 114, 232, ${a})` }} />
            ))}
            more
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
