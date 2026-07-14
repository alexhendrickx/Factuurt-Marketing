// GEGENEREERD door scripts/sync-domain.mjs — NIET BEWERKEN.
// Bron: ../factuurt/src/domain/factuur/factuur-berekening.ts
// Wijzig de bron in factuurt en draai `npm run sync:domain`.

export function berekenFactuurTotaal(posts: {
  aantal: { toFixed?: (n: number) => string } | number | string
  eenheidsprijs: { toFixed?: (n: number) => string } | number | string
  btwTarief: number
}[]): { subtotaal: number; btw: number; totaal: number } {
  let subtotaal = 0
  let btw = 0
  for (const post of posts) {
    const netto = Number(post.aantal) * Number(post.eenheidsprijs)
    subtotaal += netto
    btw += netto * (post.btwTarief / 100)
  }
  return { subtotaal, btw, totaal: subtotaal + btw }
}
