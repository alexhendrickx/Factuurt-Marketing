import type { WorkflowRegel } from '@/content/workflow'

/** Eén selecteerbare regel uit de mini-prijsbibliotheek.
 *  Erft de domeinvorm van WorkflowRegel (voedt calcBtwTotalen), plus een
 *  stabiele id voor selectie-state en een default-selectie-vlag. */
export interface DemoRegel extends WorkflowRegel {
  /** Stabiele sleutel voor React-key en selectie-set (bv. 'stopcontact'). */
  id: string
  /** Staat deze regel bij het laden aangevinkt? Zorg dat er 2 default aan staan
   *  zodat de totalen meteen gevuld zijn (spec: "kiest 2–3 regels"). */
  defaultGeselecteerd: boolean
}

export interface DemoOfferteContent {
  /** Sectie-kop (h2). copywriter. */
  heading: string
  /** Optionele intro; '' → niet renderen (patroon uit workflow.ts/features.ts). copywriter. */
  intro: string
  /** Label bij de prijsbibliotheek-lijst (bv. "Kies wat je gedaan hebt"). copywriter. */
  bibliotheekLabel: string
  /** BTW-toggle: label + de twee opties. tariefStandaard = 21, tariefVerlaagd = 6.
   *  toggleLabel bv. "Renovatie (6% BTW)". copywriter voor labels; tarieven executor. */
  btwToggle: {
    label: string          // copywriter
    tariefStandaard: 21     // executor
    tariefVerlaagd: 6       // executor
    btwLabel: string       // executor, het woord "BTW" voor samenstelling van knopteksten
  }
  /** Knoptekst offerte → werkbon. copywriter (bv. "Maak er een werkbon van"). */
  flipLabel: string
  /** Statuschips voor de twee kaartstaten (app-getrouw, executor). */
  offerteStatus: string    // executor, bv. 'Concept'
  werkbonStatus: string    // executor, bv. 'Getekend'
  /** Afsluiter-tekst onder de werkbon (bv. "Zo werkt heel Factuurt."). copywriter. */
  outro: string
  /** Terug-link-label om van werkbon naar offerte te gaan. copywriter. */
  terugLabel: string
  /** Klant/project voor de mockup-koptekst — sluit aan op demo-seed. Executor. */
  klantNaam: string        // executor, 'Elektro Peeters'
  projectNaam: string      // executor, 'Renovatie zekeringkast'
  /** Waarschuwing bij < minimum selectie (spec: 2–3 regels). copywriter. */
  legeSelectieHint: string
  /** De mini-prijsbibliotheek: 3 regels. Executor, app-getrouw. */
  regels: DemoRegel[]
}

export const demoOfferte: DemoOfferteContent = {
  heading: 'Probeer het zelf',
  intro:
    'Stel hieronder een mini-offerte samen. Dit is geen filmpje, maar het rekent met exact dezelfde code als de app.',
  bibliotheekLabel: 'Kies wat je gedaan hebt',
  btwToggle: {
    label: 'BTW-tarief (6% bij renovatie)',
    tariefStandaard: 21,
    tariefVerlaagd: 6,
    btwLabel: 'BTW',
  },
  flipLabel: 'Maak er een werkbon van',
  offerteStatus: 'Concept',
  werkbonStatus: 'Getekend',
  outro: 'Zo werkt heel Factuurt: één keer invoeren, de rest volgt vanzelf.',
  terugLabel: 'Terug naar de offerte',
  klantNaam: 'Elektro Peeters',
  projectNaam: 'Renovatie zekeringkast',
  legeSelectieHint: 'Vink minstens één regel aan om je offerte te zien.',
  regels: [
    {
      id: 'stopcontact',
      omschrijving: 'Stopcontact plaatsen',
      eenheid: 'st',
      aantal: 6,
      eenheidsprijs: 45,
      btw: 21,
      defaultGeselecteerd: true,
    },
    {
      id: 'kabel',
      omschrijving: 'Kabel trekken',
      eenheid: 'm',
      aantal: 30,
      eenheidsprijs: 3.5,
      btw: 21,
      defaultGeselecteerd: true,
    },
    {
      id: 'uurloon',
      omschrijving: 'Uurloon',
      eenheid: 'u',
      aantal: 4,
      eenheidsprijs: 55,
      btw: 21,
      defaultGeselecteerd: false,
    },
  ],
}
