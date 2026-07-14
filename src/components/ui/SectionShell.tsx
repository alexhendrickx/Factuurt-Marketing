import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionShellProps {
  /** Anker-id voor in-page navigatie (bv. "hero", "faq"). */
  id: string
  /** Achtergrondritme: wit, gray-50 of donkerblauw contrastblok.
   *  - 'white': bg-surface
   *  - 'alt': bg-surface-alt (grijs)
   *  - 'cta': donkerblauw contrastblok (slot-CTA, PLAN §8)
   */
  variant?: 'white' | 'alt' | 'cta'
  className?: string
  children: ReactNode
}

export function SectionShell({
  id,
  variant = 'white',
  className,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-section',
        variant === 'white' && 'bg-surface',
        variant === 'alt' && 'bg-surface-alt',
        variant === 'cta' && 'bg-cta-block text-surface',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
