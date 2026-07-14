// GEGENEREERD door scripts/sync-domain.mjs — NIET BEWERKEN.
// Bron: ../factuurt/src/domain/shared/format.ts
// Wijzig de bron in factuurt en draai `npm run sync:domain`.

const DATE_LONG = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
const DATE_SHORT = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
const DATE_DAY = new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })
const TIME_FMT = new Intl.DateTimeFormat('nl-NL', { hour: '2-digit', minute: '2-digit' })

export function fmtDatum(iso: string | Date): string {
  return DATE_LONG.format(new Date(iso))
}

export function fmtDatumShort(iso: string | Date): string {
  return DATE_SHORT.format(new Date(iso))
}

export function fmtDag(iso: string | Date): string {
  return DATE_DAY.format(new Date(iso))
}

export function fmtTijd(iso: string | Date): string {
  return TIME_FMT.format(new Date(iso))
}

/** Returns a YYYY-MM-DD string in local time (no UTC shift). */
export function fmtDateISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
