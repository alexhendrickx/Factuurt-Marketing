'use client'
import type { JSX } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { features } from '@/content/features'
import { resolveIcon } from '@/lib/iconMap'
import { useRevealOnMount } from '@/lib/useRevealOnMount'
import { screenshotPath } from '../../../scripts/screenshot-manifest'

export function FeatureGrid(): JSX.Element {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="features" variant="alt">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        {features.heading}
      </h2>

      {features.intro.trim().length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-center text-lg text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          {features.intro}
        </p>
      )}

      <ul className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-2">
        {features.features.map((feature, i) => {
          const Icon = resolveIcon(feature.icon)
          return (
            <li
              key={feature.slug}
              className={cn(
                'flex flex-col items-start',
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
            >
              <DeviceFrame label={feature.imageAlt}>
                <Image
                  src={screenshotPath(feature.slug)}
                  alt={feature.imageAlt}
                  width={390}
                  height={844}
                  sizes="(min-width: 768px) 300px, 80vw"
                  className="h-full w-full object-cover"
                />
              </DeviceFrame>
              <Icon aria-hidden className="mt-6 h-8 w-8 text-primary" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-ink-muted">{feature.detail}</p>
            </li>
          )
        })}
      </ul>
    </SectionShell>
  )
}
