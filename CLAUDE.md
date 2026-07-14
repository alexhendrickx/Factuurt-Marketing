# Factuurt Marketing — projectinstructies voor Claude

## Wat is dit project

De **marketing-one-pager** voor Factuurt (de mobile-first PWA voor zelfstandige
elektriciens in België die in [`../factuurt`](../factuurt) leeft). Dit project
verkóópt de app; het ís de app niet. Wat we bouwen staat volledig gespecificeerd
in [`PLAN.md`](PLAN.md) — lees dat eerst bij elke feature.

## Relatie met `../factuurt` (belangrijk)

- `../factuurt` is **strikt read-only** vanuit dit project. Nooit bestanden
  daar schrijven, nooit npm-scripts draaien die daar iets muteren (uitzondering:
  `npm run dev` starten voor de screenshot-pipeline mag).
- **Domeincode wordt gesynct, niet geïmporteerd:** `scripts/sync-domain.mjs`
  kopieert een whitelist van pure modules uit `../factuurt/src/domain/` naar
  `src/domain/`. Bestanden daar dragen een "gegenereerd"-header — nooit
  handmatig bewerken; wijzig de bron in factuurt of pas de whitelist aan.
- **Screenshots worden gegenereerd, niet geknipt:** `scripts/take-screenshots.ts`
  (Playwright) schiet de routes uit `scripts/screenshot-manifest.ts` tegen de
  lokaal draaiende app en schrijft naar `public/screenshots/`. Verouderde
  screenshots? Pipeline opnieuw draaien, nooit handmatig pixelen.
- Domeinkennis: `../factuurt/docs/DOMAIN-elektricien-workflow.md` en
  `../factuurt/docs/APP-INVENTORY.md`. UI-patterns: `../factuurt/docs/REUSABILITY-AUDIT.md`.

## Stack

- **Next.js 16** (App Router), React 19, TypeScript strict — zelfde als de app
- **Tailwind CSS 4** — tokens in `src/styles/tokens.css` (overgenomen uit de app
  + marketing-uitbreidingen), géén hardcoded kleuren
- **Framer Motion** voor de workflow-walkthrough; CSS voor micro-interacties
- **lucide-react** voor iconen — nooit emoji's als UI-icoon
- **Zod** voor formuliervalidatie, **Resend** voor contactmail
- **Tests:** Vitest (unit, `__tests__/` naast de code) + Playwright (screenshots-pipeline én smoke-test)

## Commando's

| Doel | Commando |
|------|----------|
| Dev server | `npm run dev` |
| Typecheck (altijd vóór afronden) | `npm run type-check` |
| Lint | `npm run lint` |
| Unit tests | `npm test` |
| Productie-build (onderdeel van de gate) | `npm run build` |
| Domeincode syncen uit factuurt | `npm run sync:domain` |
| Screenshots regenereren | `npm run screenshots` (vereist draaiende app in `../factuurt`) |
| Smoke e2e | `npm run e2e:ci` |

## Architectuur (waar hoort wat)

- `src/app/` — de one-pager (`page.tsx`) + `api/contact` route handler
- `src/components/sections/` — één component per sectie uit PLAN.md §4 (Hero, WorkflowSpine, DemoOfferte, FeatureGrid, …)
- `src/components/ui/` — herbruikbare primitives (Button, DeviceFrame, Accordion, SectionShell); **eerst hier kijken vóór je iets nieuws bouwt**
- `src/components/mockups/` — app-getrouwe kaart-mockups voor de walkthrough (volgen de echte app-patterns)
- `src/domain/` — gesynct uit factuurt, framework-vrij; **niet bewerken**
- `src/content/` — **alle copy als getypeerde TS-objecten**; componenten bevatten geen letterlijke marketingteksten
- `scripts/` — sync-domain, screenshot-manifest, take-screenshots

## Werkregels

1. **Copy hoort in `src/content/`** — een component met hardcoded marketingtekst is een bug.
2. **Mobile-first** — ontwerp op 375 px, touch targets ≥ 44 px, geen horizontale scroll; daarna pas 768/1440.
3. **Nederlands (Vlaams, "je"-vorm)** in alle zichtbare tekst; domeintermen exact zoals de app: offerte, werkbon, factuur, klant. Engels mag in identifiers.
4. **Animatie is functioneel** — reveal/walkthrough oké, decoratie-circus niet; respecteer `prefers-reduced-motion`.
5. **DRY & zero dead code** — hergebruik `ui/`-primitives; wat obsolete wordt, verwijder je in dezelfde change.
6. **Commits:** `AH - <korte beschrijving>` (alleen committen als ik erom vraag).
7. **Definition of done:** `type-check` + `lint` + `npm test` + `npm run build` groen, visueel gecheckt op 375/768/1440, en de vier senior-vragen: secure, efficiënt, breekt niets, getest?

### Nooit doen

- Nooit schrijven in `../factuurt` (zie hierboven).
- Geen nieuwe dependencies zonder melden en motiveren (Framer Motion is de enige vooraf goedgekeurde).
- Geen copy hardcoden in componenten; geen kleuren buiten de tokens.
- Geen bestanden in `src/domain/` of `public/screenshots/` handmatig bewerken — dat zijn pipeline-outputs.
- Geen tracking/analytics toevoegen zonder expliciete opdracht.

---

## Agent-pipeline

De volledige pipeline-beschrijving (rollen, commands, orkestratie- en
tokenregels) staat in [`.claude/PIPELINE.md`](.claude/PIPELINE.md) — alleen de
orchestrator (`/build-loop`) leest die; individuele agents kennen hun rol uit
hun eigen definitie. Dit bestand blijft bewust slank: alles hier is vaste
contextkost voor élke subagent-spawn.

Snelgids: `/build-loop <sectie>` om te bouwen, `/copy <sectie>` voor alleen
tekst, `/screenshots` voor verse app-beelden, gewone vraag voor one-liners.
De groen-gate is een script, geen agent: `bash scripts/gate.sh`
(type-check + lint + tests + regressie-diff + build, compact rapport).

### Sectie-status (bijwerken na elke afgeronde fase)

| Fase (PLAN.md §11) | Status |
|---|---|
| M0 — Fundament | ✅ klaar (2026-07-13) |
| M1 — Visuals-pipeline | ✅ klaar (2026-07-13) |
| M2 — Statische secties | ✅ klaar (2026-07-14) |
| M3 — Interactie | ✅ klaar (2026-07-14) |
| M4 — Conversie & afwerking | ✅ klaar (2026-07-14) |
| M5 — Deploy | ⬜ te doen |
