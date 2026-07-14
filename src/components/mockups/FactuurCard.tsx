import type { WorkflowRegel } from '@/content/workflow'
import { workflowLabels } from '@/content/workflow'
import type { BtwTotalen } from '@/domain/factuur/btwCalculator'
import { formatEur } from '@/lib/formatEur'
import { Check } from 'lucide-react'
import { MockupChrome } from './MockupChrome'

interface FactuurCardProps {
  klantNaam: string
  projectNaam: string
  statusLabel: string
  statusTone: 'neutral' | 'success'
  regels: WorkflowRegel[]
  totalen: BtwTotalen
}

export function FactuurCard({
  klantNaam,
  projectNaam,
  statusLabel,
  statusTone,
  regels,
  totalen,
}: FactuurCardProps) {
  return (
    <MockupChrome
      klantNaam={klantNaam}
      projectNaam={projectNaam}
      statusLabel={statusLabel}
      statusTone={statusTone}
    >
      {/* Regels */}
      <div className="mb-6">
        <div className="space-y-3">
          {regels.map((regel, idx) => (
            <div key={idx} className="flex items-start justify-between gap-4 text-sm">
              <div className="flex-1 text-ink-muted">{regel.omschrijving}</div>
              <div className="text-ink-muted text-xs whitespace-nowrap">
                {regel.aantal} {regel.eenheid}
              </div>
              <div className="text-ink font-medium whitespace-nowrap">
                {formatEur(regel.aantal * regel.eenheidsprijs)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals block */}
      <div className="border-t border-ink/10 pt-4 space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">{workflowLabels.subtotaal}</span>
          <span className="text-ink font-medium">{formatEur(totalen.subtotaal)}</span>
        </div>

        {Array.from(totalen.btwPerTarief.entries()).map(([tarief, bedrag]) => (
          <div key={tarief} className="flex justify-between text-sm">
            <span className="text-ink-muted">{workflowLabels.btwPrefix} {tarief}%</span>
            <span className="text-ink font-medium">{formatEur(bedrag)}</span>
          </div>
        ))}

        <div className="flex justify-between text-base font-semibold pt-2 border-t border-ink/10">
          <span className="text-ink">{workflowLabels.totaal}</span>
          <span className="text-ink">{formatEur(totalen.totaal)}</span>
        </div>
      </div>

      {/* Payment status — sourced from same statusLabel as MockupChrome */}
      <div className="border-t border-ink/10 pt-4 flex items-center gap-3">
        <Check className="w-5 h-5 text-success flex-shrink-0" />
        <div className="text-sm font-medium text-success">{statusLabel}</div>
      </div>
    </MockupChrome>
  )
}
