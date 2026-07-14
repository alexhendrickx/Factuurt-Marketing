import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { site } from '@/content/site'

/**
 * Mobile-only fixed bottom CTA bar (< md breakpoint).
 * Displays primary CTA full-width with safe-area padding for notches/home-indicators.
 * Server component (no scroll state needed; always visible on mobile).
 */
export function MobileBottomCta() {
  return (
    <div
      role="region"
      aria-label={site.nav.mobileCtaAriaLabel}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 md:hidden',
        'border-t border-ink/10 bg-surface/95 backdrop-blur',
        'px-4 pt-3',
      )}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <Button variant="primary" href={site.cta.primary.href} className="w-full">
        {site.cta.primary.label}
      </Button>
    </div>
  )
}
