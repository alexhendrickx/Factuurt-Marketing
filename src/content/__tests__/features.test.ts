import { describe, expect, it } from 'vitest'
import { features } from '@/content/features'
import { iconMap, resolveIcon } from '@/lib/iconMap'
import { SHOTS } from '../../../scripts/screenshot-manifest'

describe('features content', () => {
  it('heeft precies 4 features', () => {
    expect(features.features).toHaveLength(4)
  })

  it('has a non-empty heading', () => {
    expect(features.heading.trim().length).toBeGreaterThan(0)
  })

  it('elke feature heeft niet-lege title, detail, icon, slug en imageAlt', () => {
    features.features.forEach((f) => {
      expect(f.title.trim().length).toBeGreaterThan(0)
      expect(f.detail.trim().length).toBeGreaterThan(0)
      expect(f.icon.trim().length).toBeGreaterThan(0)
      expect(f.slug.trim().length).toBeGreaterThan(0)
      expect(f.imageAlt.trim().length).toBeGreaterThan(0)
    })
  })

  it('titels zijn uniek (stabiele React-key)', () => {
    const titles = features.features.map((f) => f.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('elk content-icoon bestaat in iconMap', () => {
    features.features.forEach((f) => {
      expect(f.icon in iconMap).toBe(true)
    })
  })

  it('elk slug bestaat in het manifest (SHOTS)', () => {
    features.features.forEach((f) => {
      const shotExists = SHOTS.some((s) => s.slug === f.slug)
      expect(shotExists).toBe(true)
    })
  })

  it('elk slug hoort echt bij Feature-grid (usedIn-check)', () => {
    features.features.forEach((f) => {
      const shot = SHOTS.find((s) => s.slug === f.slug)
      expect(shot).toBeDefined()
      if (shot) {
        expect(shot.usedIn).toContain('Feature-grid')
      }
    })
  })

  it('imageAlt is betekenisvol: geen "placeholder", geen "TODO", lengte >= 12', () => {
    features.features.forEach((f) => {
      expect(f.imageAlt).not.toMatch(/placeholder/i)
      expect(f.imageAlt).not.toMatch(/^TODO/i)
      expect(f.imageAlt.trim().length).toBeGreaterThanOrEqual(12)
    })
  })

  it('slugs zijn onderling uniek', () => {
    const slugs = features.features.map((f) => f.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('resolveIcon geeft het juiste icoon voor CalendarDays', () => {
    expect(resolveIcon('CalendarDays')).toBe(iconMap.CalendarDays)
  })

  it('resolveIcon geeft het juiste icoon voor ClipboardList', () => {
    expect(resolveIcon('ClipboardList')).toBe(iconMap.ClipboardList)
  })

  it('resolveIcon geeft het juiste icoon voor FileText', () => {
    expect(resolveIcon('FileText')).toBe(iconMap.FileText)
  })

  it('resolveIcon geeft het juiste icoon voor BookOpen', () => {
    expect(resolveIcon('BookOpen')).toBe(iconMap.BookOpen)
  })
})
