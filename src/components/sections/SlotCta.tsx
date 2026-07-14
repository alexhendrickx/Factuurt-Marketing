'use client'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { Button } from '@/components/ui/Button'
import { slotCta } from '@/content/slotCta'
import { site } from '@/content/site'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

export function SlotCta() {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="slot-cta" variant="cta">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={cn(
            'text-display-sm font-bold tracking-tight text-surface',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          {slotCta.heading}
        </h2>

        {slotCta.subline.trim().length > 0 && (
          <p
            className={cn(
              'mt-4 text-lg text-cta-block-ink',
              'transition-all duration-700 ease-out motion-reduce:transition-none',
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            {slotCta.subline}
          </p>
        )}

        <div
          className={cn(
            'mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          <Button variant="inverse" href={site.cta.primary.href}>
            {site.cta.primary.label}
          </Button>

          {slotCta.secondaryLabel.trim().length > 0 && (
            <a
              href="#contact"
              className={cn(
                'inline-flex min-h-[44px] items-center text-surface underline underline-offset-4',
                'transition-colors hover:text-cta-block-ink',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-cta-block',
              )}
            >
              {slotCta.secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
