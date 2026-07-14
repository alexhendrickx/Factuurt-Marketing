const EUR = new Intl.NumberFormat('nl-BE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Formatteert een bedrag in euro's in Belgische notatie: € 1.234,56.
 *  Marketing-lokaal (src/domain/ heeft geen euro-formatter — zie plan-PREMISE). */
export function formatEur(bedrag: number): string {
  return EUR.format(bedrag)
}
