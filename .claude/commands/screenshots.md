---
description: Regenereer de app-screenshots — start de factuurt-app lokaal, draai de Playwright-pipeline uit scripts/take-screenshots.ts en rapporteer welke bestanden in public/screenshots/ vernieuwd zijn.
argument-hint: (optioneel) subset, bv. "alleen dashboard en agenda"
allowed-tools: Bash, Read, Grep, Glob
---

Regenereer de echte app-screenshots voor de marketingsite.

$ARGUMENTS

## Stappen

1. **Check of de app al draait:** `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
   (poort verifiëren in `../factuurt/package.json`). Zo niet: start
   `npm run dev` in `../factuurt` op de achtergrond en wacht tot hij antwoordt.
   **Draai nooit iets anders dan `dev` in de factuurt-repo** — geen db-scripts,
   geen builds, niets dat muteert.
2. **Demo-data:** de pipeline verwacht het demo-account/seed zoals beschreven in
   `scripts/screenshot-manifest.ts` (login-gegevens via `.env.local`,
   `SCREENSHOT_USER` / `SCREENSHOT_PASS`). Ontbreekt de seed → stop en meld wat
   er nodig is; ga nooit zelf data aanmaken in de app-database.
3. **Pipeline:** `npm run screenshots` (of `npx tsx scripts/take-screenshots.ts`,
   met subset-filter als de gebruiker die meegaf). Viewport 390×844.
4. **Verifieer:** vergelijk mtime/bestandslijst in `public/screenshots/` met het
   manifest — elke verwachte PNG moet vers zijn. Open 2–3 screenshots (Read) als
   steekproef: geen loginscherm, geen lege states, geen foutmeldingen in beeld.
5. **Opruimen:** stop de dev server alleen als jij hem startte.
6. Rapporteer compact: vernieuwd / overgeslagen / gefaald, met reden.
