import { describe, expect, it } from 'vitest'
import { footer } from '../footer'

describe('footer content', () => {
  it('has tagline as string', () => {
    expect(typeof footer.tagline).toBe('string')
  })

  it('has copyrightTemplate containing {year} placeholder', () => {
    expect(typeof footer.copyrightTemplate).toBe('string')
    expect(footer.copyrightTemplate).toContain('{year}')
  })

  it('has links array', () => {
    expect(Array.isArray(footer.links)).toBe(true)
  })

  it('each link has label and href as strings', () => {
    footer.links.forEach((link) => {
      expect(typeof link.label).toBe('string')
      expect(typeof link.href).toBe('string')
    })
  })

  it('all links with non-empty href match valid patterns', () => {
    const validHrefPattern = /^(mailto:|#|\/|https?:\/\/)/
    footer.links.forEach((link) => {
      if (link.href.trim().length > 0) {
        expect(link.href).toMatch(validHrefPattern)
      }
    })
  })

  it('structure matches FooterContent interface', () => {
    expect(Object.keys(footer).sort()).toEqual(
      ['business', 'businessHeading', 'copyrightTemplate', 'links', 'tagline'].sort(),
    )
  })

  it('exposes business identity for ownership verification', () => {
    expect(typeof footer.businessHeading).toBe('string')
    expect(footer.businessHeading.trim().length).toBeGreaterThan(0)
    expect(footer.business.name.trim().length).toBeGreaterThan(0)
    expect(footer.business.activity.trim().length).toBeGreaterThan(0)
  })

  it('has a valid public business email', () => {
    expect(footer.business.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })

  it('has business ondernemingsnummer and address as strings (may be empty)', () => {
    expect(typeof footer.business.ondernemingsnummer).toBe('string')
    expect(typeof footer.business.address).toBe('string')
  })
})
