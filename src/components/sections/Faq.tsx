'use client'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { Accordion } from '@/components/ui/Accordion'
import { faq } from '@/content/faq'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

export function Faq() {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="faq" variant="white">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        {faq.heading}
      </h2>

      {faq.intro.trim().length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-center text-lg text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          {faq.intro}
        </p>
      )}

      <div
        className={cn(
          'mx-auto mt-10 max-w-2xl',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        <Accordion baseId="faq" items={faq.entries} />
      </div>
    </SectionShell>
  )
}
