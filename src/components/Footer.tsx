import { PROFILE } from '../utils/data'

/**
 * FOOTER — giant hollow wordmark bleeding off the bottom edge,
 * then a thin utility bar: copyright, stack credit, back-to-top.
 */
export function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-paper">
      {/* Oversized outline signature */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[3vw] text-center font-heading text-[17vw] font-extrabold uppercase leading-[0.85] opacity-10 text-outline">
          {PROFILE.lastName}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t-4 border-ink px-4 py-6 md:px-8">
        <p className="font-mono text-xs text-neutral-500">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <p className="hidden font-mono text-xs text-neutral-500 sm:block">
          DESIGNED & BUILT WITH REACT · TYPESCRIPT · TAILWIND
        </p>
        <a
          href="#home"
          className="font-heading text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:text-accent"
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  )
}
