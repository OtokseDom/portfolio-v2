import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  /** ms per character */
  charMs?: number
  /** pause between lines */
  linePauseMs?: number
  /** skip animation entirely (prefers-reduced-motion) */
  instant?: boolean
}

interface TypewriterResult {
  /** fully typed lines */
  doneLines: string[]
  /** partially typed current line ('' when finished) */
  currentLine: string
  done: boolean
}

/**
 * Types an array of lines character-by-character once `active` is true.
 * Pending timers are cleaned up on unmount / re-run.
 */
export function useTypewriter(
  lines: readonly string[],
  active: boolean,
  options: UseTypewriterOptions = {},
): TypewriterResult {
  const { charMs = 26, linePauseMs = 420, instant = false } = options
  const [pos, setPos] = useState({ line: 0, char: 0 })

  useEffect(() => {
    if (instant && pos.line < lines.length) {
      setPos({ line: lines.length, char: 0 })
      return
    }
    if (!active || pos.line >= lines.length) return

    const currentLine = lines[pos.line]
    let timer: ReturnType<typeof setTimeout>

    if (pos.char < currentLine.length) {
      timer = setTimeout(() => setPos((p) => ({ ...p, char: p.char + 1 })), charMs)
    } else {
      timer = setTimeout(() => setPos((p) => ({ line: p.line + 1, char: 0 })), linePauseMs)
    }
    return () => clearTimeout(timer)
  }, [active, instant, pos, lines, charMs, linePauseMs])

  return {
    doneLines: lines.slice(0, pos.line),
    currentLine: pos.line < lines.length ? lines[pos.line].slice(0, pos.char) : '',
    done: pos.line >= lines.length,
  }
}
