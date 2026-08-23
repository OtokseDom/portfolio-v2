import { EXPERIENCE } from '../utils/data'
import { renderRich } from '../utils/text'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/**
 * EXPERIENCE — vertical timeline. Thick accent rule on the left,
 * square nodes, mono date chips. Metrics inside bullets are rendered
 * bold + accent via the **marker** convention.
 */
export function Experience() {
  return (
    <section id="experience" className="bg-blueprint-dark bg-ink py-24 text-paper">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="04"
          title="Experience"
          tone="dark"
          sub="Six years of shipping — from .NET internship to leading a four-dev team."
        />

        <ol className="ml-3 max-w-3xl list-none">
          {EXPERIENCE.map((job, i) => (
            <li key={job.company} className={`relative border-l-4 border-accent pl-8 md:pl-10 ${i < EXPERIENCE.length - 1 ? 'pb-14' : ''}`}>
              <Reveal>
                {/* Timeline node */}
                <span aria-hidden className="absolute -left-2 top-0 h-5 w-5 border-4 border-accent bg-paper" />

                <span className="inline-block bg-accent px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
                  {job.period}
                </span>

                <h3 className="mt-4 font-heading text-xl font-extrabold uppercase leading-tight md:text-2xl">
                  {job.role}
                </h3>
                <p className="mt-1 font-medium text-paper/60">{job.company}</p>

                <ul className="mt-4 list-none space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-paper/80 md:text-base">
                      <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 bg-accent" />
                      <span>{renderRich(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
