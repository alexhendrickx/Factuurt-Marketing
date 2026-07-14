import { describe, expect, it } from 'vitest'
import { cn } from '../cn'

describe('cn', () => {
  it('merges tailwind classes, later overwrites earlier', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('filters falsy values', () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c')
  })
})
