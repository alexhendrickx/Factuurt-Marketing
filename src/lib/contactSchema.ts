import { z } from 'zod'

/**
 * Validatieschema voor het contactformulier — gedeeld door client (pre-check)
 * en server (api/contact route). Foutmeldingen in het Vlaams, je-vorm.
 *
 * `honeypot` is een verborgen veld dat mensen nooit invullen; bots wel. Server
 * weigert de mail als het gevuld is (zie route). We valideren het hier als
 * optionele lege string zodat het schema strict blijft.
 */
export const contactSchema = z.object({
  naam: z
    .string()
    .trim()
    .min(2, 'Vul je naam in.')
    .max(100, 'Dat is wel een erg lange naam.'),
  email: z
    .string()
    .trim()
    .min(1, 'Vul je e-mailadres in.')
    .email('Dit lijkt geen geldig e-mailadres.')
    .max(200, 'Dat e-mailadres is te lang.'),
  bericht: z
    .string()
    .trim()
    .min(10, 'Vertel kort waar het over gaat (minstens 10 tekens).')
    .max(2000, 'Houd het bij maximaal 2000 tekens.'),
  /** Honeypot — moet leeg blijven. */
  website: z.string().max(0, 'Ongeldige invoer.').optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>
