import type { WorkflowRegel } from '@/content/workflow'
import { workflowLabels } from '@/content/workflow'
import { Check, PenLine } from 'lucide-react'
import { MockupChrome } from './MockupChrome'

interface WerkbonCardProps {
  klantNaam: string
  projectNaam: string
  statusLabel: string
  statusTone: 'neutral' | 'success'
  regels: WorkflowRegel[]
}

export function WerkbonCard({
  klantNaam,
  projectNaam,
  statusLabel,
  statusTone,
  regels,
}: WerkbonCardProps) {
  return (
    <MockupChrome
      klantNaam={klantNaam}
      projectNaam={projectNaam}
      statusLabel={statusLabel}
      statusTone={statusTone}
    >
      {/* Checklist */}
      <div className="mb-8">
        <div className="space-y-3">
          {regels.map((regel, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div className="text-sm text-ink-muted">{regel.omschrijving}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature block */}
      <div className="border-t border-ink/10 pt-6">
        <div className="text-xs uppercase tracking-wide text-ink-muted mb-4">
          {workflowLabels.ondertekend}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 p-4 bg-surface-alt rounded-lg flex items-center justify-center">
            <PenLine className="w-6 h-6 text-ink-muted opacity-50" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-ink">{workflowLabels.klant}</div>
            <div className="text-xs text-ink-muted">{workflowLabels.ondertekendTerPlekke}</div>
          </div>
        </div>
      </div>
    </MockupChrome>
  )
}
