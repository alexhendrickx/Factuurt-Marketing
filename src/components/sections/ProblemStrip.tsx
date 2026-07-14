'use client'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { problems } from '@/content/problems'
import { resolveIcon } from '@/lib/iconMap'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

export function ProblemStrip() {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="probleem" variant="alt">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        {problems.heading}
      </h2>

      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {problems.problems.map((problem, i) => {
          const Icon = resolveIcon(problem.icon)
          return (
            <li
              key={problem.title}
              className={cn(
                'flex flex-col items-start',
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
            >
              <Icon aria-hidden className="h-8 w-8 text-primary" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {problem.title}
              </h3>
              <p className="mt-2 text-ink-muted">{problem.detail}</p>
            </li>
          )
        })}
      </ul>
    </SectionShell>
  )
}
