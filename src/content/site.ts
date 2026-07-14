export interface CtaContent {
  label: string
  href: string
}

export interface NavContent {
  /** aria-label voor de <header> sticky balk. */
  ariaLabel: string
  /** aria-label voor de mobiele bottom-CTA <div role="region">. */
  mobileCtaAriaLabel: string
  /** Toegankelijke naam van de merk-link naar #hero. */
  brandHomeLabel: string
}

export interface SiteContent {
  brand: { name: string }
  /** Canonieke basis-URL van deze site (voor OG, canonical, sitemap). */
  url: string
  meta: { title: string; description: string; keywords: string[] }
  cta: { primary: CtaContent; secondary: CtaContent }
  nav: NavContent
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '#'
/** Marketing-domein — env-configureerbaar; default bevestigen bij M5-deploy. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://factuurt.be'

export const site: SiteContent = {
  brand: { name: 'Factuurt' },
  url: siteUrl,
  meta: {
    title: 'Factuurt — van offerte tot betaalde factuur, vanop de werf',
    description:
      'De app voor zelfstandige elektriciens in België: offertes, werkbonnen en facturen op je telefoon, met je eigen prijsbibliotheek. Werkt ook offline.',
    // Doel-zoektermen uit PLAN §9.
    keywords: [
      'offerte app elektricien',
      'werkbon app',
      'factuur app zelfstandige',
      'facturatie elektricien België',
      'offerte maken werf',
    ],
  },
  cta: {
    primary: { label: 'Start gratis', href: appUrl },
    secondary: { label: 'Bekijk hoe het werkt', href: '#workflow' },
  },
  nav: {
    ariaLabel: 'Hoofdnavigatie',
    mobileCtaAriaLabel: 'Snel starten',
    brandHomeLabel: 'Factuurt — naar boven',
  },
}
