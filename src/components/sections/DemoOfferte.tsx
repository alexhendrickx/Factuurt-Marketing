'use client'
import type { JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { Button } from '@/components/ui/Button'
import { OfferteCard } from '@/components/mockups/OfferteCard'
import { WerkbonCard } from '@/components/mockups/WerkbonCard'
import { demoOfferte } from '@/content/demoOfferte'
import { site } from '@/content/site'
import { calcBtwTotalen } from '@/domain/factuur/btwCalculator'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

export function DemoOfferte(): JSX.Element {
  const [geselecteerd, setGeselecteerd] = useState<Set<string>>(() => {
    return new Set(
      demoOfferte.regels
        .filter((r) => r.defaultGeselecteerd)
        .map((r) => r.id)
    )
  })
  const [renovatie, setRenovatie] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [mounted, setMounted] = useState(false)
  const revealed = useRevealOnMount()
  const prefersReducedMotion = useReducedMotion()

  // Mount gate: SSR renders with motion, then client switches if reduced-motion
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine final motion preference only after mount
  const reduceMotion = mounted && prefersReducedMotion

  // Compute effective BTW and filtered regels once
  const effectieveBtw = renovatie
    ? demoOfferte.btwToggle.tariefVerlaagd   // 6
    : demoOfferte.btwToggle.tariefStandaard  // 21

  const geselecteerdeRegels = useMemo(() => {
    return demoOfferte.regels
      .filter((r) => geselecteerd.has(r.id))
      .map((r) => ({ ...r, btw: effectieveBtw }))
  }, [geselecteerd, effectieveBtw])

  const items = useMemo(
    () =>
      geselecteerdeRegels.map((r) => ({
        aantal: r.aantal,
        eenheidsprijs: r.eenheidsprijs,
        btw: r.btw,
      })),
    [geselecteerdeRegels]
  )

  const totalen = useMemo(() => calcBtwTotalen(items), [items])

  const toggleRegel = (id: string) => {
    setGeselecteerd((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const isEmpty = geselecteerd.size === 0

  return (
    <SectionShell id="demo" variant="alt">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        {demoOfferte.heading}
      </h2>

      {demoOfferte.intro.trim().length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-center text-lg text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {demoOfferte.intro}
        </p>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom A: Prijsbibliotheek + BTW-toggle */}
        <div className="space-y-6">
          {/* Checkbox-lijst */}
          <fieldset>
            <legend className="block text-sm font-medium text-ink mb-4">
              {demoOfferte.bibliotheekLabel}
            </legend>
            <div className="space-y-3">
              {demoOfferte.regels.map((regel) => {
                const isChecked = geselecteerd.has(regel.id)
                return (
                  <label
                    key={regel.id}
                    className="flex items-center min-h-[44px] gap-3 cursor-pointer rounded-lg px-3 hover:bg-surface-alt transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRegel(regel.id)}
                      className="w-5 h-5 rounded border-ink/30 accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={regel.omschrijving}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink">
                        {regel.omschrijving}
                      </div>
                      <div className="text-xs text-ink-muted">
                        {regel.aantal} {regel.eenheid} × €{regel.eenheidsprijs.toFixed(2)}
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {/* BTW-toggle */}
          <fieldset className="border-t border-ink/10 pt-6">
            <legend className="block text-sm font-medium text-ink mb-4">
              {demoOfferte.btwToggle.label}
            </legend>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRenovatie(false)}
                className={cn(
                  'flex-1 min-h-[44px] rounded-lg font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  !renovatie
                    ? 'bg-primary text-surface'
                    : 'bg-surface text-ink ring-1 ring-inset ring-ink/15 hover:bg-surface-alt'
                )}
              >
                {demoOfferte.btwToggle.tariefStandaard}% {demoOfferte.btwToggle.btwLabel}
              </button>
              <button
                type="button"
                onClick={() => setRenovatie(true)}
                className={cn(
                  'flex-1 min-h-[44px] rounded-lg font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  renovatie
                    ? 'bg-primary text-surface'
                    : 'bg-surface text-ink ring-1 ring-inset ring-ink/15 hover:bg-surface-alt'
                )}
              >
                {demoOfferte.btwToggle.tariefVerlaagd}% {demoOfferte.btwToggle.btwLabel}
              </button>
            </div>
          </fieldset>
        </div>

        {/* Kolom B: Kaart (offerte/werkbon met flip) in telefoonvorm */}
        <div className="flex flex-col gap-6">
          {/* Flip-blok */}
          <DeviceFrame>
            <div
              className="flex h-full flex-col justify-center overflow-y-auto bg-surface-alt p-3"
              style={{ perspective: 1000 }}
            >
            {reduceMotion ? (
              // Directe swap zonder animatie
              <>
                {!flipped && (
                  <OfferteCard
                    klantNaam={demoOfferte.klantNaam}
                    projectNaam={demoOfferte.projectNaam}
                    statusLabel={demoOfferte.offerteStatus}
                    statusTone="neutral"
                    regels={geselecteerdeRegels}
                    totalen={totalen}
                  />
                )}
                {flipped && (
                  <WerkbonCard
                    klantNaam={demoOfferte.klantNaam}
                    projectNaam={demoOfferte.projectNaam}
                    statusLabel={demoOfferte.werkbonStatus}
                    statusTone="neutral"
                    regels={geselecteerdeRegels}
                  />
                )}
              </>
            ) : (
              // Framer Motion flip
              <AnimatePresence mode="wait">
                <motion.div
                  key={flipped ? 'werkbon' : 'offerte'}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {!flipped && (
                    <OfferteCard
                      klantNaam={demoOfferte.klantNaam}
                      projectNaam={demoOfferte.projectNaam}
                      statusLabel={demoOfferte.offerteStatus}
                      statusTone="neutral"
                      regels={geselecteerdeRegels}
                      totalen={totalen}
                    />
                  )}
                  {flipped && (
                    <WerkbonCard
                      klantNaam={demoOfferte.klantNaam}
                      projectNaam={demoOfferte.projectNaam}
                      statusLabel={demoOfferte.werkbonStatus}
                      statusTone="neutral"
                      regels={geselecteerdeRegels}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
            </div>
          </DeviceFrame>

          {/* CTA's */}
          {!flipped ? (
            // Offerte-staat
            <>
              {isEmpty && (
                <p className="text-sm text-ink-muted text-center">
                  {demoOfferte.legeSelectieHint}
                </p>
              )}
              <button
                type="button"
                onClick={() => setFlipped(true)}
                disabled={isEmpty}
                className={cn(
                  'mx-auto w-full max-w-[300px] min-h-[44px] rounded-lg px-6 text-base font-semibold',
                  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isEmpty
                    ? 'bg-primary/50 text-surface cursor-not-allowed'
                    : 'bg-primary text-surface hover:bg-primary-hover'
                )}
              >
                {demoOfferte.flipLabel}
              </button>
            </>
          ) : (
            // Werkbon-staat
            <>
              <div className="mx-auto w-full max-w-[300px] text-center space-y-4">
                <p className="text-sm text-ink-muted">{demoOfferte.outro}</p>
                <Button
                  variant="primary"
                  href={site.cta.primary.href}
                  className="w-full"
                >
                  {site.cta.primary.label}
                </Button>
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  className={cn(
                    'inline-flex items-center min-h-[44px] px-3',
                    'text-sm text-primary font-medium',
                    'transition-colors hover:text-primary-hover',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                  )}
                >
                  ← {demoOfferte.terugLabel}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
