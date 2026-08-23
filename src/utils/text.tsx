import type { ReactNode } from 'react'

/**
 * Renders copy containing **double-asterisk** markers, converting them
 * into accent-colored <strong> spans. Keeps metric highlights data-driven.
 *
 *   renderRich('Cut workload by **95%**')
 *   → Cut workload by <strong class="text-accent">95%</strong>
 */
export function renderRich(text: string, boldClass = 'font-bold text-accent'): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={boldClass}>
        {chunk}
      </strong>
    ) : (
      chunk
    ),
  )
}
