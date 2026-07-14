export interface HeroSlide {
  /** Manifest-slug van het screenshot; via screenshotPath() → /screenshots/<slug>.png. */
  slug: string
  /** Alt-tekst van het screenshot (a11y). */
  alt: string
}

export interface HeroContent {
  title: string
  subtitle: string
  /** Screenshots die de carrousel in het telefoonframe automatisch doorloopt.
   *  Volgorde = toonvolgorde; de eerste slide laadt met priority. */
  slides: HeroSlide[]
  /** Toegankelijk groepslabel voor de slide-navigatie (dots). */
  slidesNavLabel: string
}

// HEADLINE-ALT 1 (actief): 'Van offerte tot betaalde factuur, vanop de werf.'
//   → Meest concreet: dekt de volledige workflow (offerte → factuur) én de plek (werf) in één regel.
// HEADLINE-ALT 2: 'Maak je offerte op de werf, niet in je vrije avond.'
//   → Raakt de scherpste pijn (avonden kwijt), maar toont maar één stap van de workflow.
// HEADLINE-ALT 3: 'Offerte, werkbon en factuur. Vanaf je telefoon.'
//   → Somt de app-termen netjes op, maar mist de emotie van "vanop de werf".

export const hero: HeroContent = {
  title: 'Van offerte tot betaalde factuur, vanop de werf.',
  subtitle:
    'De app voor de zelfstandige elektricien: offertes, werkbonnen en facturen op je telefoon — met je eigen prijsbibliotheek en ook zonder bereik.',
  slides: [
    {
      slug: 'dashboard',
      alt: 'Dashboard van de Factuurt-app met openstaande offertes en facturen',
    },
    {
      slug: 'werkbon',
      alt: 'Werkbonnen-overzicht van de Factuurt-app met lopende werven',
    },
    {
      slug: 'facturen',
      alt: 'Facturen-overzicht van de Factuurt-app met betaalstatus per factuur',
    },
    {
      slug: 'bibliotheek',
      alt: 'Prijsbibliotheek van de Factuurt-app met eigen tarieven per regel',
    },
  ],
  slidesNavLabel: 'Kies welk app-scherm je ziet',
}
