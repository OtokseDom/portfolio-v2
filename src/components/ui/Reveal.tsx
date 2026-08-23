import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUpVariants, useScrollAnimation } from '../../hooks/useScrollAnimation'

interface RevealProps {
  children: ReactNode
  /** extra delay in seconds — use to stagger siblings manually */
  delay?: number
  className?: string
}

/**
 * Fade-up-on-scroll wrapper. Animates once, the first time the element
 * enters the viewport. The workhorse for staggered section content.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useScrollAnimation()
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
