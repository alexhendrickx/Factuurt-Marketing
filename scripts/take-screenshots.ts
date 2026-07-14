import { chromium } from '@playwright/test'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'
import { APP_BASE_URL, DEVICE_SCALE_FACTOR, REQUIRES_AUTH, SHOTS, VIEWPORT, validateManifest } from './screenshot-manifest'
import type { Page } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')
const ROOT = resolve(__dirname, '..')

/**
 * Robuuste login-helper: vult inlogformulier in met flexibele selectors.
 * PREMISE #2 uit m1-visuals-pipeline.md: selectors kunnen afwijken.
 */
async function login(page: Page): Promise<void> {
  const user = process.env.SCREENSHOT_USER ?? 'maxime@test.com'
  const pass = process.env.SCREENSHOT_PASS ?? 'maxime2026'

  await page.goto(`${APP_BASE_URL}/login`, { waitUntil: 'networkidle' })

  // Robuust: type-gebaseerd, valt terug op naam/placeholder.
  const email = page.locator('input[type="email"], input[name="email"]').first()
  const pw = page.locator('input[type="password"], input[name="wachtwoord"], input[name="password"]').first()

  await email.fill(user)
  await pw.fill(pass)
  await page.locator('button[type="submit"]').first().click()

  // Wacht tot we van /login weg zijn, of timeout na 15s
  try {
    await page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 15_000 })
  } catch {
    // Login mislukt: return 500 chars van de DOM voor debugging
    const html = await page.content()
    const snippet = html.substring(0, 500)
    throw new Error(
      `Login mislukt op ${APP_BASE_URL}/login. Controleer SCREENSHOT_USER/SCREENSHOT_PASS. ` +
      `DOM-snippet: ${snippet}...`,
    )
  }
}

/**
 * Sluit app-prompts die niet in een marketing-screenshot horen: de
 * "Meldingen inschakelen"-banner en de PWA-installatieprompt. Best-effort —
 * ontbreekt de knop, dan gewoon doorgaan.
 */
async function dismissOverlays(page: Page): Promise<void> {
  for (const name of ['Niet nu', 'Sluiten']) {
    try {
      const btn = page.getByRole('button', { name, exact: true }).first()
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click()
        await page.waitForTimeout(150)
      }
    } catch {
      // knop niet aanwezig op dit scherm → overslaan
    }
  }
}

/**
 * Controleer of de app bereikbaar is voordat we Playwright starten.
 */
async function checkAppReachability(): Promise<void> {
  try {
    const response = await fetch(APP_BASE_URL, { signal: AbortSignal.timeout(5000) })
    if (response.status >= 400) {
      throw new Error(`App antwoordde met ${response.status}`)
    }
  } catch (e) {
    console.error(
      `Kan ../factuurt niet bereiken op ${APP_BASE_URL}. Start eerst 'npm run dev' in ../factuurt ` +
      `en zorg voor de demo-seed (scripts/seed-test-account.ts). ` +
      `Zie .claude/state/plans/m1-visuals-pipeline.md PREMISE.\n` +
      `Fout: ${e instanceof Error ? e.message : String(e)}`,
    )
    process.exit(1)
  }
}

async function main(): Promise<void> {
  // Parse optioneel subset-filter uit argv
  const filter = process.argv.slice(2)
  let shotsToTake = SHOTS
  if (filter.length > 0) {
    const validSlugs = new Set(SHOTS.map((s) => s.slug))
    const invalidSlugs = filter.filter((f) => !validSlugs.has(f))
    if (invalidSlugs.length > 0) {
      console.error(
        `Onbekende slug(s): ${invalidSlugs.join(', ')}. Geldige slugs: ${Array.from(validSlugs).join(', ')}`,
      )
      process.exit(1)
    }
    shotsToTake = SHOTS.filter((s) => filter.includes(s.slug))
  }

  // Valideer manifest
  try {
    validateManifest(shotsToTake)
  } catch (e) {
    console.error(`Manifest-error: ${e instanceof Error ? e.message : String(e)}`)
    process.exit(1)
  }

  // Check app bereikbaarheid vóór browser start
  await checkAppReachability()

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    isMobile: true,
  })
  const page = await context.newPage()

  const screenshotsDir = resolve(ROOT, 'public/screenshots')
  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true })
  }

  let taken = 0
  let failed = 0
  const results: string[] = []

  try {
    // Login eenmalig als required
    if (REQUIRES_AUTH) {
      try {
        await login(page)
        console.log('✓ Ingelogd')
      } catch (e) {
        console.error(`Login-fout: ${e instanceof Error ? e.message : String(e)}`)
        process.exit(1)
      }
    }

    // Screenshot elke shot
    for (const shot of shotsToTake) {
      try {
        const url = APP_BASE_URL + shot.route
        await page.goto(url, { waitUntil: 'networkidle' })

        // Guard: controle dat we niet teruggeland zijn op /login of /register
        const currentPath = page.url()
        if (currentPath.includes('/login') || currentPath.includes('/register')) {
          throw new Error(
            `Na goto(${url}) terecht op ${currentPath} — auth verlopen of seed ontbreekt?`,
          )
        }

        // Wacht op optionele selector
        if (shot.waitForSelector) {
          try {
            await page.waitForSelector(shot.waitForSelector, { timeout: 10_000 })
          } catch {
            console.warn(`Selector "${shot.waitForSelector}" niet gevonden voor ${shot.slug}, doorgaan...`)
          }
        }

        // Sluit prompts (meldingen/PWA) die de screenshot zouden vervuilen
        await dismissOverlays(page)

        // Offline-shot: data is nu online geladen → zet de browser offline zodat
        // de OfflineBar verschijnt en de app "gewoon doorwerkt" toont.
        if (shot.offline) {
          await context.setOffline(true)
          try {
            await page.waitForSelector('text=wijzigingen worden lokaal opgeslagen', {
              timeout: 5_000,
            })
          } catch {
            console.warn(`OfflineBar niet verschenen voor ${shot.slug}, doorgaan...`)
          }
          await page.waitForTimeout(300)
        }

        // Verwijder de Next.js dev-indicator (dev-only, niet in productie).
        // De badge leeft in de shadow-root van <nextjs-portal>; de host uit de
        // light-DOM verwijderen haalt hem betrouwbaar weg (CSS wint niet van de
        // inline !important-stijl van de host).
        await page.evaluate(() => {
          document.querySelectorAll('nextjs-portal').forEach((el) => el.remove())
        })

        // Settle-wait
        await page.waitForTimeout(400)

        // Screenshot
        const publicPath = resolve(screenshotsDir, `${shot.slug}.png`)
        await page.screenshot({
          path: publicPath,
          fullPage: shot.fullPage ?? false,
        })

        // Herstel online voor eventuele volgende shots
        if (shot.offline) {
          await context.setOffline(false)
        }

        results.push(`✓ ${shot.slug} (${shot.route})`)
        taken++
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        results.push(`✗ ${shot.slug} (${shot.route}): ${msg}`)
        failed++
      }
    }
  } finally {
    await browser.close()
  }

  // Rapport
  console.log('\n=== Screenshot-rapport ===')
  results.forEach((r) => console.log(r))
  console.log(`\nSamenvatting: ${taken} geschoten, ${failed} gefaald`)

  if (failed > 0) {
    process.exit(1)
  }
}

main().catch((e) => {
  console.error(`Onverwachte fout: ${e instanceof Error ? e.message : String(e)}`)
  process.exit(1)
})
