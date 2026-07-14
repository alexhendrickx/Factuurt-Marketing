import { describe, expect, it } from 'vitest'
import { slotCta } from '../slotCta'

describe('slotCta content', () => {
  it('has heading property as string', () => {
    expect(typeof slotCta.heading).toBe('string')
  })

  it('has subline property as string', () => {
    expect(typeof slotCta.subline).toBe('string')
  })

  it('has secondaryLabel property as string', () => {
    expect(typeof slotCta.secondaryLabel).toBe('string')
  })

  it('structure matches SlotCtaContent interface', () => {
    expect(Object.keys(slotCta)).toEqual(['heading', 'subline', 'secondaryLabel'])
  })
})
