import { describe, expect, it } from 'vitest'
import { renderCopyright } from '../copyrightYear'

describe('renderCopyright', () => {
  it('replaces {year} placeholder with provided year', () => {
    expect(renderCopyright('© {year} Factuurt', 2026)).toBe('© 2026 Factuurt')
  })

  it('handles multiple {year} placeholders', () => {
    expect(renderCopyright('{year}-{year}', 2025)).toBe('2025-2025')
  })

  it('uses current year as default', () => {
    const currentYear = new Date().getFullYear()
    const result = renderCopyright('© {year} All rights reserved')
    expect(result).toContain(String(currentYear))
    expect(result).toBe(`© ${currentYear} All rights reserved`)
  })

  it('leaves template unchanged if no placeholder', () => {
    expect(renderCopyright('© 2026 Factuurt', 2026)).toBe('© 2026 Factuurt')
  })

  it('converts number year to string', () => {
    expect(renderCopyright('{year}', 1999)).toBe('1999')
  })
})
