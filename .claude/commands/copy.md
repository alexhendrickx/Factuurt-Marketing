---
description: Laat de copywriter de marketingcopy van één sectie schrijven of herzien in src/content/, met 2–3 headline-varianten om uit te kiezen. Geen pipeline-run — alleen woorden.
argument-hint: <sectie, bv. "hero" of "faq">
allowed-tools: Task
---

Spawn de `copywriter`-agent voor deze sectie:

$ARGUMENTS

Geef de agent mee: de sectie-naam, het bijbehorende deel van `PLAN.md` §4, en
de instructie om uitsluitend in `src/content/` te werken.

Na afloop:
1. Toon de headline-varianten met motivatie aan de gebruiker en laat kiezen
   (AskUserQuestion) vóór je de keuze definitief in `src/content/` laat zetten.
2. Draai `npm run type-check` (content is getypeerd — een ontbrekend veld moet
   hier al vallen, niet pas in de build).
3. Rapporteer compact welke bestanden wijzigden.
