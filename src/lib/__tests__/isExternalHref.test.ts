import { describe, expect, it } from 'vitest'
import { shouldOpenExternal } from '../isExternalHref'

describe('shouldOpenExternal', () => {
  it('should return true for http URLs', () => {
    expect(shouldOpenExternal('http://example.com')).toBe(true)
  })

  it('should return true for https URLs', () => {
    expect(shouldOpenExternal('https://example.com')).toBe(true)
  })

  it('should return false for fragment links', () => {
    expect(shouldOpenExternal('#workflow')).toBe(false)
  })

  it('should return false for relative paths', () => {
    expect(shouldOpenExternal('/about')).toBe(false)
  })

  it('should return false for hash-only fallback', () => {
    expect(shouldOpenExternal('#')).toBe(false)
  })

  it('should return true for https with path and query', () => {
    expect(shouldOpenExternal('https://app.example.com/register?ref=marketing')).toBe(true)
  })
})
