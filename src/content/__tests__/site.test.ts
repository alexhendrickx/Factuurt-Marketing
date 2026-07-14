import { describe, expect, it } from 'vitest'
import { site } from '../site'

describe('site content', () => {
  describe('brand', () => {
    it('brand.name is non-empty', () => {
      expect(site.brand.name).toBeTruthy()
      expect(typeof site.brand.name).toBe('string')
    })
  })

  describe('nav', () => {
    it('nav.ariaLabel is non-empty', () => {
      expect(site.nav.ariaLabel).toBeTruthy()
      expect(typeof site.nav.ariaLabel).toBe('string')
    })

    it('nav.mobileCtaAriaLabel is non-empty', () => {
      expect(site.nav.mobileCtaAriaLabel).toBeTruthy()
      expect(typeof site.nav.mobileCtaAriaLabel).toBe('string')
    })

    it('nav.brandHomeLabel is non-empty', () => {
      expect(site.nav.brandHomeLabel).toBeTruthy()
      expect(typeof site.nav.brandHomeLabel).toBe('string')
    })
  })

  describe('cta', () => {
    it('cta.primary.label is non-empty', () => {
      expect(site.cta.primary.label).toBeTruthy()
      expect(typeof site.cta.primary.label).toBe('string')
    })

    it('cta.primary.href is defined', () => {
      expect(site.cta.primary.href).toBeDefined()
      expect(typeof site.cta.primary.href).toBe('string')
    })
  })
})
