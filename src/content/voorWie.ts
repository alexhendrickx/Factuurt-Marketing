export interface Audience {
  /** Voor-wie-groep in ~3-6 woorden (bv. "Zelfstandige elektricien"). */
  title: string
  /** Eén zin die de herkenning bevestigt, in je-vorm. */
  detail: string
  /** lucide-react icoonnaam (component rendert het icoon). Moet in iconMap staan. */
  icon: string
}

export interface VoorWieContent {
  /** Sectie-kop: bevestigt de doelgroep, geen buzzwords. */
  heading: string
  /** Optionele intro-zin onder de kop; leeg → niet renderen. */
  intro: string
  /** Precies 3 doelgroep-kaarten. */
  audiences: [Audience, Audience, Audience]
  /** Afsluitende geruststelling (BTW-conform / België), 1 regel. */
  footnote: string
}

// HEADING-ALT 1 (actief): 'Gemaakt voor wie zelf op de werf staat.'
//   → Bevestigt de doelgroep in hun eigen woorden, sluit aan op de Hero ("vanop de werf").
// HEADING-ALT 2: 'Voor de elektricien, niet voor de boekhouder.'
//   → Scherper contrast en herkenbaar, maar iets meer een claim dan een bevestiging.

export const voorWie: VoorWieContent = {
  heading: 'Gemaakt voor wie zelf op de werf staat.',
  intro: 'Voor de zelfstandige elektricien in België en de kleine ploeg errond.',
  audiences: [
    {
      title: 'Zelfstandige elektricien',
      detail:
        'Je doet alles zelf: offerte, werf en factuur. Factuurt regelt de papieren, jij het werk.',
      icon: 'HardHat',
    },
    {
      title: 'Kleine ploeg',
      detail:
        'Met een gast of twee op de baan houd je elke werf en werkbon overzichtelijk bij elkaar.',
      icon: 'Users',
    },
    {
      title: 'Geen boekhouder nodig',
      detail:
        'Je facturen kloppen met de Belgische BTW, dus je hoeft er ’s avonds niet meer op te zwoegen.',
      icon: 'BadgeEuro',
    },
  ],
  footnote: 'Facturen conform de Belgische BTW-regels.',
}
