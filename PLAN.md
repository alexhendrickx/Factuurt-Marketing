# Factuurt Marketing Website — Projectplan

> **Status:** goedgekeurd concept · **Laatst bijgewerkt:** 2026-07-13
> **Bron-app:** [`../factuurt`](../factuurt) — mobile-first PWA voor zelfstandige elektriciens in België
> **Dit document** is de bron van waarheid voor *wat* we bouwen. De agent-structuur die het bouwt staat in [`CLAUDE.md`](CLAUDE.md).

---

## 1. Samenvatting

Een professionele **one-pager marketingwebsite** die Factuurt verkoopt aan zelfstandige elektriciens in België. De site combineert **echte app-screenshots** (automatisch gegenereerd via Playwright tegen de draaiende app) met **live, interactieve demo's die de échte domeincode van de app hergebruiken** — zodat een bezoeker binnen 30 seconden zelf voelt: *"dit is inderdaad zó eenvoudig."*

| Kernbeslissing | Keuze |
|---|---|
| Stack | Next.js 16 (App Router) + Tailwind CSS 4 — zelfde stack als de app |
| Design | Clean SaaS, licht, factuurt-blauw `#2563eb`, Inter — voelt als één geheel met de app |
| Visuals | Combinatie: echte screenshots in device-frames **én** interactieve componenten op echte domeincode |
| Primaire CTA's | **"Start gratis"** → registratie in de app · **"Contact"** → contactformulier |
| Later (bewust uitgesteld) | Early-access/wachtlijst, pricing-pagina, blog, testimonials met echte klanten |
| Locatie | Deze folder (`factuurt-marketing/`), sibling van `factuurt/` |

---

## 2. Doel & succescriteria

**Doel:** één pagina die een elektricien die 's avonds aan de keukentafel offertes zit te typen, overtuigt om Factuurt te proberen.

**Succescriteria (meetbaar):**

1. Bezoeker begrijpt binnen 5 seconden (hero) wat Factuurt doet en voor wie.
2. De workflow **offerte → werkbon → factuur** is visueel uitgelegd zonder dat er tekst gelezen hoeft te worden.
3. Er is minstens één interactief element dat de bezoeker zelf kan bedienen (mini-offerte-demo) en dat rekent met de echte BTW/afrondingslogica van de app.
4. Contact opnemen én registreren kan elk vanaf elke sectie binnen één klik/scroll.
5. Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
6. Vlekkeloos op 375 px (mobile-first, net als de app) tot en met 1440 px desktop.

---

## 3. Doelgroep & kernboodschap

### Persona: de zelfstandige elektricien

- Werkt overdag op de werf, doet administratie 's avonds en in het weekend.
- Maakt offertes in Word/Excel of op papier; verliest opdrachten door te trage opvolging.
- Vergeet uren en materiaal te noteren → factureert te weinig.
- Werkt vaak op plekken zonder bereik (kelders, nieuwbouw zonder netwerk).
- Is géén software-liefhebber: elke extra klik is een reden om af te haken.

### Pijnpunten → beloftes (de rode draad van de copy)

| Pijnpunt | Belofte van Factuurt |
|---|---|
| "Offertes maken kost me mijn avonden" | Offerte op je telefoon, op de werf, in minuten — met je eigen prijsbibliotheek |
| "Ik vergeet uren en materiaal door te rekenen" | Timer, werkbon en foto's registreren alles ter plekke; nacalculatie toont je marge |
| "Klanten betalen te laat" | Factuur mét betaallink en automatische herinneringen, rechtstreeks vanuit de werkbon |
| "Op de werf heb ik geen bereik" | Werkt volledig offline; synct vanzelf zodra je weer netwerk hebt |
| "Papieren werkbonnen raken kwijt" | Digitale werkbon met handtekening van de klant, altijd terug te vinden |

### Tone of voice

Nederlands (Vlaams, informeel-professioneel, "je"-vorm). Kort en concreet, geen buzzwords. Domeintermen blijven zoals in de app: *offerte, werkbon, factuur, klant, werf*. De vakman staat centraal, niet de software.

---

## 4. Site-architectuur (one-pager, van boven naar onder)

| # | Sectie | Doel | Visual |
|---|--------|------|--------|
| 1 | **Hero** | In 5 sec. duidelijk: "Van offerte tot betaalde factuur, vanop de werf." Sub-line + CTA's *Start gratis* / *Bekijk hoe het werkt* (scroll) | Echte app-screenshot (dashboard) in iPhone-frame, licht zwevend/geanimeerd |
| 2 | **Sociale/probleem-strook** | Herkenning: de drie pijnpunten in één regel elk | Iconen (lucide), geen foto's |
| 3 | **De workflow-spine** | Het hart van de site: offerte → werkbon → factuur als geanimeerde, stapsgewijze walkthrough | Interactieve HTML-mockup die de echte kaart-patterns van de app nabouwt; stap voor stap doorklikbaar of auto-play bij scroll |
| 4 | **Interactieve demo** | "Probeer het zelf": mini-offerte samenstellen (2–3 regels kiezen uit een demo-prijsbibliotheek) met live BTW- en totaalberekening — **op de echte domeincode** | Live React-component; toont daarna "en dit wordt met één tik een werkbon" |
| 5 | **Feature-grid** | Zes ondersteunende features, elk één zin | 6 kaarten met echte screenshots: agenda, timer, foto's, handtekening, PDF-export, prijsbibliotheek |
| 6 | **Offline-sectie** | Onderscheider: "Werkt ook drie verdiepingen onder de grond." | Screenshot + subtiele offline/sync-animatie |
| 7 | **Voor wie** | Expliciet: zelfstandige elektriciens (en kleine teams) in België; BTW-conform | Kort, tekstueel, met team-screenshot |
| 8 | **FAQ** | Bezwaren wegnemen: prijs?, mijn data?, moet ik alles opnieuw invoeren?, werkt het op iPhone én Android? | Accordion |
| 9 | **Slot-CTA** | Laatste conversiemoment: groot *Start gratis* + *Of stel je vraag* | Blauw contrastblok |
| 10 | **Contact + footer** | Contactformulier (naam, e-mail, bericht), e-mailadres, juridische links (algemene voorwaarden, privacy) | Formulier + sitemap-links |

**Sticky elementen:** slanke topbar (logo + *Start gratis*) die na de hero verschijnt; op mobiel een subtiele bottom-CTA.

---

## 5. Visuals-strategie

### A. Echte screenshots (geautomatiseerde pipeline)

- De factuurt-app draait lokaal (`../factuurt`, `npm run dev`) met een **demo-seed**: fictieve maar realistische data (klant "Elektro Peeters", project "Renovatie zekeringkast", gevulde agenda, factuur met betaallink).
- Playwright bezoekt een vaste lijst routes op 390×844 (iPhone-viewport) en schrijft PNG's naar `public/screenshots/`.
- De lijst met te schieten schermen staat in `scripts/screenshot-manifest.ts`; regenereren = één commando. Screenshots verouderen dus nooit: app geüpdatet → pipeline opnieuw draaien.
- Screenshots worden op de site getoond in een CSS-device-frame (geen zware mockup-images).

### B. Live componenten op echte domeincode

- `../factuurt/src/domain/` is framework-vrij en unit-getest — precies daarom herbruikbaar.
- Een sync-script (`scripts/sync-domain.mjs`) kopieert een **whitelist** van pure modules (BTW-berekening, afronding, formatting) naar `src/domain/` in dit project, met een header "gegenereerd — niet bewerken".
- De interactieve demo (sectie 4) en de workflow-walkthrough (sectie 3) rekenen en formatteren dus exact zoals de echte app. Geen fake cijfers.

### C. Design-continuïteit

- Design tokens (`--color-primary: #2563eb`, radius, Inter) worden overgenomen uit `../factuurt/src/styles/tokens.css` en uitgebreid met marketing-tokens (grotere display-typografie, sectie-spacing, subtiele gradients).
- Kaart- en lijst-patterns in de mockups volgen de echte app-patterns (zie `../factuurt/docs/REUSABILITY-AUDIT.md`), zodat screenshot en mockup naadloos op elkaar aansluiten.

---

## 6. Interactieve demo — specificatie (sectie 4)

**Flow (max. 3 stappen, geen registratie, geen backend):**

1. Bezoeker kiest 2–3 regels uit een mini-prijsbibliotheek (bv. *Stopcontact plaatsen*, *Kabel trekken per m*, *Uurloon*).
2. Totalen verschijnen live: subtotaal, BTW (21% / 6%-toggle voor renovatie), totaal — berekend door de gesynchroniseerde domeincode.
3. Knop **"Maak er een werkbon van"** → de offerte 'flipt' visueel naar een werkbon-kaart met dezelfde regels + checklist. Afsluiter: *"Zo werkt heel Factuurt. Start gratis →"*.

**Bewust niet:** PDF genereren, data opslaan, meer dan 3 stappen. De demo moet de eenvoud bewijzen, niet de volledigheid.

---

## 7. Tech stack & repostructuur

| Laag | Keuze | Waarom |
|---|---|---|
| Framework | Next.js 16, App Router, **statische export waar mogelijk** | Zelfde stack als de app; gratis Vercel-hosting; ISR/route handlers voor het contactformulier |
| Styling | Tailwind CSS 4 + tokens | Continuïteit met de app; geen hardcoded kleuren |
| Animatie | Framer Motion (enige nieuwe dependency; gemotiveerd: scroll-driven walkthrough) + CSS voor micro-interacties | |
| Iconen | lucide-react | Zelfde als de app, nooit emoji's |
| Contactformulier | Route handler + Resend (zelfde e-mailinfra als de app) | Eén mailprovider in het ecosysteem |
| Screenshots | Playwright (dev-dependency) | Zelfde e2e-tooling als de app |
| Tests | Vitest voor `src/domain/`-gebruik en formulier-validatie; Playwright-smoke voor de pagina | |
| Analytics | Uitgesteld (later Plausible/Vercel Analytics — privacyvriendelijk) | |

```
factuurt-marketing/
├── PLAN.md                  ← dit document
├── CLAUDE.md                ← projectinstructies + agent-structuur
├── src/
│   ├── app/                 ← one-pager (page.tsx) + api/contact
│   ├── components/
│   │   ├── sections/        ← Hero, WorkflowSpine, DemoOfferte, FeatureGrid, …
│   │   ├── ui/              ← knoppen, device-frame, accordion, sectie-shell
│   │   └── mockups/         ← app-getrouwe kaart-mockups voor de walkthrough
│   ├── domain/              ← GESYNCT uit ../factuurt (niet handmatig bewerken)
│   ├── content/             ← alle copy als getypeerde TS-objecten (copywriter-domein)
│   └── styles/tokens.css    ← overgenomen + uitgebreide tokens
├── scripts/
│   ├── sync-domain.mjs      ← whitelist-kopie uit ../factuurt/src/domain
│   ├── screenshot-manifest.ts
│   └── take-screenshots.ts  ← Playwright-pipeline → public/screenshots/
├── public/screenshots/      ← gegenereerd, in git (site moet zonder app kunnen builden)
└── .claude/                 ← agents, commands, state (zie CLAUDE.md)
```

**Alle copy in `src/content/`** — nooit hardcoded in componenten. Zo kan de copywriter-agent teksten herzien zonder componenten te raken, en is een latere EN-vertaling triviaal.

---

## 8. Design system (marketing-uitbreiding op de app-tokens)

- **Kleur:** wit/`gray-50` vlakken, `#2563eb` als enige accentkleur, donkerblauw (`blue-950`) voor het slot-CTA-blok. Succes-groen alléén in demo's (betaalde factuur).
- **Typografie:** Inter; display-schaal voor headlines (`clamp()`-based), body 16–18 px.
- **Ritme:** secties op een vast spacing-grid; afwisselend wit / `gray-50` voor scanbaarheid.
- **Animatie-principes:** subtiel en functioneel (reveal-on-scroll, de workflow-walkthrough); geen parallax-circus; `prefers-reduced-motion` gerespecteerd.
- **Touch:** targets ≥ 44 px, geen horizontale scroll — zelfde regels als de app.

---

## 9. SEO, performance & toegankelijkheid

- Metadata + Open Graph-image (gegenereerd design met device-frame), `sitemap.xml`, `robots.txt`, structured data (`SoftwareApplication`).
- Doel-zoektermen: *offerte app elektricien*, *werkbon app*, *factuur app zelfstandige België*.
- Screenshots als geoptimaliseerde `next/image` met expliciete maten; fonts self-hosted; LCP < 2.5 s op 4G.
- Semantische HTML, één `h1`, zichtbare focus-states, contrast AA — de visual-qa-agent bewaakt dit.

---

## 10. Conversie & CTA's

- **Primair — "Start gratis":** linkt naar de registratiepagina van de app (URL configureerbaar via env `NEXT_PUBLIC_APP_URL`, want productie-URL kan nog wijzigen).
- **Secundair — "Contact":** formulier → Resend-mail naar jouw adres; validatie met Zod; honeypot-veld tegen spam; nette bevestiging zonder page-reload.
- CTA's herhaald: hero, na de interactieve demo, slotblok, sticky topbar.
- **Bewust uitgesteld:** wachtlijst/early-access (het formulier en de sectiestructuur zijn er klaar voor — later één sectie toevoegen).

---

## 11. Fasering

| Fase | Inhoud | Resultaat |
|---|---|---|
| **M0 — Fundament** | Next.js-scaffold, tokens, fonts, sectie-shell, content-structuur, sync-domain-script | Lege maar draaiende one-pager met design system |
| **M1 — Visuals-pipeline** | Demo-seed in de app, screenshot-manifest, Playwright-pipeline, device-frame-component | `public/screenshots/` gevuld, herhaalbaar |
| **M2 — Statische secties** | Hero, probleem-strook, feature-grid, offline, voor-wie, FAQ, footer + alle copy | Volledige pagina, nog zonder interactie |
| **M3 — Interactie** | Workflow-walkthrough (sectie 3) + interactieve offerte-demo (sectie 4) op domeincode | De "wow"-laag |
| **M4 — Conversie & afwerking** | Contactformulier + Resend, SEO/OG, Lighthouse-optimalisatie, visual QA op 375/768/1440 | Klaar voor deploy |
| **M5 — Deploy** | Vercel, domein, env vars | Live |

---

## 12. Definition of done (per fase én voor het geheel)

1. `type-check` + `lint` + Vitest groen; Playwright-smoke slaagt.
2. Visueel gecontroleerd op 375, 768 en 1440 px (visual-qa-agent + eigen ogen).
3. Alle copy uit `src/content/`, alle kleuren uit tokens, alle iconen lucide.
4. Lighthouse-doelen uit §2 gehaald (gemeten, niet geschat).
5. De vier senior-vragen beantwoord: secure (formulier!), efficiënt, breekt niets, getest.

## 13. Open punten (beslissen vóór M4/M5)

- [ ] Domeinnaam (factuurt.be?) en productie-URL van de app voor de *Start gratis*-link.
- [ ] E-mailadres waar contactformulier-berichten naartoe moeten.
- [ ] Logo: bestaat er al een definitief logo/woordmerk, of ontwerpen we een woordmerk in Inter?
- [ ] Privacyverklaring & algemene voorwaarden als pagina of PDF-link (`../ondernemingsinfo/algemene voorwaarden.pdf` bestaat al).
