// GEGENEREERD door scripts/sync-domain.mjs — NIET BEWERKEN.
// Bron: ../factuurt/src/domain/shared/afrond.ts
// Wijzig de bron in factuurt en draai `npm run sync:domain`.

type AfrondingsRegel = 'KWARTIER' | 'HALF_UUR' | 'UUR' | 'MINUUT'
type AfrondingsRichting = 'OMHOOG' | 'OMLAAG' | 'DICHTSTBIJ'

export function berekenGefactureerdeMinuten(
  werkelijkeMinuten: number,
  klant: { afrondingsRegel?: AfrondingsRegel | null; afrondingsRichting?: AfrondingsRichting | null },
): number {
  const eenheid =
    klant.afrondingsRegel === 'KWARTIER' ? 15 :
    klant.afrondingsRegel === 'HALF_UUR' ? 30 :
    klant.afrondingsRegel === 'UUR' ? 60 : 1

  if (eenheid === 1) return werkelijkeMinuten

  if (klant.afrondingsRichting === 'OMHOOG')
    return Math.ceil(werkelijkeMinuten / eenheid) * eenheid
  if (klant.afrondingsRichting === 'OMLAAG')
    return Math.floor(werkelijkeMinuten / eenheid) * eenheid
  return Math.round(werkelijkeMinuten / eenheid) * eenheid
}

export function formatMinuten(minuten: number): string {
  const h = Math.floor(minuten / 60)
  const m = minuten % 60
  if (h > 0 && m > 0) return `${h}u ${m}min`
  if (h > 0) return `${h}u`
  return `${m}min`
}

export function afrondingsLabel(richting: AfrondingsRichting | null | undefined, eenheidMinuten: number): string {
  const e = eenheidMinuten === 15 ? '¼u' : eenheidMinuten === 30 ? '½u' : `${eenheidMinuten}min`
  if (richting === 'OMHOOG') return `${e} omhoog`
  if (richting === 'OMLAAG') return `${e} omlaag`
  return `${e} afgerond`
}
