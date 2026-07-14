import type { Metadata } from 'next'
import { LegalPage } from '@/components/ui/LegalPage'
import { privacy } from '@/content/legal'

export const metadata: Metadata = {
  title: `${privacy.title} — Factuurt`,
  description: privacy.description,
}

export default function PrivacyPage() {
  return <LegalPage content={privacy} />
}
