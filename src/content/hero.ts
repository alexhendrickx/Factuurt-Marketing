export interface HeroContent {
  title: string
  subtitle: string
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
}
