export interface ContactField {
  /** Zichtbaar label, je-vorm. */
  label: string
  /** Placeholder-voorbeeld. */
  placeholder: string
}

export interface ContactContent {
  /** Sectie-kop. */
  heading: string
  /** Korte intro onder de kop; leeg → niet renderen. */
  intro: string
  /** Veld-copy (naam, e-mail, bericht). */
  fields: {
    naam: ContactField
    email: ContactField
    bericht: ContactField
  }
  /** Verzendknop-label. */
  submitLabel: string
  /** Label tijdens verzenden. */
  submittingLabel: string
  /** Bevestiging na succesvol verzenden (geen page-reload). */
  successTitle: string
  successBody: string
  /** Generieke foutmelding (netwerk/server). */
  errorMessage: string
  /** Zichtbaar alternatief naast het formulier. */
  directLabel: string
}

export const contact: ContactContent = {
  heading: 'Stel je vraag',
  intro:
    'Iets niet duidelijk, of wil je gewoon even sparren over je administratie? Stuur een bericht — je krijgt persoonlijk antwoord.',
  fields: {
    naam: { label: 'Je naam', placeholder: 'Jan Peeters' },
    email: { label: 'Je e-mailadres', placeholder: 'jan@elektro-peeters.be' },
    bericht: {
      label: 'Je bericht',
      placeholder: 'Waarmee kunnen we je helpen?',
    },
  },
  submitLabel: 'Verstuur bericht',
  submittingLabel: 'Bezig met versturen…',
  successTitle: 'Bericht verstuurd — bedankt!',
  successBody: 'We lezen alles zelf en antwoorden zo snel mogelijk.',
  errorMessage:
    'Er ging iets mis bij het versturen. Probeer het straks opnieuw of mail ons rechtstreeks.',
  directLabel: 'Liever rechtstreeks mailen?',
}
