// De vaste lijst app-schermen die de marketingsite als echte screenshots toont.
// Bron van waarheid voor scripts/take-screenshots.ts én voor de componenten die
// naar public/screenshots/<slug>.png verwijzen. Uitbreiden = hier één shot toevoegen.

/** iPhone-viewport uit PLAN §5A. Eén vaste maat in M1. */
export const VIEWPORT = { width: 390, height: 844 } as const

/** device scale factor: 2 → retina-scherpe PNG's voor next/image. */
export const DEVICE_SCALE_FACTOR = 2

/** Poort waarop de factuurt-app lokaal draait (CLAUDE.md: dev op 3000). */
export const APP_PORT = 3000
export const APP_BASE_URL = `http://localhost:${APP_PORT}`

/** Routes zijn auth-protected → de pipeline logt eerst in. */
export const REQUIRES_AUTH = true

export interface Shot {
  /** Bestandsnaam-stam → public/screenshots/<slug>.png. kebab-case, uniek. */
  slug: string
  /** App-route (pad na baseURL), bv. '/dashboard'. */
  route: string
  /** Waar dit shot in de site landt — documentatie, PLAN §4-sectie. */
  usedIn: string
  /**
   * Optioneel: wacht tot deze selector zichtbaar is vóór de schotmoment,
   * i.p.v. alleen networkidle (dekt lazy/React-Query-content af).
   */
  waitForSelector?: string
  /** Optioneel: volledige-pagina i.p.v. viewport-crop (default: viewport). */
  fullPage?: boolean
}

/**
 * De schermen uit PLAN §4/§5A. Routes geverifieerd tegen
 * ../factuurt/docs/APP-INVENTORY.md §4. Alle onder auth `(app)`.
 */
export const SHOTS: readonly Shot[] = [
  { slug: 'dashboard', route: '/dashboard', usedIn: 'Hero (§4.1)' },
  { slug: 'agenda', route: '/agenda', usedIn: 'Feature-grid: agenda (§4.5)' },
  { slug: 'werkbon', route: '/werkbonnen', usedIn: 'Feature-grid: timer/foto/handtekening (§4.5)' },
  { slug: 'facturen', route: '/facturen', usedIn: 'Feature-grid: PDF-export (§4.5)' },
  { slug: 'bibliotheek', route: '/instellingen/bibliotheek', usedIn: 'Feature-grid: prijsbibliotheek (§4.5)' },
  { slug: 'offline', route: '/offline', usedIn: 'Offline-sectie (§4.6)' },
] as const

/** Publiek pad van een shot binnen de site. */
export function screenshotPath(slug: string): string {
  return `/screenshots/${slug}.png`
}

/** Guard tegen dubbele slugs / ongeldige routes — gebruikt door de test én het script. */
export function validateManifest(shots: readonly Shot[] = SHOTS): void {
  const slugs = new Set<string>()
  for (const s of shots) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.slug)) {
      throw new Error(`Ongeldige slug (geen kebab-case): "${s.slug}"`)
    }
    if (slugs.has(s.slug)) throw new Error(`Dubbele slug in manifest: "${s.slug}"`)
    slugs.add(s.slug)
    if (!s.route.startsWith('/')) throw new Error(`Route moet met / beginnen: "${s.route}"`)
  }
}
