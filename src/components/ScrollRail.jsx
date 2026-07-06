import { SECTIONS } from '../data/content'

/** Fixed left rail — dot-per-section indicator that tracks scroll position. */
export default function ScrollRail({ activeSection }) {
  return (
    <aside
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-hidden="true"
    >
      <ol className="space-y-4 text-2xs">
        {SECTIONS.map((s) => {
          const active = activeSection === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-hover
                tabIndex={-1}
                className="group flex items-center gap-2.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active ? 'w-2.5 h-2.5 bg-accent' : 'w-1.5 h-1.5 bg-line group-hover:bg-dim'
                  }`}
                />
                <span
                  className={`font-medium transition-opacity duration-300 ${
                    active ? 'text-accent opacity-100' : 'opacity-0 group-hover:opacity-60 text-dim'
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
