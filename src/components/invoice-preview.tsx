import { forwardRef } from "react"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { calculateTotals, formatCurrency } from "../lib/utils"
import type { InvoiceState } from "../hooks/useInvoice"
import type { InvoiceTemplate } from "../types"

interface InvoicePreviewProps {
  invoice: InvoiceState
}

const TemplateStyles: Record<InvoiceTemplate, {
  headerClass: string
  accentClass: string
  borderClass: string
}> = {
  modern: {
    headerClass: "bg-primary-5 border-l-4 border-primary",
    accentClass: "text-primary",
    borderClass: "border-border",
  },
  classic: {
    headerClass: "border-b-2 border-foreground-20",
    accentClass: "text-foreground",
    borderClass: "border-foreground-10",
  },
  minimal: {
    headerClass: "",
    accentClass: "text-muted-foreground",
    borderClass: "border-transparent",
  },
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice }, ref) => {
    const totals = calculateTotals(invoice.items, invoice.taxRate)
    const style = TemplateStyles[invoice.template]

    return (
      <div ref={ref} className="bg-white text-black">
        <div className="p-8 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-between items-start">
            <div>
              {invoice.company.name && (
                <h1 className="text-xl font-bold text-gray-900">{invoice.company.name}</h1>
              )}
              {invoice.company.logoUrl && (
                <img
                  src={invoice.company.logoUrl}
                  alt={invoice.company.name}
                  className="h-10 mt-2 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              )}
            </div>
            <Badge status={invoice.status} />
          </div>

          {/* Invoice Title */}
          <div className={`p-4 rounded-lg ${style.headerClass}`}>
            <h2 className="text-2xl font-bold text-gray-900">FACTURE</h2>
            <p className="text-sm text-gray-500 mt-0.5">{invoice.invoiceNumber}</p>
          </div>

          {/* Dates & Currency */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Date d'émission</p>
              <p className="text-gray-800 font-medium mt-1">
                {new Date(invoice.issueDate).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Date d'échéance</p>
              <p className="text-gray-800 font-medium mt-1">
                {new Date(invoice.dueDate).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Devise</p>
              <p className="text-gray-800 font-medium mt-1">{invoice.currency}</p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Company & Client */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">De</p>
              <div className="text-sm text-gray-800 space-y-0.5">
                <p className="font-semibold">{invoice.company.name || "Votre entreprise"}</p>
                {invoice.company.email && <p>{invoice.company.email}</p>}
                {invoice.company.phone && <p>{invoice.company.phone}</p>}
                {invoice.company.address && <p className="text-gray-500">{invoice.company.address}</p>}
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Facturé à</p>
              <div className="text-sm text-gray-800 space-y-0.5">
                <p className="font-semibold">{invoice.client.name || "Nom du client"}</p>
                {invoice.client.company && <p>{invoice.client.company}</p>}
                {invoice.client.email && <p>{invoice.client.email}</p>}
                {invoice.client.address && <p className="text-gray-500">{invoice.client.address}</p>}
                {invoice.client.phone && <p>{invoice.client.phone}</p>}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Line Items Table */}
          <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-400 text-xs font-medium uppercase tracking-wide">Produit</th>
                <th className="text-left py-2 text-gray-400 text-xs font-medium uppercase tracking-wide">Description</th>
                <th className="text-center py-2 text-gray-400 text-xs font-medium uppercase tracking-wide">Qté</th>
                <th className="text-right py-2 text-gray-400 text-xs font-medium uppercase tracking-wide">Prix unit.</th>
                <th className="text-right py-2 text-gray-400 text-xs font-medium uppercase tracking-wide">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Aucun article ajouté
                  </td>
                </tr>
              ) : (
                invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-3 text-gray-800 font-medium">{item.productName || "—"}</td>
                    <td className="py-3 text-gray-500 text-sm">{item.description || "—"}</td>
                    <td className="py-3 text-center text-gray-800">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-800">
                      {formatCurrency(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="py-3 text-right font-medium text-gray-900">
                      {formatCurrency(item.quantity * item.unitPrice, invoice.currency)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Sous-total</span>
                <span>{formatCurrency(totals.subtotal, invoice.currency)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>TVA ({invoice.taxRate}%)</span>
                  <span>{formatCurrency(totals.taxAmount, invoice.currency)}</span>
                </div>
              )}
              <Separator className="bg-gray-200" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(totals.grandTotal, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">Notes / Instructions</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
              </div>
            </>
          )}

          {/* Signature */}
          {(invoice.company.signatoryName || invoice.company.signatureLocation) && (
            <>
              <Separator className="bg-gray-200" />
              <div className="flex justify-between items-end pt-2">
                <div className="text-sm text-gray-700">
                  {invoice.company.signatureLocation && invoice.company.signatoryName && (
                    <p>
                      Fait à {invoice.company.signatureLocation}, le{" "}
                      {new Date(invoice.issueDate).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {invoice.company.signatoryName && (
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{invoice.company.signatoryName}</p>
                      <div className="mt-2 w-48 h-12 border-b-2 border-gray-300" />
                      <p className="text-[10px] text-gray-400 mt-1">Signature</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
            <p>Merci pour votre confiance</p>
          </div>
        </div>
      </div>
    )
  },
)

InvoicePreview.displayName = "InvoicePreview"

export { InvoicePreview }
