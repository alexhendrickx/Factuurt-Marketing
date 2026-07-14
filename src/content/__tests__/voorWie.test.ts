import { describe, expect, it } from 'vitest'
import { voorWie } from '@/content/voorWie'
import { iconMap, resolveIcon, fallbackIcon } from '@/lib/iconMap'

describe('voorWie content', () => {
  it('heeft een niet-lege heading', () => {
    expect(voorWie.heading.trim().length).toBeGreaterThan(0)
  })

  it('heeft precies 3 doelgroepen', () => {
    expect(voorWie.audiences).toHaveLength(3)
  })

  it('elke doelgroep heeft niet-lege title, detail en icon', () => {
    voorWie.audiences.forEach((a) => {
      expect(a.title.trim().length).toBeGreaterThan(0)
      expect(a.detail.trim().length).toBeGreaterThan(0)
      expect(a.icon.trim().length).toBeGreaterThan(0)
    })
  })

  it('titels zijn uniek (stabiele React-key)', () => {
    const titles = voorWie.audiences.map((a) => a.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('elk content-icoon bestaat in iconMap (geen stille fallback in productie)', () => {
    const allExist = voorWie.audiences.every((a) => a.icon in iconMap)
    expect(allExist).toBe(true)
  })

  it('resolveIcon geeft het juiste icoon voor HardHat', () => {
    expect(resolveIcon('HardHat')).toBe(iconMap.HardHat)
  })

  it('resolveIcon geeft fallback voor onbekend icoon', () => {
    expect(resolveIcon('DoesNotExist')).toBe(fallbackIcon)
  })
})
