import { cn } from "../../lib/utils"
import type { InvoiceStatus } from "../../types"

interface BadgeProps {
  status: InvoiceStatus
  className?: string
}

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  draft: {
    label: "Brouillon",
    className: "bg-muted text-muted-foreground",
  },
  pending: {
    label: "En attente",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  paid: {
    label: "Payée",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  overdue: {
    label: "En retard",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
}

export function Badge({ status, className }: BadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
