import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { LegalPageContent } from '@/content/legal'
import { site } from '@/content/site'

/** Sobere, leesbare render voor een juridische pagina (/privacy, /voorwaarden). */
export function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Terug naar {site.brand.name}
      </Link>

      <h1 className="mt-6 text-display-sm font-bold tracking-tight text-ink">{content.title}</h1>
      <p className="mt-2 text-sm text-ink-muted">Laatst bijgewerkt: {content.updated}</p>

      {content.isDraft && (
        <p
          role="note"
          className="mt-6 rounded-lg border border-warning/30 bg-warning/5 px-4 py-3 text-sm text-ink-muted"
        >
          {content.draftNotice}
        </p>
      )}

      <div className="mt-10 space-y-8">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-3 text-base leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
