import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { WHITELIST, syncDomain, withHeader } from '../sync-domain.mjs'
import { calcBtwTotalen } from '../../src/domain/factuur/btwCalculator'
import { berekenGefactureerdeMinuten } from '../../src/domain/shared/afrond'

describe('sync-domain', () => {
  it('withHeader voegt gegenereerd-header toe met bronpad', () => {
    const source = 'export const x = 1'
    const result = withHeader(source, 'shared/format.ts')
    expect(result).toMatch(/\/\/ GEGENEREERD door scripts\/sync-domain\.mjs/)
    expect(result).toMatch(/\/\/ Bron: \.\.\/factuurt\/src\/domain\/shared\/format\.ts/)
    expect(result.endsWith(source)).toBe(true)
  })

  it('WHITELIST bevat alleen .ts-paden zonder .. escape', () => {
    for (const item of WHITELIST) {
      expect(item).toMatch(/\.ts$/)
      expect(item).not.toContain('..')
    }
  })

  it('syncDomain is deterministisch: synct exact whitelist, verwijdert rest', () => {
    const tempSource = mkdtempSync(join(tmpdir(), 'sync-test-src-'))
    const tempTarget = mkdtempSync(join(tmpdir(), 'sync-test-tgt-'))

    // Maak bron met 4 whitelist + 1 extra bestand
    for (const rel of WHITELIST) {
      const dir = join(tempSource, rel.substring(0, rel.lastIndexOf('/')))
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(tempSource, rel), `// dummy: ${rel}`)
    }
    mkdirSync(join(tempSource, 'shared'), { recursive: true })
    writeFileSync(join(tempSource, 'shared/extra.ts'), '// mag niet meekomen')

    // Plaats oud bestand in target
    writeFileSync(join(tempTarget, 'oud.ts'), 'weg!')

    syncDomain({ source: tempSource, target: tempTarget })

    // Check: exact 4 whitelist + hun subdirs
    const files = readdirSync(tempTarget, { recursive: true })
      .filter((f) => typeof f === 'string' && f.endsWith('.ts'))
      .sort()
    expect(files).toEqual([
      join('factuur', 'btwCalculator.ts'),
      join('factuur', 'factuur-berekening.ts'),
      join('shared', 'afrond.ts'),
      join('shared', 'format.ts'),
    ])

    // Check: extra.ts niet meegekomen
    expect(files.includes('shared/extra.ts')).toBe(false)

    // Check: oud.ts verwijderd
    expect(files.includes('oud.ts')).toBe(false)

    // Check: elk bestand heeft header
    for (const rel of WHITELIST) {
      const content = readFileSync(join(tempTarget, rel), 'utf8')
      expect(content).toMatch(/\/\/ GEGENEREERD/)
    }
  })

  it('syncDomain gooit Error als bronmap niet bestaat', () => {
    expect(() => {
      syncDomain({ source: '/nonexistent/path' })
    }).toThrow(/Bron niet gevonden/)
  })

  it('gesynct domein: calcBtwTotalen rekent correct', () => {
    const result = calcBtwTotalen([
      { aantal: 2, eenheidsprijs: 50, btw: 21 },
      { aantal: 10, eenheidsprijs: 7, btw: 6 },
    ])
    expect(result.subtotaal).toBe(170)
    expect(result.btwPerTarief.get(21)).toBeCloseTo(21, 10)
    expect(result.btwPerTarief.get(6)).toBeCloseTo(4.2, 10)
    expect(result.totaal).toBeCloseTo(195.2, 10)
  })

  it('gesynct domein: berekenGefactureerdeMinuten rond correct af', () => {
    expect(
      berekenGefactureerdeMinuten(52, { afrondingsRegel: 'KWARTIER', afrondingsRichting: 'OMHOOG' }),
    ).toBe(60)
    expect(berekenGefactureerdeMinuten(52, { afrondingsRegel: 'MINUUT', afrondingsRichting: 'OMHOOG' })).toBe(52)
  })
})
