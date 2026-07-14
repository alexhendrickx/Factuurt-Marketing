export interface SlotCtaContent {
  /** Grote slot-kop, laatste duw. Kort. */
  heading: string
  /** Eén regel herbevestiging onder de kop; leeg → niet renderen (patroon voorWie.intro). */
  subline: string
  /** Secundaire tekst-link naast de primaire knop ("Of stel je vraag"). */
  secondaryLabel: string
}

// HEADING-ALT 1 (actief): 'Klaar om je avonden terug te winnen?'
//   → Raakt het kernpijnpunt (administratie 's avonds) en maakt de winst persoonlijk.
// HEADING-ALT 2: 'Van offerte tot betaalde factuur. Start vandaag.'
//   → Herhaalt de Hero-belofte letterlijk; rationeler, minder emotioneel dan ALT 1.

export const slotCta: SlotCtaContent = {
  heading: 'Klaar om je avonden terug te winnen?',
  subline: 'Offerte, werkbon en factuur op je telefoon — je start gratis, zonder kaartgegevens.',
  secondaryLabel: 'Of stel je vraag',
}
