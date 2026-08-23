import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { PROFILE, TERMINAL_LINES } from '../utils/data'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTypewriter } from '../hooks/useTypewriter'
import { Reveal } from './ui/Reveal'

/**
 * HERO — split layout:
 *   left: transparent ID photo floating over a slowly scrolling wall
 *         of code (brutalist frame, accent offset layer, hard shadow)
 *   right: name, tagline, and a self-typing terminal proving the 95%
 * Both columns drift on mouse parallax at different depths.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotion()

  // ── Mouse parallax ──────────────────────────────────────────────
  // Normalized cursor position (-0.5 … 0.5) → sprung motion values.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 })

  const depth = prefersReduced ? 0 : 1

  const photoX = useTransform(sx, (v) => v * 22 * depth)
  const photoY = useTransform(sy, (v) => v * 14 * depth)
  const glowX = useTransform(sx, (v) => v * 46 * depth) // accent frame — deepest layer
  const glowY = useTransform(sy, (v) => v * 30 * depth)
  const termX = useTransform(sx, (v) => v * -30 * depth)
  const termY = useTransform(sy, (v) => v * -18 * depth)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReduced || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // Typing starts once the hero is visible; reduced-motion renders instantly.
  const { ref: viewRef, inView } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-blueprint relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 md:pt-32"
    >
      {/* Corner registration marks */}
      <span aria-hidden className="pointer-events-none absolute left-4 top-24 hidden font-mono text-2xl text-ink/20 lg:block">+</span>
      <span aria-hidden className="pointer-events-none absolute right-4 top-24 hidden font-mono text-2xl text-ink/20 lg:block">+</span>
      <span aria-hidden className="pointer-events-none absolute bottom-8 left-4 hidden font-mono text-2xl text-ink/20 lg:block">+</span>
      <span aria-hidden className="pointer-events-none absolute bottom-8 right-4 hidden font-mono text-2xl text-ink/20 lg:block">+</span>

      <div ref={viewRef} className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* ── Left: portrait over scrolling code ─────────────────── */}
        <motion.figure style={{ x: photoX, y: photoY }} className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          {/* Accent offset frame — deepest layer, drifts furthest */}
          <motion.div style={{ x: glowX, y: glowY }} aria-hidden className="absolute inset-0">
            <div className="h-full w-full translate-x-5 translate-y-5 border-4 border-accent" />
          </motion.div>

          {/* Code backdrop panel */}
          <div className="absolute inset-0 overflow-hidden border-4 border-ink bg-paper shadow-brutal-lg">
            <CodeRain />
            {/* corner ticks on the frame */}
            <span aria-hidden className="absolute left-2 top-1 z-20 font-mono text-sm text-ink/30">+</span>
            <span aria-hidden className="absolute right-2 top-1 z-20 font-mono text-sm text-ink/30">+</span>
            {/* file chip */}
            <span className="absolute left-3 top-3 z-20 border-2 border-ink bg-paper px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-ink">
              PROFILE.PNG
            </span>
            {/* barcode strip */}
            <span aria-hidden className="absolute bottom-3 right-3 z-20 flex items-end gap-[3px]">
              {[10, 22, 6, 18, 12, 26, 8, 16].map((w, i) => (
                <i key={i} className="block h-7 bg-ink/80" style={{ width: `${w % 3 === 0 ? 3 : 2}px` }} />
              ))}
            </span>
          </div>

          {/* The subject — anchored to the bottom edge of the frame */}
          <img
            src={PROFILE.photo}
            alt={`Portrait of ${PROFILE.name}`}
            className="absolute bottom-0 left-1/2 z-10 max-h-[86%] -translate-x-1/2 object-contain contrast-125 [filter:grayscale(1)_contrast(1.25)_drop-shadow(8px_8px_0_rgba(231,76,60,0.9))]"
          />
        </motion.figure>

        {/* ── Right: identity + terminal ─────────────────────────── */}
        <div>
          <Reveal>
            <p className="font-heading text-sm font-bold tracking-widest text-accent md:text-base">
              {'// FULL-STACK DEVELOPER'}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-4 font-heading text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl xl:text-7xl">
              John Dominic
              <br />
              <span className="bg-accent px-1 text-paper">Escoto</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg font-medium leading-snug text-ink md:text-2xl">
              I build systems that save people{' '}
              <strong className="text-accent">95%</strong> of their time.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="border-4 border-ink bg-ink px-6 py-3 font-heading text-sm font-extrabold uppercase tracking-widest text-paper transition-colors duration-200 hover:border-accent hover:bg-accent"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border-4 border-ink bg-paper px-6 py-3 font-heading text-sm font-extrabold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                Get in Touch
              </a>
            </div>
          </Reveal>

          {/* Terminal drifts opposite the photo for depth */}
          <motion.div style={{ x: termX, y: termY }} className="mt-10 lg:mt-12">
            <Terminal active={inView} instant={!!prefersReduced} />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex">
        <span className="font-mono text-[10px] tracking-[0.35em] text-neutral-400">SCROLL</span>
        <ChevronDown size={16} className="animate-bounce text-ink" />
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   CODE RAIN — a "hacker terminal" backdrop: columns of code glyphs
   falling and dissolving behind the portrait. Canvas-driven, DPR-aware,
   throttled to a chunky ~20fps cadence (reads as machine, not noise).
   Ink glyphs with sparse accent hits; masked so it fades at the edges.
   Under prefers-reduced-motion it renders one static scatter frame.
   ════════════════════════════════════════════════════════════════ */

const GLYPHS = '01{}[]<>/*+=;:#$&_?!|%~^\\abcdefgikmnopqrstuvxyzACDEFIQRSTUVX'

function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const FONT = 13

    let width = 0
    let height = 0
    let cols = 0
    let drops: number[] = []
    let raf = 0
    let last = 0

    const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / FONT)
      // randomized starting heights so columns desync naturally
      drops = Array.from({ length: cols }, () => Math.floor((Math.random() * height) / FONT))
      if (reduced) paintStatic()
    }

    /** One full-frame draw pass of the rain. */
    const step = () => {
      // translucent paper wash → trails dissolve instead of smearing forever
      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `bold ${FONT}px "JetBrains Mono", monospace`

      for (let i = 0; i < cols; i++) {
        const x = i * FONT
        const y = drops[i] * FONT
        // rare accent glyph — the "signal" inside the noise
        ctx.fillStyle = Math.random() < 0.05 ? '#e74c3c' : 'rgba(26, 26, 26, 0.5)'
        ctx.fillText(randomGlyph(), x, y)

        if (y > height && Math.random() > 0.972) drops[i] = 0
        else drops[i] += 1
      }
    }

    /** Reduced motion: single static scatter, no loop. */
    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.font = `bold ${FONT}px "JetBrains Mono", monospace`
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < Math.ceil(height / FONT); y++) {
          if (Math.random() > 0.82) continue
          ctx.fillStyle = Math.random() < 0.06 ? '#e74c3c' : 'rgba(26, 26, 26, 0.35)'
          ctx.fillText(randomGlyph(), x * FONT, y * FONT)
        }
      }
    }

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (t - last < 50) return // ≈20fps — deliberate hacker cadence
      last = t
      step()
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <div aria-hidden className="mask-fade-y absolute inset-0 overflow-hidden opacity-80">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   TERMINAL — types out the efficiency report when scrolled into view.
   ════════════════════════════════════════════════════════════════ */

function Terminal({ active, instant }: { active: boolean; instant: boolean }) {
  const { doneLines, currentLine } = useTypewriter(TERMINAL_LINES, active, {
    instant,
    charMs: 26,
    linePauseMs: 400,
  })

  const renderLine = (line: string, key: number) => {
    const isPrompt = line.startsWith('$')
    const isHot = line.includes('95%') || line.startsWith('STATUS')

    if (isPrompt) {
      const rest = line.slice(1)
      return (
        <p key={key}>
          <span className="font-bold text-accent">$</span>
          <span className="text-paper">{rest}</span>
        </p>
      )
    }
    return (
      <p key={key} className={isHot ? 'font-bold text-accent' : 'text-neutral-300'}>
        {line}
      </p>
    )
  }

  return (
    <div className="border-4 border-ink bg-ink shadow-brutal-accent">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b-4 border-ink bg-paper px-4 py-2.5">
        <span className="h-3 w-3 bg-accent" />
        <span className="h-3 w-3 bg-ink" />
        <span className="h-3 w-3 bg-neutral-400" />
        <span className="ml-2 font-mono text-xs font-bold text-ink">john@escoto:~/portfolio</span>
      </div>

      {/* Output */}
      <div className="min-h-[232px] overflow-hidden p-5 font-mono text-[13px] leading-6 md:min-h-[248px] md:text-sm">
        {doneLines.map((line, i) => renderLine(line, i))}
        {!instant && currentLine && (
          <p className="text-neutral-300">
            {currentLine}
            <Cursor />
          </p>
        )}
        {(instant || (!currentLine && doneLines.length > 0)) && <Cursor />}
      </div>
    </div>
  )
}

/** Blinking block cursor — square, of course. */
function Cursor() {
  return <span aria-hidden className="ml-0.5 inline-block h-4 w-2.5 translate-y-[3px] animate-blink bg-accent" />
}
