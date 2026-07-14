// GEGENEREERD door scripts/sync-domain.mjs — NIET BEWERKEN.
// Bron: ../factuurt/src/domain/factuur/btwCalculator.ts
// Wijzig de bron in factuurt en draai `npm run sync:domain`.

/**
 * Shared BTW (VAT) calculation used by the offerte wizard preview,
 * the PDF generator, and the factuur totals.
 *
 * Items with a per-line `btw` rate (e.g. mixed materialen at 6% and
 * labour at 21%) are grouped separately so the totals block can render
 * one BTW line per tarief.
 */

export interface BtwItem {
  aantal: number
  eenheidsprijs: number
  /** VAT rate as a whole percentage, e.g. 21 for 21% */
  btw: number
}

export interface BtwTotalen {
  subtotaal: number
  /** BTW amount per tarief, e.g. Map { 21 → 63.00, 6 → 4.20 } */
  btwPerTarief: Map<number, number>
  btwBedrag: number
  totaal: number
}

export function calcBtwTotalen(items: BtwItem[]): BtwTotalen {
  const subtotaal = items.reduce((s, i) => s + i.aantal * i.eenheidsprijs, 0)
  const btwPerTarief = new Map<number, number>()
  for (const i of items) {
    const bedrag = i.aantal * i.eenheidsprijs * (i.btw / 100)
    btwPerTarief.set(i.btw, (btwPerTarief.get(i.btw) ?? 0) + bedrag)
  }
  const btwBedrag = [...btwPerTarief.values()].reduce((s, b) => s + b, 0)
  return { subtotaal, btwPerTarief, btwBedrag, totaal: subtotaal + btwBedrag }
}
