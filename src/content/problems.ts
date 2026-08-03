export interface Problem {
  /** De pijn, herkenbaar in max ~6-8 woorden. */
  title: string
  /** Eén ondersteunende zin die de pijn concreet maakt. */
  detail: string
  /** lucide-react icoonnaam (component rendert het icoon). */
  icon: string
}

export interface ProblemsContent {
  /** Korte sectie-kop — de herkenning, niet de oplossing. */
  heading: string
  problems: [Problem, Problem, Problem]
}

// HEADING-ALT 1 (actief): 'Herken je dit?'
//   → Kortst en meest direct; zet de lezer meteen in de herkenmodus, laat de drie regels het werk doen.
// HEADING-ALT 2: 'Je kent het wel.'
//   → Nog informeler en vertrouwd, maar iets minder uitnodigend dan een vraag.
// HEADING-ALT 3: 'De avonden gaan naar de administratie.'
//   → Schetst het beeld al in de kop, maar overlapt met pijnpunt 1 en steelt zijn kracht.

export const problems: ProblemsContent = {
  heading: 'Herken je dit?',
  problems: [
    {
      title: 'Je avonden gaan op aan offertes.',
      detail:
        'Overdag op de werf, en ’s avonds nog in Word of Excel offertes zitten typen.',
      icon: 'Moon',
    },
    {
      title: 'Je vergeet uren en materiaal door te rekenen.',
      detail:
        'Niet genoteerd op de werf, dus factureer je te weinig en dat merk je pas veel later.',
      icon: 'Receipt',
    },
    {
      title: 'Klanten betalen veel te laat.',
      detail:
        'Je zit achter je geld aan met belletjes en herinneringen die je zelf moet opvolgen.',
      icon: 'Clock',
    },
  ],
}
