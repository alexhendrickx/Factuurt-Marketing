import { describe, expect, it } from 'vitest'
import { faq } from '@/content/faq'

describe('faq content', () => {
  it('has a non-empty heading', () => {
    expect(faq.heading.trim().length).toBeGreaterThan(0)
  })

  it('has exactly 4 entries (the four main objections from PLAN §4 nr. 8)', () => {
    expect(faq.entries).toHaveLength(4)
  })

  it('each entry has non-empty question and answer', () => {
    faq.entries.forEach((entry) => {
      expect(entry.question.trim().length).toBeGreaterThan(0)
      expect(entry.answer.trim().length).toBeGreaterThan(0)
    })
  })

  it('all questions are unique (stable React key + collision-free id derivation)', () => {
    const questions = faq.entries.map((e) => e.question)
    expect(new Set(questions).size).toBe(questions.length)
  })

  it('intro is optional (can be empty)', () => {
    // Just verify it exists and is a string; not enforcing non-empty
    expect(typeof faq.intro).toBe('string')
  })
})
