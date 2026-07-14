import { describe, expect, it } from 'vitest'
import { offline } from '@/content/offline'
import { iconMap, resolveIcon } from '@/lib/iconMap'
import { SHOTS } from '../../../scripts/screenshot-manifest'

describe('offline content', () => {
  it('slug is exact "offline"', () => {
    expect(offline.slug).toBe('offline')
  })

  it('slug bestaat in het manifest (SHOTS)', () => {
    const shotExists = SHOTS.some((s) => s.slug === offline.slug)
    expect(shotExists).toBe(true)
  })

  it('slug hoort echt bij Offline-sectie (usedIn-check)', () => {
    const shot = SHOTS.find((s) => s.slug === offline.slug)
    expect(shot).toBeDefined()
    if (shot) {
      expect(shot.usedIn).toContain('Offline-sectie')
    }
  })

  it('imageAlt is betekenisvol: geen "placeholder", geen "TODO", lengte >= 12', () => {
    expect(offline.imageAlt).not.toMatch(/placeholder/i)
    expect(offline.imageAlt).not.toMatch(/^TODO/i)
    expect(offline.imageAlt.trim().length).toBeGreaterThanOrEqual(12)
  })

  it('heeft 2 of 3 punten', () => {
    expect(offline.points.length).toBeGreaterThanOrEqual(2)
    expect(offline.points.length).toBeLessThanOrEqual(3)
  })

  it('elk punt heeft een niet-leeg icoonnaam', () => {
    offline.points.forEach((p) => {
      expect(p.icon.trim().length).toBeGreaterThan(0)
    })
  })

  it('elk punt-icoon bestaat in iconMap', () => {
    offline.points.forEach((p) => {
      expect(p.icon in iconMap).toBe(true)
    })
  })

  it('punt-iconen zijn onderling uniek (stabiele React-key)', () => {
    const icons = offline.points.map((p) => p.icon)
    expect(new Set(icons).size).toBe(icons.length)
  })

  it('resolveIcon geeft het juiste icoon voor WifiOff', () => {
    expect(resolveIcon('WifiOff')).toBe(iconMap.WifiOff)
  })

  it('resolveIcon geeft het juiste icoon voor CloudOff', () => {
    expect(resolveIcon('CloudOff')).toBe(iconMap.CloudOff)
  })

  it('resolveIcon geeft het juiste icoon voor RefreshCw', () => {
    expect(resolveIcon('RefreshCw')).toBe(iconMap.RefreshCw)
  })
})
