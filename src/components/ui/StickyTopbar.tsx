'use client'

import { cn } from '@/lib/cn'
import { useScrolledPast } from '@/lib/useScrolledPast'
import { Button } from '@/components/ui/Button'
import { site } from '@/content/site'

/**
 * Pragmatic threshold (px): "after the first viewport / after hero fold".
 * Not pixel-perfect coupled to hero height (which is clamp-based);
 * conservative estimate to show topbar once hero is scrolled out of view.
 */
const HERO_THRESHOLD = 480

/**
 * Sticky topbar: appears after user scrolls past hero.
 * Always visible on desktop; appears/slides-down on scroll on mobile.
 * Contains brand link and primary CTA.
 */
export function StickyTopbar() {
  const scrolled = useScrolledPast(HERO_THRESHOLD)

  return (
    <header
      aria-label={site.nav.ariaLabel}
      className={cn(
        'fixed inset-x-0 top-0 z-40',
        'transition-all duration-300 ease-out motion-reduce:transition-none',
        scrolled
          ? 'translate-y-0 opacity-100 pointer-events-auto bg-surface/90 backdrop-blur border-b border-ink/10 shadow-sm'
          : '-translate-y-full opacity-0 pointer-events-none',
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          aria-label={site.nav.brandHomeLabel}
          className="text-lg font-bold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
        >
          {site.brand.name}
        </a>
        <Button
          variant="primary"
          href={site.cta.primary.href}
          className="px-4 text-sm sm:px-6 sm:text-base"
        >
          {site.cta.primary.label}
        </Button>
      </div>
    </header>
  )
}
