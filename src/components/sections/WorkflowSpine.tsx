'use client'
import type { JSX } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { Button } from '@/components/ui/Button'
import { OfferteCard } from '@/components/mockups/OfferteCard'
import { WerkbonCard } from '@/components/mockups/WerkbonCard'
import { FactuurCard } from '@/components/mockups/FactuurCard'
import { workflow, type WorkflowStepId } from '@/content/workflow'
import { site } from '@/content/site'
import { calcBtwTotalen } from '@/domain/factuur/btwCalculator'
import { resolveIcon } from '@/lib/iconMap'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

/** Crossfade-wrapper per stap; bij reduced-motion een directe swap. */
function StepFade({
  activeStep,
  reduceMotion,
  children,
}: {
  activeStep: WorkflowStepId
  reduceMotion: boolean | null
  children: ReactNode
}): JSX.Element {
  if (reduceMotion) return <div>{children}</div>
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function WorkflowSpine(): JSX.Element {
  const [activeStep, setActiveStep] = useState<WorkflowStepId>('offerte')
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const revealed = useRevealOnMount()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '0px 0px -100px 0px' })
  const prefersReducedMotion = useReducedMotion()

  // Mount gate: SSR renders with motion, then client switches if reduced-motion
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine final motion preference only after mount
  const reduceMotion = mounted && prefersReducedMotion

  // Compute totals once
  const items = useMemo(
    () =>
      workflow.regels.map((r) => ({
        aantal: r.aantal,
        eenheidsprijs: r.eenheidsprijs,
        btw: r.btw,
      })),
    []
  )
  const totalen = useMemo(() => calcBtwTotalen(items), [items])

  // Auto-play interval
  useEffect(() => {
    if (!isInView || isPaused || reduceMotion) return

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === 'offerte') return 'werkbon'
        if (prev === 'werkbon') return 'factuur'
        // Stop at factuur (no endless loop)
        return 'factuur'
      })
    }, 2800)

    return () => clearInterval(interval)
  }, [isInView, isPaused, reduceMotion])

  const handleStepClick = (stepId: WorkflowStepId) => {
    setActiveStep(stepId)
    setIsPaused(true)
  }

  const activeStepContent = workflow.steps.find((s) => s.id === activeStep) ?? workflow.steps[0]

  return (
    <div ref={sectionRef}>
      <SectionShell id="workflow">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        {workflow.heading}
      </h2>

      {workflow.intro.trim().length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-center text-lg text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {workflow.intro}
        </p>
      )}

      {/* Step navigation tabs */}
      <div
        className="mt-12 flex gap-4 justify-center"
        role="tablist"
        aria-label="Workflowstappen"
      >
        {workflow.steps.map((step) => {
          const Icon = resolveIcon(step.icon)
          const isActive = activeStep === step.id

          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`step-${step.id}`}
              onClick={() => handleStepClick(step.id)}
              className={cn(
                'flex flex-col items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg',
                'transition-colors duration-300 motion-reduce:transition-none',
                'font-medium text-sm',
                isActive
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-ink-muted hover:text-ink'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{step.label}</span>
            </button>
          )
        })}
      </div>

      {/* Actieve stap: uitleg + app-getrouwe kaart in telefoonvorm */}
      <div
        id={`step-${activeStep}`}
        role="tabpanel"
        aria-label={activeStepContent.label}
        className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center"
      >
        <StepFade activeStep={activeStep} reduceMotion={reduceMotion}>
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              {activeStepContent.heading}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-ink-muted lg:mx-0">
              {activeStepContent.body}
            </p>
          </div>
        </StepFade>

        <DeviceFrame>
          <div className="flex h-full flex-col justify-center overflow-y-auto bg-surface-alt p-3">
            <StepFade activeStep={activeStep} reduceMotion={reduceMotion}>
              {activeStep === 'offerte' && (
                <OfferteCard
                  klantNaam={workflow.klantNaam}
                  projectNaam={workflow.projectNaam}
                  statusLabel={workflow.steps[0].statusLabel}
                  statusTone={workflow.steps[0].statusTone}
                  regels={workflow.regels}
                  totalen={totalen}
                />
              )}
              {activeStep === 'werkbon' && (
                <WerkbonCard
                  klantNaam={workflow.klantNaam}
                  projectNaam={workflow.projectNaam}
                  statusLabel={workflow.steps[1].statusLabel}
                  statusTone={workflow.steps[1].statusTone}
                  regels={workflow.regels}
                />
              )}
              {activeStep === 'factuur' && (
                <FactuurCard
                  klantNaam={workflow.klantNaam}
                  projectNaam={workflow.projectNaam}
                  statusLabel={workflow.steps[2].statusLabel}
                  statusTone={workflow.steps[2].statusTone}
                  regels={workflow.regels}
                  totalen={totalen}
                />
              )}
            </StepFade>
          </div>
        </DeviceFrame>
      </div>

      {/* Outro text + CTA */}
      <div className="mt-12 text-center">
        <p className="text-ink-muted mb-8 max-w-2xl mx-auto">{workflow.outro}</p>
        <Button variant="primary" href={site.cta.primary.href}>
          {site.cta.primary.label}
        </Button>
      </div>
    </SectionShell>
    </div>
  )
}
