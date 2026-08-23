import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** kicker number, e.g. "01" */
  index: string
  title: string
  sub?: string
  /** 'dark' = section has dark background (ink), flips text/border colors */
  tone?: 'light' | 'dark'
}

/**
 * Numbered brutalist section header:
 * "[ 01 ]" kicker + huge mono title + optional right-aligned blurb,
 * sitting on a thick rule.
 */
export function SectionHeading({ index, title, sub, tone = 'light' }: SectionHeadingProps) {
  const onDark = tone === 'dark'
  return (
    <div className={`mb-12 border-b-4 pb-6 md:mb-16 ${onDark ? 'border-paper' : 'border-ink'}`}>
      <Reveal>
        <p className="font-heading text-sm font-bold tracking-[0.25em] text-accent md:text-base">
          [ {index} ]
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2
            className={`font-heading text-3xl font-extrabold uppercase leading-tight sm:text-4xl md:text-5xl ${
              onDark ? 'text-paper' : 'text-ink'
            }`}
          >
            {title}
          </h2>
          {sub && (
            <p className={`max-w-md text-sm leading-relaxed md:text-base ${onDark ? 'text-paper/60' : 'text-neutral-500'}`}>
              {sub}
            </p>
          )}
        </div>
      </Reveal>
    </div>
  )
}
