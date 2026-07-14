import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface DeviceFrameProps {
  /** De schermafbeelding of live-mockup binnen het frame. */
  children: ReactNode
  /** Toegankelijke omschrijving van wat er in beeld is (a11y, PLAN §9).
   *  Alleen zetten voor puur visuele inhoud (screenshots): role="img" plat
   *  de subtree af. Weglaten voor live-mockups/carrousels met eigen leesbare
   *  of interactieve inhoud. */
  label?: string
  className?: string
}

/**
 * CSS iPhone-frame rond app-screenshots/mockups (PLAN §5A). Behoudt de
 * 390×844-verhouding zodat next/image met expliciete maten past.
 */
export function DeviceFrame({ children, label, className }: DeviceFrameProps) {
  return (
    <div
      {...(label !== undefined ? { role: 'img', 'aria-label': label } : {})}
      className={cn(
        'relative mx-auto w-full max-w-[300px] rounded-[2.5rem]',
        'border-[10px] border-ink bg-ink shadow-xl',
        className,
      )}
    >
      <div className="aspect-[390/844] overflow-hidden rounded-[1.75rem] bg-surface">
        {children}
      </div>
    </div>
  )
}
