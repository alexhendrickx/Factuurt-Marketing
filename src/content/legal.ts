export interface LegalSection {
  /** Kop van de subsectie. */
  heading: string
  /** Eén of meer alinea's. */
  paragraphs: string[]
}

export interface LegalPageContent {
  /** Pagina-titel (h1) + <title>. */
  title: string
  /** Korte beschrijving voor metadata. */
  description: string
  /** Datum laatste update, menselijk leesbaar. */
  updated: string
  /**
   * CONCEPT-vlag: zolang true toont de pagina een zichtbare disclaimer dat de
   * tekst juridisch nagezien moet worden vóór livegang. Zet op false zodra de
   * definitieve tekst is goedgekeurd.
   */
  isDraft: boolean
  /** Zin die als disclaimer verschijnt zolang isDraft true is. */
  draftNotice: string
  sections: LegalSection[]
}

// LET OP — CONCEPTTEKST. Dit is een redelijk, Belgisch-gericht stramien, geen
// juridisch advies. Laat nazien door iemand met kennis van GDPR/BE-recht en
// vul bedrijfsgegevens (ondernemingsnummer, adres) in vóór livegang.

const draftNotice =
  'Dit is een conceptversie. De definitieve tekst wordt nog juridisch nagezien voor livegang.'

export const privacy: LegalPageContent = {
  title: 'Privacyverklaring',
  description:
    'Hoe Factuurt omgaat met je persoonsgegevens: welke data we verwerken, waarom, hoe lang en welke rechten je hebt.',
  updated: '14 juli 2026',
  isDraft: true,
  draftNotice,
  sections: [
    {
      heading: 'Wie zijn we',
      paragraphs: [
        'Factuurt is een dienst voor zelfstandige elektriciens in België. Voor vragen over je gegevens bereik je ons via het contactformulier op deze site. [Bedrijfsnaam, ondernemingsnummer en adres in te vullen.]',
      ],
    },
    {
      heading: 'Welke gegevens we verzamelen',
      paragraphs: [
        'Via het contactformulier verwerken we je naam, e-mailadres en de inhoud van je bericht, zodat we je vraag kunnen beantwoorden.',
        'Deze marketingsite gebruikt geen tracking- of advertentiecookies. We plaatsen geen analytics zonder je daar apart over te informeren.',
      ],
    },
    {
      heading: 'Waarom en op welke grondslag',
      paragraphs: [
        'We gebruiken je contactgegevens uitsluitend om je bericht te beantwoorden. De grondslag is je toestemming, die je geeft door het formulier te versturen, en ons gerechtvaardigd belang om op vragen te reageren.',
      ],
    },
    {
      heading: 'Hoe lang we gegevens bewaren',
      paragraphs: [
        'We bewaren contactberichten niet langer dan nodig om je vraag af te handelen en eventuele opvolging te doen. Daarna verwijderen we ze.',
      ],
    },
    {
      heading: 'Delen met derden',
      paragraphs: [
        'Voor het versturen van formulier-e-mails gebruiken we Resend als verwerker. We verkopen je gegevens nooit en delen ze niet voor commerciële doeleinden.',
      ],
    },
    {
      heading: 'Je rechten',
      paragraphs: [
        'Je hebt recht op inzage, correctie en verwijdering van je gegevens, en je kunt bezwaar maken tegen de verwerking. Neem daarvoor contact met ons op via het formulier. Je kunt ook klacht indienen bij de Gegevensbeschermingsautoriteit.',
      ],
    },
  ],
}

export const voorwaarden: LegalPageContent = {
  title: 'Algemene voorwaarden',
  description:
    'De voorwaarden voor het gebruik van Factuurt en deze website.',
  updated: '14 juli 2026',
  isDraft: true,
  draftNotice,
  sections: [
    {
      heading: 'Toepassing',
      paragraphs: [
        'Deze voorwaarden zijn van toepassing op het gebruik van de Factuurt-app en deze website. Door de dienst te gebruiken, ga je met deze voorwaarden akkoord. [Definitieve versie in te vullen door de aanbieder.]',
      ],
    },
    {
      heading: 'De dienst',
      paragraphs: [
        'Factuurt helpt zelfstandige elektriciens bij het maken van offertes, werkbonnen en facturen. We doen ons best om de dienst betrouwbaar en beschikbaar te houden, maar kunnen ononderbroken beschikbaarheid niet garanderen.',
      ],
    },
    {
      heading: 'Jouw verantwoordelijkheid',
      paragraphs: [
        'Je blijft zelf verantwoordelijk voor de juistheid van de gegevens die je in de app invoert en voor de fiscale en wettelijke conformiteit van je facturen. Factuurt is een hulpmiddel, geen boekhoudkundig of juridisch advies.',
      ],
    },
    {
      heading: 'Aansprakelijkheid',
      paragraphs: [
        'We zijn niet aansprakelijk voor indirecte schade die voortvloeit uit het gebruik van de dienst, voor zover wettelijk toegestaan.',
      ],
    },
    {
      heading: 'Wijzigingen',
      paragraphs: [
        'We kunnen deze voorwaarden aanpassen. Belangrijke wijzigingen kondigen we op een redelijke manier aan.',
      ],
    },
  ],
}
