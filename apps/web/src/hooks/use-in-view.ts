'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean `isInView`.
 * Once the element enters the viewport, `isInView` becomes true and stays true permanently
 * — the IntersectionObserver is disconnected immediately after the first intersection.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  const threshold = options?.threshold ?? 0.12
  const rootMargin = options?.rootMargin ?? '0px 0px -8% 0px'
  const root = options?.root ?? null

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin, root }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, root])

  return { ref, isInView }
}
