import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { shouldOpenExternal } from '@/lib/isExternalHref'

type ButtonVariant = 'primary' | 'secondary' | 'inverse'

interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: ButtonVariant
  href: string
}

export function Button({ variant = 'primary', className, children, href, ...rest }: ButtonProps) {
  const isExternal = shouldOpenExternal(href)

  return (
    <a
      href={href}
      className={cn(
        // basis: touch target >= 44px, focus-zichtbaar, centrering
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        variant === 'primary' && 'bg-primary text-surface hover:bg-primary-hover',
        variant === 'secondary' && 'bg-surface text-ink ring-1 ring-inset ring-ink/15 hover:bg-surface-alt',
        variant === 'inverse' && 'bg-surface text-cta-block hover:bg-cta-block-ink',
        className,
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
