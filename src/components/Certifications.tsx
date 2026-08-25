import { useRef } from 'react'
import { Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { CERTIFICATIONS, certImage } from '../utils/data'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/**
 * CERTIFICATIONS — compact credential wall on a horizontal scroll
 * strip. Native overflow scrolling (swipe / trackpad / shift-wheel),
 * NOT scroll-jacked like the story section: the page keeps flowing
 * vertically. Missing certificate scans render a placeholder tile.
 */
export function Certifications() {
  const trackRef = useRef<HTMLUListElement>(null)

  const nudge = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section id="certs" className="bg-blueprint bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="05"
          title="Certifications"
          sub="Credentials backing the stack — scans straight from the source."
        />

        {/* Strip controls */}
        <Reveal delay={0.08}>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">{'// drag or scroll sideways'}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll certifications backward"
                className="grid h-11 w-11 cursor-pointer place-items-center border-4 border-ink bg-paper text-ink shadow-brutal-sm transition-all duration-200 hover:bg-accent hover:text-paper active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll certifications forward"
                className="grid h-11 w-11 cursor-pointer place-items-center border-4 border-ink bg-paper text-ink shadow-brutal-sm transition-all duration-200 hover:bg-accent hover:text-paper active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal credential strip */}
        <ul ref={trackRef} className="flex list-none snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {CERTIFICATIONS.map((cert, i) => {
            const image = certImage(cert.file)
            return (
              <li key={cert.title} className="w-[280px] shrink-0 snap-start sm:w-[300px]">
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="group flex h-full flex-col border-4 border-ink bg-paper shadow-brutal-sm transition-shadow duration-200 hover:shadow-brutal">
                    {/* Badge header strip */}
                    <div className="flex items-center justify-between border-b-4 border-ink bg-accent px-4 py-2 transition-colors duration-200 group-hover:bg-ink">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper">Credential</span>
                      <Award size={14} className="text-paper" aria-hidden />
                    </div>

                    {/* Certificate scan window */}
                    <div className="relative mx-4 mt-4 aspect-[16/10] overflow-hidden border-2 border-ink bg-fog">
                      {image ? (
                        <img src={image} alt={`${cert.title} certificate`} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <div className="bg-hatch grid h-full w-full place-items-center">
                          <span className="border-2 border-dashed border-ink/30 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                            Scan pending
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-heading text-sm font-extrabold uppercase leading-snug">{cert.title}</h3>
                      <dl className="mt-auto space-y-1.5 border-t-2 border-dashed border-ink/20 pt-3 font-mono">
                        <div className="flex items-start justify-between gap-3">
                          <dt className="shrink-0 pt-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400">Where</dt>
                          <dd className="break-words text-right font-mono text-xs font-medium text-ink">{cert.issuer}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <dt className="shrink-0 pt-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400">Date</dt>
                          <dd className="text-right font-mono text-xs font-bold uppercase tracking-wider text-accent">{cert.date}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
          {/* Trailing spacer so the last card clears the container padding */}
          <li aria-hidden className="w-1 shrink-0" />
        </ul>
      </div>
    </section>
  )
}
