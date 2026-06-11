export interface CompanyDetails {
  name: string
  logoUrl: string
  email: string
  phone: string
  address: string
  signatoryName: string
  signatureLocation: string
}

export interface ClientDetails {
  name: string
  company: string
  email: string
  address: string
  phone: string
}

export interface LineItem {
  id: string
  productName: string
  description: string
  quantity: number
  unitPrice: number
}

export type InvoiceTemplate = "modern" | "classic" | "minimal"

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue"

export interface Invoice {
  id: string
  template: InvoiceTemplate
  invoiceNumber: string
  issueDate: string
  dueDate: string
  currency: string
  notes: string
  company: CompanyDetails
  client: ClientDetails
  items: LineItem[]
  taxRate: number
  status: InvoiceStatus
  updatedAt: number
}

export type InvoiceDraft = Omit<Invoice, "id" | "updatedAt">

export interface InvoiceTotals {
  subtotal: number
  taxAmount: number
  grandTotal: number
}
