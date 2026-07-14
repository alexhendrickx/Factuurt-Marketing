export interface FooterLink {
  /** Zichtbare tekst. */
  label: string
  /**
   * Doel. Leeg ('') = nog niet beslist (PLAN §13 open punt) → link wordt niet
   * gerenderd. mailto:/http(s)/#-anker toegestaan.
   */
  href: string
}

export interface FooterContent {
  /** Korte merkregel/tagline onder de merknaam, je-vorm. */
  tagline: string
  /** Essentiële links: contact + (later) juridisch. Lege href → niet renderen. */
  links: FooterLink[]
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
  copyrightTemplate: '© {year} Factuurt — gemaakt voor de elektricien op de werf.',
}
