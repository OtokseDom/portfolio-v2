import { MARQUEE_ITEMS } from '../utils/data'

/**
 * Accent ticker strip between hero and story. The item list is
 * duplicated and translated -50% for a seamless infinite loop.
 * Decorative only — hidden from screen readers.
 */
export function Marquee() {
  const text = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].join('  ✕  ') + '  ✕  '
  return (
    <section aria-hidden className="overflow-hidden border-y-4 border-ink bg-accent py-3">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        <span className="pr-8 font-heading text-sm font-bold uppercase tracking-wider text-paper md:text-base">
          {text}
        </span>
        <span className="pr-8 font-heading text-sm font-bold uppercase tracking-wider text-paper md:text-base">
          {text}
        </span>
      </div>
    </section>
  )
}
