import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contactSchema'

/** Nooit statisch pre-renderen — dit is een verzend-endpoint. */
export const dynamic = 'force-dynamic'

const TO = process.env.CONTACT_TO_EMAIL
/** Afzender: verified domein zodra beschikbaar; anders Resend's test-afzender. */
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Factuurt <onboarding@resend.dev>'

export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation' }, { status: 422 })
  }

  const { naam, email, bericht, website } = parsed.data

  // Honeypot gevuld → hoogstwaarschijnlijk een bot. Doe alsof het lukte, maar
  // verstuur niets (geen signaal terug naar de bot).
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Zonder configuratie kunnen we niet mailen. Faal netjes i.p.v. te crashen,
  // zodat dev/build zonder secrets blijven werken.
  if (!process.env.RESEND_API_KEY || !TO) {
    console.warn(
      '[api/contact] RESEND_API_KEY of CONTACT_TO_EMAIL ontbreekt — bericht niet verstuurd.',
    )
    return NextResponse.json({ error: 'not-configured' }, { status: 503 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Contactformulier factuurt-site — ${naam}`,
      text: `Naam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`,
    })

    if (error) {
      console.error('[api/contact] Resend-fout:', error)
      return NextResponse.json({ error: 'send-failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('[api/contact] onverwachte fout:', err)
    return NextResponse.json({ error: 'send-failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
