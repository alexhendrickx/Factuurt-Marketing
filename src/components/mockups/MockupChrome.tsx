import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface MockupChromeProps {
  klantNaam: string
  projectNaam: string
  statusLabel: string
  statusTone: 'neutral' | 'success'
  children: ReactNode
  className?: string
}

export function MockupChrome({
  klantNaam,
  projectNaam,
  statusLabel,
  statusTone,
  children,
  className,
}: MockupChromeProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg ring-1 ring-ink/10 shadow-md overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-ink/5 bg-surface-alt">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ink truncate">{klantNaam}</div>
          <div className="text-sm text-ink-muted truncate">{projectNaam}</div>
        </div>

        {/* Status chip */}
        <div
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
            statusTone === 'success'
              ? 'bg-success/10 text-success'
              : 'bg-surface text-ink-muted'
          )}
        >
          {statusLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
