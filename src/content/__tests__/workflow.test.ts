import { describe, it, expect } from 'vitest'
import { workflow, workflowLabels } from '../workflow'
import { calcBtwTotalen } from '@/domain/factuur/btwCalculator'
import { iconMap } from '@/lib/iconMap'

describe('workflow content', () => {
  it('has exactly 3 steps in the correct order', () => {
    expect(workflow.steps).toHaveLength(3)
    expect(workflow.steps[0].id).toBe('offerte')
    expect(workflow.steps[1].id).toBe('werkbon')
    expect(workflow.steps[2].id).toBe('factuur')
  })

  it('each step has non-empty label, heading, body, and statusLabel', () => {
    for (const step of workflow.steps) {
      expect(step.label).toBeTruthy()
      expect(step.heading).toBeTruthy()
      expect(step.body).toBeTruthy()
      expect(step.statusLabel).toBeTruthy()
    }
  })

  it('each step has a valid statusTone', () => {
    for (const step of workflow.steps) {
      expect(['neutral', 'success']).toContain(step.statusTone)
    }
  })

  it('each step icon exists in iconMap', () => {
    for (const step of workflow.steps) {
      expect(step.icon in iconMap).toBe(true)
    }
  })

  it('only the last step (factuur) has statusTone === success', () => {
    expect(workflow.steps[0].statusTone).toBe('neutral')
    expect(workflow.steps[1].statusTone).toBe('neutral')
    expect(workflow.steps[2].statusTone).toBe('success')
  })

  it('regels have between 2 and 3 items', () => {
    expect(workflow.regels.length).toBeGreaterThanOrEqual(2)
    expect(workflow.regels.length).toBeLessThanOrEqual(3)
  })

  it('each regel has valid aantal, eenheidsprijs, btw, and non-empty omschrijving/eenheid', () => {
    for (const regel of workflow.regels) {
      expect(regel.aantal).toBeGreaterThan(0)
      expect(regel.eenheidsprijs).toBeGreaterThan(0)
      expect([6, 21]).toContain(regel.btw)
      expect(regel.omschrijving).toBeTruthy()
      expect(regel.eenheid).toBeTruthy()
    }
  })

  it('executor-fields do not contain TODO placeholders', () => {
    for (const regel of workflow.regels) {
      expect(regel.omschrijving).not.toMatch(/TODO/i)
    }
    for (const step of workflow.steps) {
      expect(step.statusLabel).not.toMatch(/TODO/i)
    }
    expect(workflow.klantNaam).not.toMatch(/TODO/i)
    expect(workflow.projectNaam).not.toMatch(/TODO/i)
  })

  it('domain consistency: regels → BtwItem[] → calcBtwTotalen returns valid totals', () => {
    const items = workflow.regels.map((r) => ({
      aantal: r.aantal,
      eenheidsprijs: r.eenheidsprijs,
      btw: r.btw,
    }))
    const totalen = calcBtwTotalen(items)

    expect(totalen.subtotaal).toBeGreaterThan(0)
    expect(totalen.totaal).toBeGreaterThan(totalen.subtotaal)
    expect(totalen.totaal).toBe(totalen.subtotaal + totalen.btwBedrag)
  })

  it('workflowLabels contains required label keys for mockups', () => {
    // Ensure labels used in OfferteCard, FactuurCard, WerkbonCard exist
    expect(workflowLabels.subtotaal).toBeTruthy()
    expect(workflowLabels.btwPrefix).toBeTruthy()
    expect(workflowLabels.totaal).toBeTruthy()
    expect(workflowLabels.ondertekend).toBeTruthy()
    expect(workflowLabels.klant).toBeTruthy()
    expect(workflowLabels.ondertekendTerPlekke).toBeTruthy()
  })

  it('factuur statusLabel matches the payment-status label for "Betaald"', () => {
    const factuurStep = workflow.steps.find((s) => s.id === 'factuur')
    expect(factuurStep).toBeDefined()
    expect(factuurStep?.statusLabel).toBe('Betaald')
  })
})
