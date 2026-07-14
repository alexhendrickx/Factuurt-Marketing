'use client'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { Button } from '@/components/ui/Button'
import { hero } from '@/content/hero'
import { site } from '@/content/site'
import { useRevealOnMount } from '@/lib/useRevealOnMount'

export function Hero() {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="hero">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Tekstkolom */}
        <div
          className={cn(
            'flex flex-col items-start',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          <h1 className="text-display max-w-2xl font-bold tracking-tight text-ink">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">{hero.subtitle}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="primary" href={site.cta.primary.href}>
              {site.cta.primary.label}
            </Button>
            <Button variant="secondary" href={site.cta.secondary.href}>
              {site.cta.secondary.label}
            </Button>
          </div>
        </div>

        {/* Screenshotkolom */}
        <div
          className={cn(
            'transition-all delay-150 duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          )}
        >
          <DeviceFrame label="Het dashboard van Factuurt op een telefoon">
            <Image
              src="/screenshots/dashboard.png"
              alt="Dashboard van de Factuurt-app met openstaande offertes en facturen"
              width={390}
              height={844}
              sizes="(min-width: 1024px) 300px, 80vw"
              priority
              className="h-full w-full object-cover"
            />
          </DeviceFrame>
        </div>
      </div>
    </SectionShell>
  )
}
