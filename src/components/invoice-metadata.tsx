import { FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Select } from "./ui/select"
import { Label } from "./ui/label"
import type { InvoiceState } from "../hooks/useInvoice"

interface InvoiceMetadataProps {
  data: Pick<InvoiceState, "invoiceNumber" | "issueDate" | "dueDate" | "currency" | "notes" | "taxRate">
  onUpdate: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
}

const currencies = [
  { value: "XOF", label: "XOF — Franc CFA (BCEAO)" },
  { value: "XAF", label: "XAF — Franc CFA (BEAC)" },
  { value: "CDF", label: "CDF — Franc congolais" },
  { value: "MAD", label: "MAD — Dirham marocain" },
  { value: "GHS", label: "GHS — Cedi ghanéen" },
  { value: "NGN", label: "NGN — Naira nigérian" },
  { value: "ZAR", label: "ZAR — Rand sud-africain" },
  { value: "KES", label: "KES — Shilling kényan" },
  { value: "TZS", label: "TZS — Shilling tanzanien" },
  { value: "RWF", label: "RWF — Franc rwandais" },
  { value: "UGX", label: "UGX — Shilling ougandais" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "USD", label: "USD — Dollar américain" },
  { value: "GBP", label: "GBP — Livre sterling" },
]

export function InvoiceMetadata({ data, onUpdate }: InvoiceMetadataProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Détails de la facture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="invoice-number"
              label="Numéro de facture"
              value={data.invoiceNumber}
              onChange={(e) => onUpdate("invoiceNumber", e.target.value)}
            />
            <Select
              id="currency"
              label="Devise"
              value={data.currency}
              onChange={(e) => onUpdate("currency", e.target.value)}
              options={currencies}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="issue-date"
              label="Date d'émission"
              type="date"
              value={data.issueDate}
              onChange={(e) => onUpdate("issueDate", e.target.value)}
            />
            <Input
              id="due-date"
              label="Date d'échéance"
              type="date"
              value={data.dueDate}
              onChange={(e) => onUpdate("dueDate", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tax-rate">TVA / Taux d'imposition (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={data.taxRate || ""}
              onChange={(e) => onUpdate("taxRate", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes / Instructions</Label>
            <textarea
              id="notes"
              value={data.notes}
              onChange={(e) => onUpdate("notes", e.target.value)}
              placeholder="Conditions de paiement, informations supplémentaires..."
              className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none transition-colors"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
