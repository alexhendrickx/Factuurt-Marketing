import { describe, expect, it } from 'vitest'
import { hero } from '@/content/hero'
import { site } from '@/content/site'

describe('hero content', () => {
  it('heeft een niet-lege title en subtitle', () => {
    expect(hero.title.trim().length).toBeGreaterThan(0)
    expect(hero.subtitle.trim().length).toBeGreaterThan(0)
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
