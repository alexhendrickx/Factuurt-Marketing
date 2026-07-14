import { describe, expect, it } from 'vitest'
import { toggleAccordion, accordionIds } from '@/lib/accordion'

describe('toggleAccordion', () => {
  it('opens an item from closed state', () => {
    expect(toggleAccordion(null, 2)).toBe(2)
  })

  it('closes an item when clicked again (single-open toggle)', () => {
    expect(toggleAccordion(2, 2)).toBe(null)
  })

  it('switches to a different item (single-open behavior)', () => {
    expect(toggleAccordion(1, 3)).toBe(3)
  })
})

describe('accordionIds', () => {
  it('generates correct header and panel ids for an item', () => {
    const ids = accordionIds('faq', 0)
    expect(ids).toEqual({
      headerId: 'faq-h-0',
      panelId: 'faq-p-0',
    })
  })

  it('generates unique header and panel ids for each index', () => {
    const N = 6
    const allIds: string[] = []

    for (let i = 0; i < N; i++) {
      const { headerId, panelId } = accordionIds('faq', i)
      allIds.push(headerId, panelId)
    }

    // All 12 ids should be unique
    expect(new Set(allIds).size).toBe(12)
  })

  it('ensures header-id and panel-id are different (no aria-controls conflict)', () => {
    for (let i = 0; i < 6; i++) {
      const { headerId, panelId } = accordionIds('faq', i)
      expect(headerId).not.toBe(panelId)
    }
  })
})
