import { SECTIONS } from '../data/content'

/** Fixed left rail — section index that tracks scroll position. */
export default function ScrollRail({ activeSection }) {
  return (
    <aside
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-hidden="true"
    >
      <ol className="space-y-3 text-2xs">
        {SECTIONS.map((s, i) => {
          const active = activeSection === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-hover
                tabIndex={-1}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  active ? 'text-accent' : 'text-line hover:text-dim'
                }`}
              >
                <span
                  className={`block h-px transition-all duration-300 ${
                    active ? 'w-8 bg-accent' : 'w-4 bg-line'
                  }`}
                />
                <span className={active ? 'opacity-100' : 'opacity-0'}>
                  [{String(i).padStart(2, '0')}] {s.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
