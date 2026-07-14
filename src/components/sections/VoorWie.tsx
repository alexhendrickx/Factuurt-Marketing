'use client'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { voorWie } from '@/content/voorWie'
import { resolveIcon } from '@/lib/iconMap'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

export function VoorWie() {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="voor-wie" variant="alt">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        {voorWie.heading}
      </h2>

      {voorWie.intro.trim().length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-center text-lg text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          {voorWie.intro}
        </p>
      )}

      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {voorWie.audiences.map((audience, i) => {
          const Icon = resolveIcon(audience.icon)
          return (
            <li
              key={audience.title}
              className={cn(
                'flex flex-col items-start',
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
            >
              <Icon aria-hidden className="h-8 w-8 text-primary" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{audience.title}</h3>
              <p className="mt-2 text-ink-muted">{audience.detail}</p>
            </li>
          )
        })}
      </ul>

      {voorWie.footnote.trim().length > 0 && (
        <p
          className={cn(
            'mt-10 text-center text-sm text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100' : 'opacity-0',
          )}
        >
          {voorWie.footnote}
        </p>
      )}
    </SectionShell>
  )
}
