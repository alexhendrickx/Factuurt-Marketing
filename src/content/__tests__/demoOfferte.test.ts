import { describe, it, expect } from 'vitest'
import { demoOfferte } from '../demoOfferte'
import { calcBtwTotalen } from '@/domain/factuur/btwCalculator'

describe('demoOfferte content', () => {
  it('has valid schema fields: heading, intro, bibliotheekLabel, flipLabel, outro, terugLabel', () => {
    expect(typeof demoOfferte.heading).toBe('string')
    expect(typeof demoOfferte.intro).toBe('string')
    expect(typeof demoOfferte.bibliotheekLabel).toBe('string')
    expect(typeof demoOfferte.flipLabel).toBe('string')
    expect(typeof demoOfferte.outro).toBe('string')
    expect(typeof demoOfferte.terugLabel).toBe('string')
  })

  it('has non-empty klantNaam and projectNaam', () => {
    expect(demoOfferte.klantNaam).toBeTruthy()
    expect(demoOfferte.projectNaam).toBeTruthy()
  })

  it('regels have between 2 and 3 items', () => {
    expect(demoOfferte.regels.length).toBeGreaterThanOrEqual(2)
    expect(demoOfferte.regels.length).toBeLessThanOrEqual(3)
  })

  it('each regel has valid aantal, eenheidsprijs, btw, and non-empty omschrijving/eenheid/id', () => {
    for (const regel of demoOfferte.regels) {
      expect(regel.aantal).toBeGreaterThan(0)
      expect(regel.eenheidsprijs).toBeGreaterThan(0)
      expect([6, 21]).toContain(regel.btw)
      expect(regel.omschrijving).toBeTruthy()
      expect(regel.eenheid).toBeTruthy()
      expect(regel.id).toBeTruthy()
    }
  })

  it('regel ids are unique', () => {
    const ids = demoOfferte.regels.map((r) => r.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('exactly 2 regels have defaultGeselecteerd = true', () => {
    const count = demoOfferte.regels.filter((r) => r.defaultGeselecteerd).length
    expect(count).toBe(2)
  })

  it('executor-fields do not contain TODO placeholders', () => {
    for (const regel of demoOfferte.regels) {
      expect(regel.omschrijving).not.toMatch(/TODO/i)
    }
    expect(demoOfferte.klantNaam).not.toMatch(/TODO/i)
    expect(demoOfferte.projectNaam).not.toMatch(/TODO/i)
    expect(demoOfferte.offerteStatus).not.toMatch(/TODO/i)
    expect(demoOfferte.werkbonStatus).not.toMatch(/TODO/i)
  })

  it('btwToggle has correct executor-values: 21 and 6', () => {
    expect(demoOfferte.btwToggle.tariefStandaard).toBe(21)
    expect(demoOfferte.btwToggle.tariefVerlaagd).toBe(6)
  })

  it('btwToggle has btwLabel for toggle-knopteksten', () => {
    expect(typeof demoOfferte.btwToggle.btwLabel).toBe('string')
    expect(demoOfferte.btwToggle.btwLabel).toBeTruthy()
    expect(demoOfferte.btwToggle.btwLabel).not.toMatch(/TODO/i)
  })

  it('domain consistency: default-regels at 21% → valid totals', () => {
    const defaultRegels = demoOfferte.regels.filter((r) => r.defaultGeselecteerd)
    const items = defaultRegels.map((r) => ({
      aantal: r.aantal,
      eenheidsprijs: r.eenheidsprijs,
      btw: 21,
    }))
    const totalen = calcBtwTotalen(items)

    expect(totalen.subtotaal).toBeGreaterThan(0)
    expect(totalen.btwPerTarief.has(21)).toBe(true)
    expect(totalen.btwBedrag).toBeCloseTo(totalen.subtotaal * 0.21)
    expect(totalen.totaal).toBe(totalen.subtotaal + totalen.btwBedrag)
  })

  it('domain consistency: default-regels at 6% → lower BTW than 21%', () => {
    const defaultRegels = demoOfferte.regels.filter((r) => r.defaultGeselecteerd)

    // Calculate at 21%
    const items21 = defaultRegels.map((r) => ({
      aantal: r.aantal,
      eenheidsprijs: r.eenheidsprijs,
      btw: 21,
    }))
    const totalen21 = calcBtwTotalen(items21)

    // Calculate at 6%
    const items6 = defaultRegels.map((r) => ({
      aantal: r.aantal,
      eenheidsprijs: r.eenheidsprijs,
      btw: 6,
    }))
    const totalen6 = calcBtwTotalen(items6)

    expect(totalen6.btwPerTarief.has(6)).toBe(true)
    expect(totalen6.btwBedrag).toBeLessThan(totalen21.btwBedrag)
  })

  it('domain consistency: empty selection → zero totals', () => {
    const totalen = calcBtwTotalen([])
    expect(totalen.subtotaal).toBe(0)
    expect(totalen.totaal).toBe(0)
    expect(totalen.btwPerTarief.size).toBe(0)
  })
})
