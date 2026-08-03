export interface FooterLink {
  /** Zichtbare tekst. */
  label: string
  /**
   * Doel. Leeg ('') = nog niet beslist (PLAN §13 open punt) → link wordt niet
   * gerenderd. mailto:/http(s)/#-anker toegestaan.
   */
  href: string
}

/**
 * Zichtbare bedrijfs-/eigenaarsgegevens (colofon). Nodig o.a. voor de
 * eigendomsverificatie van de betaalprovider: de accounthouder, het publieke
 * e-mailadres en de bedrijfsactiviteit moeten publiek op de site staan.
 */
export interface BusinessInfo {
  /** Wettelijke naam van de uitbater/accounthouder. */
  name: string
  /** Publiek e-mailadres — moet matchen met het betaalprovider-account. */
  email: string
  /** Korte omschrijving van de bedrijfsactiviteit, je-vorm. */
  activity: string
  /** BE-ondernemingsnummer/BTW (bv. 'BE 0123.456.789'); leeg → niet renderen. */
  ondernemingsnummer: string
  /** Vestigingsadres, één regel; leeg → niet renderen. */
  address: string
}

export interface FooterContent {
  /** Korte merkregel/tagline onder de merknaam, je-vorm. */
  tagline: string
  /** Essentiële links: contact + (later) juridisch. Lege href → niet renderen. */
  links: FooterLink[]
  /** Kop boven het bedrijfsgegevens-blok. */
  businessHeading: string
  /** Colofon: accounthouder, e-mail en activiteit (+ optioneel nummer/adres). */
  business: BusinessInfo
  /**
   * Copyright-regel MET '{year}'-placeholder; de component vervangt {year}
   * door het runtime-jaar. Zo staat er GEEN hardcoded jaartal in de component
   * én geen los jaartal in de content.
   */
  copyrightTemplate: string
}

export const footer: FooterContent = {
  tagline: 'Van offerte tot betaalde factuur, vanop de werf.',
  links: [
    { label: 'Contact', href: '#contact' }, // ankert naar de contact-sectie (M4)
    { label: 'Algemene voorwaarden', href: '/voorwaarden' }, // §13 beslist: aparte pagina
    { label: 'Privacy', href: '/privacy' }, // §13 beslist: aparte pagina
  ],
  businessHeading: 'Bedrijfsgegevens',
  business: {
    name: 'Alex Hendrickx',
    email: 'alexhendrickx01@gmail.com',
    activity:
      'Factuurt is software voor facturatie en administratie voor zelfstandige elektriciens in België: offertes, werkbonnen en facturen vanop de werf.',
    // Vul in zodra beschikbaar; leeg → wordt niet getoond.
    ondernemingsnummer: '',
    address: '',
  },
  copyrightTemplate: '© {year} Factuurt — gemaakt voor de elektricien op de werf.',
}
