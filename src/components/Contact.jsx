import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Magnetic from './Magnetic'
import { SITE } from '../data/content'
import { rise } from '../lib/motion'

const inputCls =
  'w-full bg-bg border border-line px-4 py-3 text-sm text-ink placeholder:text-dim/60 focus:border-accent focus:outline-none transition-colors'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // No backend needed — composes a mail draft to SITE.email
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[portfolio] message from ${form.name || 'visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" index="07" title="contact">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <motion.div variants={rise}>
          <p className="text-ink leading-relaxed max-w-md">
            <span className="text-dim select-none">{'> '}</span>
            Open to internships, research collaborations, and interesting problems in
            ML systems & data engineering.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  data-hover
                  className="link-sweep text-ink hover:text-accent"
                >
                  <span className="text-dim">{s.label}:</span>{' '}
                  {s.url.replace('mailto:', '').replace('https://', '')} ↗
                </a>
              </li>
            ))}
            <li className="text-dim">{SITE.phone}</li>
          </ul>
          <div className="mt-8">
            <Magnetic>
              <a
                href={`${import.meta.env.BASE_URL}${SITE.resumeFile}`}
                download
                data-hover
                className="inline-block border border-accent text-accent px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors duration-300"
              >
                download resume ↓
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.form variants={rise} onSubmit={submit} className="border border-line bg-panel p-6 sm:p-8" aria-label="Contact form">
          <p className="text-2xs text-dim mb-6">$ ./send_message --to {SITE.handle}</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="c-name" className="block text-2xs text-dim mb-1.5">--name</label>
              <input id="c-name" required value={form.name} onChange={set('name')} className={inputCls} placeholder="Ada Lovelace" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-2xs text-dim mb-1.5">--reply-to</label>
              <input id="c-email" type="email" required value={form.email} onChange={set('email')} className={inputCls} placeholder="you@domain.com" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="c-msg" className="block text-2xs text-dim mb-1.5">--message</label>
              <textarea id="c-msg" required rows={5} value={form.message} onChange={set('message')} className={`${inputCls} resize-y`} placeholder="Let's build something." />
            </div>
          </div>
          <button
            type="submit"
            data-hover
            className="mt-6 w-full border border-accent text-accent px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors duration-300"
          >
            execute →
          </button>
        </motion.form>
      </div>
    </Section>
  )
}
