'use client'

import { useEffect, useState } from 'react'

/**
 * Pure helper: returns true if scrollY exceeds the threshold.
 * Exported for testing (node environment, no DOM).
 */
export function isPastThreshold(scrollY: number, thresholdPx: number): boolean {
  return scrollY > thresholdPx
}

/**
 * Hook to detect if the user has scrolled past a given pixel threshold.
 * SSR-safe: returns false initially, measures in useEffect with requestAnimationFrame throttle.
 *
 * @param thresholdPx - pixel threshold; true when window.scrollY > threshold
 * @returns boolean state
 */
export function useScrolledPast(thresholdPx: number): boolean {
  const [scrolled, setScrolled] = useState(false)
  const [rafPending, setRafPending] = useState(false)

  useEffect(() => {
    // Initial check on mount (important for page reload mid-scroll)
    setScrolled(isPastThreshold(window.scrollY, thresholdPx))

    const handleScroll = () => {
      if (rafPending) return

      setRafPending(true)
      requestAnimationFrame(() => {
        setScrolled(isPastThreshold(window.scrollY, thresholdPx))
        setRafPending(false)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [thresholdPx, rafPending])

  return scrolled
}
