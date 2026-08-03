/** Slug die het manifest aan de Offline-sectie koppelt (§4.6). Eén screenshot. */
export type OfflineSlug = 'offline'

export interface OfflinePoint {
  /** Support-punt-titel in ~2-4 woorden. TODO-copywriter. */
  title: string
  /** Eén zin, je-vorm, wat offline werken je oplevert. TODO-copywriter. */
  detail: string
  /** lucide-react icoonnaam; moet in iconMap staan. */
  icon: string
}

export interface OfflineContent {
  /** Sectie-kop. TODO-copywriter. */
  heading: string
  /** Korte uitleg onder de kop; leeg → niet renderen (patroon voorWie.intro). TODO-copywriter. */
  intro: string
  /** Manifest-slug van het screenshot; via screenshotPath(). Vast: 'offline'. */
  slug: OfflineSlug
  /** Betekenisvolle alt-tekst voor next/image (a11y). Executor vult dit
   *  betekenisvol in (geen placeholder/TODO). */
  imageAlt: string
  /** 2–3 support-punten met icoon. */
  points: OfflinePoint[]
}

// HEADING-ALT 1 (actief): 'Werkt ook drie verdiepingen onder de grond.'
//   → Beeldend en concreet: precies de kelders en technische ruimtes zonder bereik; sluit aan op §4.6.
// HEADING-ALT 2: 'Geen bereik? Je werkt gewoon door.'
//   → Directer en dialoog-achtig, benoemt het pijnpunt letterlijk, maar iets minder onderscheidend.

export const offline: OfflineContent = {
  heading: 'Werkt ook drie verdiepingen onder de grond.',
  intro:
    'Geen bereik in de kelder of de nieuwbouw? Je maakt je offerte en werkbon gewoon af, de factuurt synchroniseert vanzelf zodra je weer netwerk hebt.',
  slug: 'offline',
  imageAlt: 'Factuurt-scherm dat toont dat je werkbon offline bewaard blijft en later synchroniseert',
  points: [
    {
      title: 'Geen bereik nodig',
      detail:
        'In de kelder, de meterkast of een nieuwbouw zonder wifi werk je gewoon door aan je werkbon.',
      icon: 'WifiOff',
    },
    {
      title: 'Alles blijft lokaal',
      detail:
        'Je offertes en werkbonnen staan veilig op je telefoon, ook als de verbinding uren wegblijft.',
      icon: 'CloudOff',
    },
    {
      title: 'Synct vanzelf',
      detail:
        'Zodra je weer netwerk hebt, synchroniseert alles op de achtergrond, jij hoeft niets te doen.',
      icon: 'RefreshCw',
    },
  ],
}
