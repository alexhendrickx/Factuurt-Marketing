/** Slugs die het manifest aan de feature-grid koppelt (§4.5). */
export type FeatureSlug = 'agenda' | 'werkbon' | 'facturen' | 'bibliotheek'

export interface Feature {
  /** Feature-titel in ~2-4 woorden (domeinterm). TODO-copywriter. */
  title: string
  /** Eén zin, je-vorm, wat de feature je oplevert. TODO-copywriter. */
  detail: string
  /** lucide-react icoonnaam; moet in iconMap staan. */
  icon: string
  /** Manifest-slug van het screenshot; via screenshotPath() → /screenshots/<slug>.png. */
  slug: FeatureSlug
  /** Betekenisvolle alt-tekst voor next/image (a11y, PLAN §9). Executor vult dit
   *  betekenisvol in (geen placeholder/TODO). */
  imageAlt: string
}

export interface FeaturesContent {
  /** Sectie-kop. TODO-copywriter. */
  heading: string
  /** Optionele intro; leeg → niet renderen (zelfde patroon als voorWie.intro). */
  intro: string
  /** Precies 4 kaarten, elk gekoppeld aan een bestaand manifest-screenshot. */
  features: [Feature, Feature, Feature, Feature]
}

// HEADING-ALT 1 (actief): 'Alles voor de werf, in één app.'
//   → Bevestigt dat de vier kaarten samen je hele werfdag dekken; sluit aan op de Hero ("vanop de werf").
// HEADING-ALT 2: 'Van je eerste afspraak tot je laatste factuur.'
//   → Schetst de volledige boog van de dag, maar overlapt met de workflow-spine (§3) hierboven.

export const features: FeaturesContent = {
  heading: 'Alles voor de werf, in één app.',
  intro: '',
  features: [
    {
      title: 'Agenda',
      detail:
        'Je werven en afspraken staan op een rij, zodat je nooit twee klanten op hetzelfde uur inplant.',
      icon: 'CalendarDays',
      slug: 'agenda',
      imageAlt: 'Agenda-scherm van Factuurt met geplande werven en afspraken',
    },
    {
      title: 'Werkbon ter plekke',
      detail:
        'Je noteert uren, materiaal en foto’s op de werf en laat de klant meteen tekenen - niets raakt kwijt.',
      icon: 'ClipboardList',
      slug: 'werkbon',
      imageAlt: 'Werkbon in Factuurt met timer, foto\'s en handtekening van de klant',
    },
    {
      title: 'Factuur & PDF',
      detail:
        'Vanuit de werkbon stuur je in één tik een nette factuur, klaar als PDF voor je klant.',
      icon: 'FileText',
      slug: 'facturen',
      imageAlt: 'Facturenoverzicht van Factuurt met betaalstatus per factuur',
    },
    {
      title: 'Prijsbibliotheek',
      detail:
        'Je eigen tarieven zet je één keer klaar en gebruik je daarna in elke offerte opnieuw.',
      icon: 'BookOpen',
      slug: 'bibliotheek',
      imageAlt: 'Prijsbibliotheek van Factuurt met opgeslagen materialen en tarieven',
    },
  ],
}
