'use client'
import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { contactSchema } from '@/lib/contactSchema'
import { contact } from '@/content/contact'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/** Optioneel zichtbaar mailadres (spam-bewust: standaard verborgen). */
const directEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''

const fieldBase = cn(
  'w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-base text-ink',
  'placeholder:text-ink-muted/60',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
)

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0])
        if (!next[key]) next[key] = issue.message
      }
      setErrors(next)
      return
    }

    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionShell id="contact" variant="alt">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-display-sm font-bold tracking-tight text-ink">{contact.heading}</h2>
        {contact.intro.trim().length > 0 && (
          <p className="mt-4 text-lg text-ink-muted">{contact.intro}</p>
        )}

        {status === 'success' ? (
          <div
            role="status"
            className="mt-8 flex items-start gap-3 rounded-xl border border-success/30 bg-success/5 p-6"
          >
            <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-success" />
            <div>
              <p className="font-semibold text-ink">{contact.successTitle}</p>
              <p className="mt-1 text-ink-muted">{contact.successBody}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="contact-naam" className="block text-sm font-medium text-ink">
                {contact.fields.naam.label}
              </label>
              <input
                id="contact-naam"
                name="naam"
                type="text"
                autoComplete="name"
                placeholder={contact.fields.naam.placeholder}
                aria-invalid={Boolean(errors.naam)}
                className={cn(fieldBase, 'mt-1.5', errors.naam && 'border-error focus-visible:ring-error')}
              />
              {errors.naam && <p className="mt-1 text-sm text-error">{errors.naam}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
                {contact.fields.email.label}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={contact.fields.email.placeholder}
                aria-invalid={Boolean(errors.email)}
                className={cn(fieldBase, 'mt-1.5', errors.email && 'border-error focus-visible:ring-error')}
              />
              {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-bericht" className="block text-sm font-medium text-ink">
                {contact.fields.bericht.label}
              </label>
              <textarea
                id="contact-bericht"
                name="bericht"
                rows={5}
                placeholder={contact.fields.bericht.placeholder}
                aria-invalid={Boolean(errors.bericht)}
                className={cn(fieldBase, 'mt-1.5 resize-y', errors.bericht && 'border-error focus-visible:ring-error')}
              />
              {errors.bericht && <p className="mt-1 text-sm text-error">{errors.bericht}</p>}
            </div>

            {/* Honeypot — visueel & voor screenreaders verborgen, niet 'display:none'
                zodat sommige bots het toch invullen. */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
              <label htmlFor="contact-website">Laat dit veld leeg</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'error' && (
              <p role="alert" className="text-sm text-error">
                {contact.errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={cn(
                'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-surface',
                'transition-colors hover:bg-primary-hover disabled:opacity-60',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              )}
            >
              {status === 'submitting' ? contact.submittingLabel : contact.submitLabel}
            </button>

            {directEmail && (
              <p className="text-sm text-ink-muted">
                {contact.directLabel}{' '}
                <a
                  href={`mailto:${directEmail}`}
                  className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary-hover"
                >
                  <Mail aria-hidden className="size-4" />
                  {directEmail}
                </a>
              </p>
            )}
          </form>
        )}
      </div>
    </SectionShell>
  )
}
