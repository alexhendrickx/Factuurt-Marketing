'use client'
import { useEffect, useState } from 'react'

/** True zodra gemount (client), zodat een CSS-transition van 'verborgen' naar
 * 'zichtbaar' triggert. Puur functioneel: reveal-on-load, geen scroll-observer. */
export function useRevealOnMount(): boolean {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    setRevealed(true)
  }, [])
  return revealed
}
