import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { LEETCODE } from '../data/content'
import { rise } from '../lib/motion'

const DIFF_COLOR = {
  easy: 'var(--accent)',
  medium: 'var(--amber)',
  hard: '#E06C5B',
}

/* Donut: three arcs sized by each difficulty's share of solved problems. */
function SolvedDonut({ solved }) {
  const total = solved.easy.done + solved.medium.done + solved.hard.done
  const R = 52
  const C = 2 * Math.PI * R
  const GAP = 6
  let offset = 0
  const arcs = ['easy', 'medium', 'hard'].map((k) => {
    const len = (solved[k].done / total) * C - GAP
    const arc = { key: k, len: Math.max(len, 2), offset }
    offset += (solved[k].done / total) * C
    return arc
  })

  return (
    <div className="relative w-40 h-40 shrink-0" role="img" aria-label={`${total} problems solved`}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="6" opacity="0.5" />
        {arcs.map((a) => (
          <circle
            key={a.key}
            cx="60" cy="60" r={R}
            fill="none"
            stroke={DIFF_COLOR[a.key]}
            strokeWidth="6"
            strokeLinecap="butt"
            strokeDasharray={`${a.len} ${C - a.len}`}
            strokeDashoffset={-a.offset}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-bright">{total}</span>
        <span className="text-2xs text-dim">solved</span>
      </div>
    </div>
  )
}

const DAY = 86400
const level = (n) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4)
const ALPHA = [0, 0.25, 0.45, 0.7, 1]

/**
 * Activity heatmap. With real calendar data ({epochSeconds: count}, from
 * public/leetcode.json) it plots actual submissions; otherwise it renders a
 * deterministic illustrative pattern.
 */
function Heatmap({ calendar }) {
  const cells = useMemo(() => {
    const weeks = 52
    if (calendar) {
      const today = Math.floor(Date.now() / 1000 / DAY) * DAY
      const start = today - (weeks * 7 - 1) * DAY
      const out = []
      for (let d = start; d <= today; d += DAY) {
        out.push(level(calendar[String(d)] ?? 0))
      }
      return out
    }
    // illustrative fallback
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

  return (
    <div aria-hidden="true" className="overflow-x-auto pb-1">
      <div className="grid grid-flow-col gap-[3px] w-max" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
        {cells.map((v, i) => (
          <span
            key={i}
            className="w-[9px] h-[9px] rounded-[1px]"
            style={{ background: v === 0 ? 'var(--line)' : `rgba(84, 241, 150, ${ALPHA[v]})` }}
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
    { label: 'contest rating', value: c.rating.toLocaleString(), accent: true },
    { label: 'top', value: `${c.topPercentage}%`, accent: true },
    { label: 'global ranking', value: `${c.globalRanking.toLocaleString()} / ${c.totalParticipants.toLocaleString()}` },
    { label: 'contests attended', value: c.attended },
  ]

  return (
    <Section id="leetcode" index="05" title="problem_solving">
      {/* top stat strip */}
      <motion.dl
        variants={rise}
        className="grid grid-cols-2 md:grid-cols-4 border border-line divide-x divide-y md:divide-y-0 divide-line bg-panel"
      >
        {top.map((s) => (
          <div key={s.label} className="p-5">
            <dt className="text-2xs text-dim">{s.label}</dt>
            <dd className={`mt-1 text-xl font-extrabold ${s.accent ? 'text-accent' : 'text-bright'}`}>
              {s.value}
            </dd>
          </div>
        ))}
      </motion.dl>

      <div className="mt-5 grid lg:grid-cols-[1fr_1.5fr] gap-5">
        {/* overview */}
        <motion.div variants={rise} className="border border-line bg-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xs text-dim">$ lc stats --user {stats.username}</h3>
            <a
              href={LEETCODE.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-hover
              className="text-2xs text-accent link-sweep"
            >
              view profile →
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <SolvedDonut solved={stats.solved} />
            <ul className="w-full space-y-3">
              {['easy', 'medium', 'hard'].map((k) => (
                <li key={k} className="border border-line px-4 py-2.5 flex items-center justify-between text-xs">
                  <span style={{ color: DIFF_COLOR[k] }} className="capitalize font-bold">{k}</span>
                  <span>
                    <span className="text-bright font-bold">{stats.solved[k].done}</span>
                    <span className="text-dim"> /{stats.solved[k].total}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* activity */}
        <motion.div variants={rise} className="border border-line bg-panel p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-6">
            <h3 className="text-sm">
              <span className="text-xl font-extrabold text-bright">{stats.pastYear.submissions}</span>
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
              <span key={a} className="w-[9px] h-[9px] rounded-[1px]" style={{ background: `rgba(84, 241, 150, ${a})` }} />
            ))}
            more
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
