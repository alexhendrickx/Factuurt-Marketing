/** Vaste stap-identifiers, in walkthrough-volgorde. */
export type WorkflowStepId = 'offerte' | 'werkbon' | 'factuur'

/** Eén regel uit de offerte/werkbon. `omschrijving` is een DOMEINTERM-achtige
 *  regel (executor, app-getrouw), niet vrije marketingcopy.
 *  aantal/eenheidsprijs/btw voeden calcBtwTotalen — dus echte, plausibele cijfers. */
export interface WorkflowRegel {
  omschrijving: string      // executor, app-getrouw (bv. 'Stopcontact plaatsen')
  eenheid: string           // 'st', 'm', 'u' — executor
  aantal: number
  eenheidsprijs: number
  /** BTW-percentage als heel getal (6 of 21), consumeerbaar als BtwItem.btw. */
  btw: number
}

export interface WorkflowStep {
  id: WorkflowStepId
  /** Kort tab-label voor de stappen-navigatie. copywriter. */
  label: string
  /** lucide-icoonnaam; moet in iconMap staan. */
  icon: string
  /** Kop boven de mockup voor deze stap. copywriter. */
  heading: string
  /** Eén zin die uitlegt wat er in deze stap gebeurt. copywriter. */
  body: string
  /** Statuschip-tekst in de mockup-koptekst (bv. 'Concept', 'Getekend',
   *  'Betaald'). Executor, app-getrouwe domeinterm. */
  statusLabel: string
  /** Semantische toon van de statuschip. */
  statusTone: 'neutral' | 'success'
}

export interface WorkflowContent {
  /** Sectie-kop (h2). copywriter. */
  heading: string
  /** Optionele intro; leeg '' → niet renderen (patroon uit features.ts). */
  intro: string
  /** Precies 3 stappen: offerte → werkbon → factuur. */
  steps: [WorkflowStep, WorkflowStep, WorkflowStep]
  /** Gedeelde regels: dezelfde regels verschijnen in offerte én werkbon,
   *  zodat de bezoeker ziet dat er niets opnieuw ingevoerd wordt (PLAN §6-idee,
   *  hier illustratief). Executor, app-getrouw. 2–3 regels. */
  regels: WorkflowRegel[]
  /** Afsluiter-CTA-tekst onder de walkthrough. copywriter. */
  outro: string
  /** Klant + project voor de mockup-koptekst — sluit aan op de demo-seed
   *  ('Elektro Peeters' / 'Renovatie zekeringkast', PLAN §5A). Executor. */
  klantNaam: string
  projectNaam: string
}

/** Alle hardcoded zichtbare NL-labels uit mockups en footers. */
export const workflowLabels = {
  // OfferteCard + FactuurCard: totalen-blok
  subtotaal: 'Subtotaal',
  btwPrefix: 'BTW',
  totaal: 'Totaal',
  // WerkbonCard: handtekening-blok
  ondertekend: 'Ondertekend',
  klant: 'Klant',
  ondertekendTerPlekke: 'Ondertekend ter plekke',
  // FactuurCard: betaal-status (shared met step.statusLabel voor factuur)
  // INTENTIE: betaal-footer gebruikt dezelfde waarde als steps[2].statusLabel ('Betaald')
} as const

export const workflow: WorkflowContent = {
  heading: 'Zo werkt het',
  intro:
    'Eén flow van offerte tot betaalde factuur — zonder iets twee keer in te typen.',
  steps: [
    {
      id: 'offerte',
      label: 'Offerte',
      icon: 'FileText',
      heading: 'Maak je offerte op de werf',
      body: 'Kies je regels uit je eigen prijsbibliotheek. BTW en totalen rekenen zichzelf uit — je offerte is klaar voor je terug in de camionette zit.',
      statusLabel: 'Concept',
      statusTone: 'neutral',
    },
    {
      id: 'werkbon',
      label: 'Werkbon',
      icon: 'ClipboardList',
      heading: 'Eén tik en het is een werkbon',
      body: 'Dezelfde regels gaan gewoon mee — niets opnieuw invoeren. Je klant tekent ter plekke op je scherm.',
      statusLabel: 'Getekend',
      statusTone: 'neutral',
    },
    {
      id: 'factuur',
      label: 'Factuur',
      icon: 'Receipt',
      heading: 'Factuur de deur uit, betaling opgevolgd',
      body: 'Van getekende werkbon naar factuur in seconden. Je ziet meteen wie betaald heeft en wie nog een herinnering nodig heeft.',
      statusLabel: 'Betaald',
      statusTone: 'success',
    },
  ],
  regels: [
    {
      omschrijving: 'Stopcontact plaatsen',
      eenheid: 'st',
      aantal: 6,
      eenheidsprijs: 45,
      btw: 21,
    },
    {
      omschrijving: 'Kabel trekken',
      eenheid: 'm',
      aantal: 30,
      eenheidsprijs: 3.5,
      btw: 21,
    },
    {
      omschrijving: 'Uurloon (renovatie)',
      eenheid: 'u',
      aantal: 4,
      eenheidsprijs: 55,
      btw: 6,
    },
  ],
  outro: 'Drie stappen, nul avondwerk. Je administratie is klaar wanneer jij het bent.',
  klantNaam: 'Elektro Peeters',
  projectNaam: 'Renovatie zekeringkast',
}
