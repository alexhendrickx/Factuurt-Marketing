import { describe, expect, it } from 'vitest'
import { hero } from '@/content/hero'
import { site } from '@/content/site'
import { SHOTS } from '../../../scripts/screenshot-manifest'

describe('hero content', () => {
  it('heeft een niet-lege title en subtitle', () => {
    expect(hero.title.trim().length).toBeGreaterThan(0)
    expect(hero.subtitle.trim().length).toBeGreaterThan(0)
  })
  it('carrousel-slides zijn uniek, hebben alt-tekst en bestaan in het screenshot-manifest', () => {
    expect(hero.slides.length).toBeGreaterThanOrEqual(2)
    const slugs = hero.slides.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    const manifestSlugs = new Set(SHOTS.map((s) => s.slug))
    for (const slide of hero.slides) {
      expect(manifestSlugs.has(slide.slug)).toBe(true)
      expect(slide.alt.trim().length).toBeGreaterThan(0)
    }
    expect(hero.slidesNavLabel.trim().length).toBeGreaterThan(0)
  })
  it('primaire CTA heeft label en href', () => {
    expect(site.cta.primary.label).toBe('Start gratis')
    expect(site.cta.primary.href.length).toBeGreaterThan(0)
  })
  it('secundaire CTA linkt naar de workflow-sectie', () => {
    expect(site.cta.secondary.label).toBe('Bekijk hoe het werkt')
    expect(site.cta.secondary.href).toBe('#workflow')
  })
})
