import { describe, expect, it } from 'vitest'
import { contactSchema } from '../contactSchema'

const geldig = {
  naam: 'Jan Peeters',
  email: 'jan@elektro-peeters.be',
  bericht: 'Ik heb een vraag over de offertes in de app.',
  website: '',
}

describe('contactSchema', () => {
  it('accepteert een geldige inzending', () => {
    const result = contactSchema.safeParse(geldig)
    expect(result.success).toBe(true)
  })

  it('weigert een te korte naam', () => {
    const result = contactSchema.safeParse({ ...geldig, naam: 'J' })
    expect(result.success).toBe(false)
  })

  it('weigert een ongeldig e-mailadres', () => {
    const result = contactSchema.safeParse({ ...geldig, email: 'geen-email' })
    expect(result.success).toBe(false)
  })

  it('weigert een te kort bericht', () => {
    const result = contactSchema.safeParse({ ...geldig, bericht: 'te kort' })
    expect(result.success).toBe(false)
  })

  it('weigert een gevuld honeypot-veld', () => {
    const result = contactSchema.safeParse({ ...geldig, website: 'http://spam.example' })
    expect(result.success).toBe(false)
  })

  it('trimt witruimte rond de naam', () => {
    const result = contactSchema.safeParse({ ...geldig, naam: '  Jan Peeters  ' })
    expect(result.success && result.data.naam).toBe('Jan Peeters')
  })
})
