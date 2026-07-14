'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { toggleAccordion, accordionIds } from '@/lib/accordion'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  /** Unieke basis voor id-afleiding (a11y). Bv. "faq". */
  baseId: string
  items: AccordionItem[]
  /** Index dat bij mount open staat; null = alles dicht (default). */
  defaultOpenIndex?: number | null
}

export function Accordion({
  baseId,
  items,
  defaultOpenIndex = null,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null)

  return (
    <div className="divide-y divide-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const { headerId, panelId } = accordionIds(baseId, i)

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(toggleAccordion(openIndex, i))}
                className={cn(
                  'flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left',
                  'font-medium text-ink',
                  'transition-colors hover:bg-surface-alt',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'h-5 w-5 shrink-0 text-ink-muted transition-transform motion-reduce:transition-none',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>

            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div id={panelId} role="region" aria-labelledby={headerId} hidden={!isOpen} className="overflow-hidden">
                <p className="pb-4 pr-8 text-ink-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
