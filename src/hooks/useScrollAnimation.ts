import { useInView } from 'react-intersection-observer'
import type { Variants } from 'framer-motion'

/**
 * Scroll-reveal sensor built on react-intersection-observer.
 * Returns a ref to attach to the element plus an `inView` flag you feed
 * into Framer Motion's `animate` prop.
 */
export function useScrollAnimation(options?: {
  threshold?: number
  rootMargin?: string
}) {
  const { threshold = 0.15, rootMargin = '0px 0px -48px 0px' } = options ?? {}
  const { ref, inView } = useInView({ threshold, rootMargin, triggerOnce: true })
  return { ref, inView }
}

/** Single element: fade up into place. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Parent container: orchestrates staggered children.
 * Children should use `fadeUpVariants` with matching initial/animate states.
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}
