export interface FaqEntry {
  /** De bezwaar-vraag, in je-vorm, kort. */
  question: string
  /** Het geruststellende antwoord; domeintermen exact (offerte/werkbon/factuur/klant/BTW). */
  answer: string
}

export interface FaqContent {
  /** Sectie-kop (bv. "Veelgestelde vragen"). */
  heading: string
  /** Optionele intro; leeg → niet renderen (patroon uit voorWie.intro). */
  intro: string
  /** De vier hoofdbezwaren uit PLAN §4 nr. 8, in vaste volgorde. */
  entries: [FaqEntry, FaqEntry, FaqEntry, FaqEntry]
}

// HEADING-ALT 1 (actief): 'Nog een paar vragen?'
//   → Kort en uitnodigend, sluit aan op de informele je-vorm van de rest van de site.
// HEADING-ALT 2: 'Voor je begint, dit vragen collega’s vaak.'
//   → Warmer en socialer (andere elektriciens), maar iets langer dan 8 woorden.

export const faq: FaqContent = {
  heading: 'Nog een paar vragen?',
  intro: '',
  entries: [
    {
      question: 'Wat kost Factuurt?',
      answer:
        'Je start gratis en maakt meteen je eerste offerte, werkbon en factuur. Geen kaartgegevens nodig om te beginnen.',
    },
    {
      question: 'Van wie is mijn data?',
      answer:
        'Van jou. Je klanten, offertes en facturen blijven van jou, en je haalt ze er altijd weer uit als je wilt.',
    },
    {
      question: 'Moet ik alles opnieuw invoeren?',
      answer:
        'Nee. Je vult je prijsbibliotheek één keer met je eigen tarieven, en daarna staat elke offerte in een paar tikken klaar.',
    },
    {
      question: 'Werkt het op iPhone én Android?',
      answer:
        'Ja, op allebei. Factuurt draait gewoon in je browser op de werf, zonder dat je iets uit een appstore hoeft te halen.',
    },
  ],
}
