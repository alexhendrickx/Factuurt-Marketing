import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { site } from '@/content/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.meta.title,
  description: site.meta.description,
  keywords: site.meta.keywords,
  applicationName: site.brand.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: site.url,
    siteName: site.brand.name,
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: { index: true, follow: true },
}

/** Structured data — helpt Google de app te begrijpen (PLAN §9). */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: site.brand.name,
  description: site.meta.description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  url: site.url,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
