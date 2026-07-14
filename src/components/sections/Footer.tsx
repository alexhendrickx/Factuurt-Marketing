import { site } from '@/content/site'
import { footer } from '@/content/footer'
import { shouldOpenExternal } from '@/lib/isExternalHref'
import { renderCopyright } from '@/lib/copyrightYear'
import { cn } from '@/lib/cn'

export function Footer() {
  const validLinks = footer.links.filter((link) => link.href.trim().length > 0)

  return (
    <footer className="bg-surface-alt border-t border-ink/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand + tagline */}
          <div>
            <h3 className="text-lg font-bold text-ink">{site.brand.name}</h3>
            {footer.tagline.trim().length > 0 && (
              <p className="mt-2 text-sm text-ink-muted">{footer.tagline}</p>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <ul className="space-y-3">
              {validLinks.map((link) => {
                const isExternal = shouldOpenExternal(link.href)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'inline-flex min-h-[44px] items-center text-ink-muted hover:text-ink',
                        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                      )}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-ink/10 pt-8">
          <p className="text-sm text-ink-muted">
            {renderCopyright(footer.copyrightTemplate)}
          </p>
        </div>
      </div>
    </footer>
  )
}
