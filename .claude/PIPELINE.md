# Agent-pipeline — Factuurt-marketingsite

**Alleen de orchestrator (`/build-loop`) leest dit bestand.** Individuele
agents kennen hun rol uit hun eigen definitie in `.claude/agents/` — dit staat
bewust NIET in `CLAUDE.md`, want alles daar betaalt élke subagent-spawn als
vaste contextkost mee.

Zelfde discipline als de factuurt-pipeline (isolated subagents; het dure model
plant en oordeelt, het goedkope voert uit; niemand keurt zijn eigen werk), maar
toegespitst op een marketingsite: **copy en visuele kwaliteit zijn eersteklas
gates**, security is smaller (alleen het contactformulier), en de groen-gate
bevat de productie-build.

## De rollen

| Rol | Uitvoering | Taak |
|---|---|---|
| `copywriter` | agent, **Fable 5** | Alle marketingcopy in `src/content/` — headline-varianten, pijnpunt→belofte, FAQ, microcopy. Vanuit PLAN.md §3 + domeindocs. Raakt nooit componenten. |
| `planner` | agent, **Fable 5** | Vertaalt een sectie/feature uit PLAN.md naar een file-level plan (`.claude/state/plans/`). Schrijft geen source. |
| `executor` | agent, **Haiku** | Implementeert het plan letterlijk, incl. tests. Zelf-verifieert (type-check + lint + eigen tests) vóór overdracht. |
| **groen-gate** | **`bash scripts/gate.sh` — script, géén agent** | type-check → lint → volledige Vitest-suite + regressie-manifest → build, short-circuit bij rood. Compact rapport op stdout; exit 0/1/2. De `checker`-agent bestaat alleen nog als dunne wrapper voor losse handmatige runs. |
| `visual-qa` | agent, **Fable 5** | Read-only visuele gate ná groen: DOM-checks eerst, dan clip-screenshots op 375/768/1440. Beoordeelt layout, spacing, contrast, touch targets, reduced-motion, horizontale scroll. |
| `reviewer` | agent, **Fable 5** | Read-only senior gate: security contactformulier, hergebruik/duplicatie, copy-in-content-regel, dead code, testdekking. Valt de CLAIMS van de planner aan. |

**Blocking vs. advisory:** gate-rood blokkeert altijd. visual-qa blokkeert op
horizontale scroll, kapotte layout op een van de drie breekpunten en contrast
onder AA; de rest is advisory. reviewer blokkeert op security, hardcoded copy
en ongeteste nieuwe logica; stijl/naming is advisory.

## De commands (`.claude/commands/`)

```
/build-loop <sectie of taak uit PLAN.md>
    planner → executor ⇄ gate-script (≤5 cycli) → visual-qa → reviewer (≤2 rondes)
/copy <sectie>
    copywriter herziet of schrijft de content-objecten van één sectie,
    met 2–3 varianten voor headlines zodat jij kiest
/screenshots
    start ../factuurt (npm run dev), draait de Playwright-pipeline,
    rapporteert welke screenshots vernieuwd zijn
```

## Wanneer wat

- **Nieuwe sectie bouwen:** `/build-loop sectie 5 feature-grid uit PLAN.md` —
  het plan per sectie staat al in PLAN.md §4.
- **Alleen tekst:** `/copy hero` — geen pipeline-run verspillen aan woorden.
- **App geüpdatet / screenshots verouderd:** `/screenshots`.
- **Vraag of één-regel-tweak:** gewoon vragen, geen pipeline
  (floor cost ≈ 3 subagent-runs + gate-runs).

## Orkestratie-regels

1. Agents blijven geïsoleerd: de orchestrator relayt alleen gestructureerde
   blokken (`=== PLAN ===`, gate-rapport, QA-rapport, review-rapport), nooit
   transcripts.
2. De executor mag tests/lint nooit verzwakken om groen te forceren.
3. Regressie in het test-manifest (gate exit 2) = onmiddellijke harde stop.
4. Max 5 build-cycli, max 2 visual-qa-rondes, max 2 review-rondes; daarna
   terug naar de mens. 2× dezelfde `PREMISE:` van de executor = plan fout →
   mens.
5. Plannen in `.claude/state/plans/` (git-ignored); state is lokaal runtime.
6. Elke agent leest `CLAUDE.md` als projectcontext — houd dat bestand slank en
   actueel; pipeline-details horen híér, niet daar.

## Token-discipline (waarom deze pipeline goedkoop blijft)

1. **Model-tiering:** Fable 5 alleen waar oordeel nodig is (plan, copy, visuele
   en senior review); Haiku voert uit. Het dure model schrijft nooit bulk-code.
2. **De gate is een script, geen agent:** `scripts/gate.sh` draait tot 5× per
   loop en kost nul model-tokens — alleen het ~8-regelige rapport komt in
   context. Vroeger was dit een Haiku-spawn per cyclus.
3. **Relay alleen gestructureerde blokken:** de orchestrator geeft plandoc-pad
   en rapporten door, nooit transcripts of codedumps; fix-cycli krijgen alleen
   de `FAILING:`/`REGRESSED:`-regels.
4. **Leesbudgetten + progress-digest:** elke agent heeft een expliciet
   leesbudget; de executor houdt `.claude/state/progress/<slug>.md` bij zodat
   fix-cycli niet opnieuw de codebase crawlen.
5. **Beeld-dieet bij visual-qa:** DOM-checks (goedkope tekst) vóór screenshots;
   clip per sectie i.p.v. full-page; deviceScaleFactor 1; max ~6 beelden per
   ronde, elk precies één keer gelezen. Beelden zijn de duurste tokens in de
   hele pipeline.
6. **CLAUDE.md slank:** alles daarin is vaste kost × elke spawn. Vandaar dit
   aparte bestand.
7. **Stabiele prompts = cache-hits:** agent-definities en commands bevatten
   geen timestamps of variabele boilerplate; wat niet verandert tussen runs,
   wordt door de prompt-cache goedkoper.
