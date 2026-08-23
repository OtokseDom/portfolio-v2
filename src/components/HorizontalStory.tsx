import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { MoveRight } from 'lucide-react'
import { STORY_CARDS } from '../utils/data'
import type { StoryCardData } from '../utils/data'
import { renderRich } from '../utils/text'

/**
 * THE 95% STORY — a full-screen pinned panel that hijacks nothing and
 * hides nothing: the section is `panels × 100vh` tall, its inner stage
 * sticks to the viewport, and page scroll drives the stage sideways.
 *
 *   scroll down → panels advance left-to-right
 *   scroll up   → they rewind
 * There is no way past it except through the whole story. Works
 * identically on touch (swipe up/down) since it is native scrolling.
 */
export function HorizontalStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const prefersReduced = useReducedMotion()
  const [chapter, setChapter] = useState(0)

  // 0 → 1 across the entire pinned distance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  const travel = (STORY_CARDS.length - 1) * 100 // vw per full traversal
  const x = useTransform(smooth, [0, 1], ['0vw', `${-travel}vw`])

  // Active chapter counter (flips exactly at each panel boundary)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setChapter(Math.min(STORY_CARDS.length - 1, Math.floor(v * STORY_CARDS.length)))
  })

  /* Reduced motion: no pinning — plain stacked panels. */
  if (prefersReduced) {
    return (
      <section id="story" className="bg-blueprint-dark bg-ink py-24 text-paper">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="grid gap-16">
            {STORY_CARDS.map((card, i) => (
              <StoryPanel key={card.phase} card={card} index={i} total={STORY_CARDS.length} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-ink text-paper"
      style={{ height: `${STORY_CARDS.length * 100}vh` }}
    >
      {/* Pinned full-screen stage */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header strip */}
        <header className="flex items-center justify-between border-b-2 border-paper/15 px-4 py-4 md:px-8">
          <p className="font-heading text-sm font-bold tracking-[0.25em] text-accent md:text-base">
            [ 01 ] THE 95% STORY
          </p>
          <p className="hidden items-center gap-2 font-mono text-xs tracking-widest text-paper/50 lg:flex">
            KEEP SCROLLING — THE STORY MOVES SIDEWAYS <MoveRight size={14} />
          </p>
          <p aria-hidden className="font-heading text-lg font-extrabold tabular-nums md:text-xl">
            <span className="text-accent">{String(chapter + 1).padStart(2, '0')}</span>
            <span className="text-paper/40"> / {String(STORY_CARDS.length).padStart(2, '0')}</span>
          </p>
        </header>

        {/* Sliding track */}
        <motion.div style={{ x }} className="flex h-full w-full" aria-live="polite">
          {STORY_CARDS.map((card, i) => (
            <StoryPanel key={card.phase} card={card} index={i} total={STORY_CARDS.length} />
          ))}
        </motion.div>

        {/* Progress rail */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 overflow-hidden bg-paper/10">
          <motion.div style={{ scaleX: smooth }} className="h-full w-full origin-left bg-accent" />
        </div>
      </div>
    </section>
  )
}

/* ── Panel ──────────────────────────────────────────────────────── */

function StoryPanel({ card, index }: { card: StoryCardData; index: number; total: number }) {
  return (
    <article className="relative flex h-full w-screen shrink-0 items-center overflow-hidden">
      {/* Ghost chapter number */}
      <span
        aria-hidden
        className="text-outline-paper pointer-events-none absolute -right-4 bottom-0 select-none font-heading text-[38vh] font-extrabold leading-none opacity-20 md:text-[42vh]"
      >
        0{index + 1}
      </span>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-14">
        {/* Copy */}
        <div className="relative z-10">
          <span className="inline-block border-2 border-paper bg-accent px-2 py-1 font-heading text-xs font-bold uppercase tracking-[0.25em] text-paper">
            {card.phase}
          </span>

          <h3 className="mt-6 font-heading text-3xl font-extrabold uppercase leading-[1.02] sm:text-4xl xl:text-6xl">
            {card.title}
          </h3>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper/70 md:text-base">
            {renderRich(card.description, 'font-bold text-paper')}
          </p>

          <p className="mt-8 max-w-md border-l-4 border-accent pl-4 font-heading text-base font-bold uppercase leading-snug md:text-xl">
            {renderRich(card.stat)}
          </p>
        </div>

        {/* Visual */}
        <figure className="relative z-10 m-0">
          <div className="border-4 border-paper shadow-brutal-accent">
            <img
              src={card.image}
              alt={card.imageAlt}
              loading="lazy"
              draggable={false}
              className={`h-[34vh] w-full object-cover md:h-[46vh] ${card.imageClass}`}
            />
          </div>
          <figcaption className="mt-3 inline-block border-2 border-paper/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/60">
            CH.0{index + 1} — {card.phase}
          </figcaption>
        </figure>
      </div>
    </article>
  )
}
