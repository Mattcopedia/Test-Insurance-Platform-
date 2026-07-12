import { cn } from '@wrapa/ui'
import type { CSSProperties } from 'react'

export type ScrollRevealVariant = 'default' | 'subtle' | 'card' | 'heading'

const variantClass: Record<ScrollRevealVariant, string> = {
  default: 'scroll-reveal',
  subtle: 'scroll-reveal scroll-reveal-subtle',
  card: 'scroll-reveal scroll-reveal-card',
  heading: 'scroll-reveal scroll-reveal-heading',
}

/** Classes for a block that fades up into place when scrolled into view. */
export function scrollRevealClasses(isInView: boolean, variant: ScrollRevealVariant = 'default') {
  return cn(variantClass[variant], isInView && 'scroll-reveal-visible')
}

/** Stagger delay for grid/list children — only applied once visible. */
export function scrollRevealStagger(
  isInView: boolean,
  index: number,
  step = 120,
  max = 500
): CSSProperties {
  return { transitionDelay: isInView ? `${Math.min(index * step, max)}ms` : '0ms' }
}
