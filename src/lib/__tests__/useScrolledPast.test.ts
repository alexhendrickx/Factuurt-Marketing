import { describe, expect, it } from 'vitest'
import { isPastThreshold } from '../useScrolledPast'

describe('isPastThreshold', () => {
  it('returns true when scrollY exceeds threshold', () => {
    expect(isPastThreshold(500, 480)).toBe(true)
  })

  it('returns false when scrollY equals threshold (strict greater-than)', () => {
    expect(isPastThreshold(480, 480)).toBe(false)
  })

  it('returns false when scrollY is below threshold', () => {
    expect(isPastThreshold(0, 480)).toBe(false)
  })

  it('returns true when scrollY is large and threshold is zero', () => {
    expect(isPastThreshold(1000, 0)).toBe(true)
  })
})
