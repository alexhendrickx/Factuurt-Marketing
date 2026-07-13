import { describe, expect, it } from 'vitest'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { SHOTS, VIEWPORT, screenshotPath, validateManifest, type Shot } from '../screenshot-manifest'

describe('screenshot-manifest', () => {
  it('VIEWPORT is 390×844 (iPhone)', () => {
    expect(VIEWPORT.width).toBe(390)
    expect(VIEWPORT.height).toBe(844)
  })

  it('validateManifest() met standaard SHOTS gooit niet', () => {
    expect(() => validateManifest()).not.toThrow()
  })

  it('validateManifest() gooit bij dubbele slug', () => {
    const invalid: Shot[] = [
      { slug: 'a', route: '/a', usedIn: 'x' },
      { slug: 'a', route: '/b', usedIn: 'y' },
    ]
    expect(() => validateManifest(invalid)).toThrow('Dubbele slug')
  })

  it('validateManifest() gooit bij niet-kebab-case slug', () => {
    const invalid: Shot[] = [{ slug: 'Dashboard', route: '/dashboard', usedIn: 'x' }]
    expect(() => validateManifest(invalid)).toThrow('Ongeldige slug')
  })

  it('validateManifest() gooit bij non-kebab-case (underscore)', () => {
    const invalid: Shot[] = [{ slug: 'a_b', route: '/dashboard', usedIn: 'x' }]
    expect(() => validateManifest(invalid)).toThrow('Ongeldige slug')
  })

  it('validateManifest() gooit bij route zonder leidende /', () => {
    const invalid: Shot[] = [{ slug: 'dashboard', route: 'dashboard', usedIn: 'x' }]
    expect(() => validateManifest(invalid)).toThrow('Route moet met / beginnen')
  })

  it('screenshotPath() construeert correct pad', () => {
    expect(screenshotPath('dashboard')).toBe('/screenshots/dashboard.png')
  })

  it('elke SHOTS-slug heeft een gecommit placeholder-bestand', () => {
    const screenshotsDir = resolve(__dirname, '../../public/screenshots')
    for (const shot of SHOTS) {
      const path = resolve(screenshotsDir, `${shot.slug}.png`)
      expect(existsSync(path), `${shot.slug}.png moet bestaan op ${path}`).toBe(true)
    }
  })
})
