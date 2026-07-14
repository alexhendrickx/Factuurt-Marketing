import type { Metadata } from 'next'
import { LegalPage } from '@/components/ui/LegalPage'
import { voorwaarden } from '@/content/legal'

export const metadata: Metadata = {
  title: `${voorwaarden.title} — Factuurt`,
  description: voorwaarden.description,
}

export default function VoorwaardenPage() {
  return <LegalPage content={voorwaarden} />
}
