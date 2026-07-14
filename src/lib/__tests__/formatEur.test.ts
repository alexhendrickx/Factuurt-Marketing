import { describe, it, expect } from 'vitest'
import { formatEur } from '../formatEur'

describe('formatEur', () => {
  it('formatteert 0 als € 0,00', () => {
    const result = formatEur(0)
    expect(result).toMatch(/^€\s?0,00$/)
  })

  it('formatteert 1234.5 met duizendtal-punt en decimaal-komma', () => {
    const result = formatEur(1234.5)
    expect(result).toContain('1.234,50')
  })

  it('forceert twee decimalen voor 9.9', () => {
    const result = formatEur(9.9)
    expect(result).toMatch(/9,90$/)
  })

  it('formatteert een miljoen correct', () => {
    const result = formatEur(1000000)
    expect(result).toContain('1.000.000,00')
  })

  it('is idempotent — twee calls geven hetzelfde resultaat', () => {
    const first = formatEur(1234.56)
    const second = formatEur(1234.56)
    expect(first).toBe(second)
  })
})
