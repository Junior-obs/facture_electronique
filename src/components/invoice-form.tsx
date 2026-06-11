import { FileDown, Plus } from "lucide-react"
import { CompanyProfile } from "./company-profile"
import { ClientInfo } from "./client-info"
import { LineItems } from "./line-items"
import { InvoiceMetadata } from "./invoice-metadata"
import { Button } from "./ui/button"
import type { InvoiceState } from "../hooks/useInvoice"

interface InvoiceFormProps {
  invoice: InvoiceState
  updateCompany: (data: InvoiceState["company"]) => void
  updateClient: (data: InvoiceState["client"]) => void
  updateItems: (items: InvoiceState["items"]) => void
  updateField: <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => void
  onNewInvoice: () => void
  onExport: () => void
}

export function InvoiceForm({
  invoice,
  updateCompany,
  updateClient,
  updateItems,
  updateField,
  onNewInvoice,
  onExport,
}: InvoiceFormProps) {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Nouvelle facture</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Remplissez les détails ci-dessous — l'aperçu se met à jour en temps réel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onNewInvoice}>
            <Plus className="h-3.5 w-3.5" />
            Nouvelle
          </Button>
          <Button size="sm" onClick={onExport}>
            <FileDown className="h-3.5 w-3.5" />
            Exporter
          </Button>
        </div>
      </div>

      <CompanyProfile data={invoice.company} onUpdate={updateCompany} />
      <ClientInfo data={invoice.client} onUpdate={updateClient} />
      <InvoiceMetadata
        data={{
          invoiceNumber: invoice.invoiceNumber,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate,
          currency: invoice.currency,
          notes: invoice.notes,
          taxRate: invoice.taxRate,
        }}
        onUpdate={updateField}
      />
      <LineItems items={invoice.items} currency={invoice.currency} onUpdate={updateItems} />
    </div>
  )
}
