'use client'
import type { JSX } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { SectionShell } from '@/components/ui/SectionShell'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { offline } from '@/content/offline'
import { resolveIcon } from '@/lib/iconMap'
import { useRevealOnMount } from '@/lib/useRevealOnMount'
import { screenshotPath } from '../../../scripts/screenshot-manifest'

export function Offline(): JSX.Element {
  const revealed = useRevealOnMount()

  return (
    <SectionShell id="offline" variant="white">
      <h2
        className={cn(
          'text-display-sm text-center font-bold tracking-tight text-ink',
          'transition-all duration-700 ease-out motion-reduce:transition-none',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
      >
        {offline.heading}
      </h2>

      {offline.intro.trim().length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-center text-lg text-ink-muted',
            'transition-all duration-700 ease-out motion-reduce:transition-none',
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          {offline.intro}
        </p>
      )}

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
        <DeviceFrame label={offline.imageAlt}>
          <Image
            src={screenshotPath(offline.slug)}
            alt={offline.imageAlt}
            width={390}
            height={844}
            sizes="(min-width: 768px) 300px, 80vw"
            className="h-full w-full object-cover"
          />
        </DeviceFrame>

        <ul className="space-y-8">
          {offline.points.map((point, i) => {
            const Icon = resolveIcon(point.icon)
            return (
              <li
                key={point.icon}
                className={cn(
                  'flex flex-col items-start',
                  'transition-all duration-700 ease-out motion-reduce:transition-none',
                  revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                )}
                style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
              >
                <Icon aria-hidden className="h-8 w-8 text-primary" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-2 text-ink-muted">{point.detail}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionShell>
  )
}
