import { describe, expect, it } from 'vitest'
import { problems } from '@/content/problems'
import { iconMap, resolveIcon, fallbackIcon } from '@/lib/iconMap'

describe('problems content', () => {
  it('has a non-empty heading', () => {
    expect(problems.heading.trim().length).toBeGreaterThan(0)
  })

  it('has exactly 3 problems', () => {
    expect(problems.problems).toHaveLength(3)
  })

  it('each problem has non-empty title, detail, and icon', () => {
    problems.problems.forEach((problem) => {
      expect(problem.title.trim().length).toBeGreaterThan(0)
      expect(problem.detail.trim().length).toBeGreaterThan(0)
      expect(problem.icon.trim().length).toBeGreaterThan(0)
    })
  })

  it('every content icon exists in iconMap (no silent fallbacks in production)', () => {
    const allIconsExist = problems.problems.every((p) => p.icon in iconMap)
    expect(allIconsExist).toBe(true)
  })

  it('resolveIcon returns the correct icon for Moon', () => {
    expect(resolveIcon('Moon')).toBe(iconMap.Moon)
  })

  it('resolveIcon returns fallback for unknown icon', () => {
    expect(resolveIcon('DoesNotExist')).toBe(fallbackIcon)
  })
})
