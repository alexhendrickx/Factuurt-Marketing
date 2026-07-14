'use client'
import type { JSX } from 'react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import type { HeroSlide } from '@/content/hero'
import { screenshotPath } from '../../../scripts/screenshot-manifest'

interface ScreenshotCarouselProps {
  /** Minimaal 1 slide; volgorde = toonvolgorde. */
  slides: HeroSlide[]
  /** Toegankelijk groepslabel voor de dot-navigatie. */
  navLabel: string
  /** Ms per slide vóór auto-advance. */
  intervalMs?: number
}

/**
 * Auto-doorlopende screenshot-carrousel binnen een DeviceFrame (crossfade).
 * Speelt alleen als hij in beeld is, pauzeert bij hover en na een handmatige
 * keuze, en staat stil bij prefers-reduced-motion (dots blijven werken).
 */
export function ScreenshotCarousel({
  slides,
  navLabel,
  intervalMs = 3500,
}: ScreenshotCarouselProps): JSX.Element {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: 0.4 })
  const prefersReducedMotion = useReducedMotion()

  // Mount gate: SSR rendert met motion, client schakelt om bij reduced-motion
  useEffect(() => {
    setMounted(true)
  }, [])
  const reduceMotion = mounted && prefersReducedMotion

  useEffect(() => {
    if (!isInView || isPaused || reduceMotion || slides.length < 2) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [isInView, isPaused, reduceMotion, slides.length, intervalMs])

  const handleDotClick = (i: number) => {
    setIndex(i)
    setIsPaused(true)
  }

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.slug}
          src={screenshotPath(slide.slug)}
          alt={slide.alt}
          aria-hidden={i !== index}
          width={390}
          height={844}
          sizes="(min-width: 1024px) 300px, 80vw"
          priority={i === 0}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            'transition-opacity duration-700 ease-out motion-reduce:transition-none',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {slides.length > 1 && (
        <div
          role="group"
          aria-label={navLabel}
          className="absolute inset-x-0 bottom-14 flex justify-center"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              aria-label={slide.alt}
              aria-current={i === index}
              onClick={() => handleDotClick(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                aria-hidden
                className={cn(
                  'h-2 w-2 rounded-full transition-colors motion-reduce:transition-none',
                  i === index
                    ? 'bg-primary'
                    : 'bg-surface shadow ring-1 ring-ink/25',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
