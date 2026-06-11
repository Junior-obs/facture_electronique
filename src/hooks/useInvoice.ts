import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { generateInvoiceNumber, getDefaultIssueDate, getDefaultDueDate } from "../lib/utils"
import type { CompanyDetails, ClientDetails, LineItem, InvoiceTemplate, InvoiceStatus } from "../types"

export interface InvoiceState {
  company: CompanyDetails
  client: ClientDetails
  items: LineItem[]
  invoiceNumber: string
  issueDate: string
  dueDate: string
  currency: string
  notes: string
  taxRate: number
  template: InvoiceTemplate
  status: InvoiceStatus
}

const defaultCompany: CompanyDetails = {
  name: "",
  logoUrl: "",
  email: "",
  phone: "",
  address: "",
  signatoryName: "",
  signatureLocation: "",
}

const defaultClient: ClientDetails = {
  name: "",
  company: "",
  email: "",
  address: "",
  phone: "",
}

const defaultInvoice: InvoiceState = {
  company: defaultCompany,
  client: defaultClient,
  items: [],
  invoiceNumber: generateInvoiceNumber(),
  issueDate: getDefaultIssueDate(),
  dueDate: getDefaultDueDate(),
  currency: "XOF",
  notes: "",
  taxRate: 0,
  template: "modern",
  status: "draft",
}

export function useInvoice() {
  const [invoice, setInvoice, clearInvoice] = useLocalStorage<InvoiceState>("invoice-draft", defaultInvoice)

  const updateCompany = useCallback(
    (company: CompanyDetails) => {
      setInvoice((prev) => ({ ...prev, company }))
    },
    [setInvoice],
  )

  const updateClient = useCallback(
    (client: ClientDetails) => {
      setInvoice((prev) => ({ ...prev, client }))
    },
    [setInvoice],
  )

  const updateItems = useCallback(
    (items: LineItem[]) => {
      setInvoice((prev) => ({ ...prev, items }))
    },
    [setInvoice],
  )

  const updateField = useCallback(
    <K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) => {
      setInvoice((prev) => ({ ...prev, [key]: value }))
    },
    [setInvoice],
  )

  const resetInvoice = useCallback(() => {
    clearInvoice()
  }, [clearInvoice])

  const newInvoice = useCallback(() => {
    setInvoice({
      ...defaultInvoice,
      invoiceNumber: generateInvoiceNumber(),
      issueDate: getDefaultIssueDate(),
      dueDate: getDefaultDueDate(),
      company: invoice.company,
    })
  }, [setInvoice, invoice.company])

  return {
    invoice,
    setInvoice,
    updateCompany,
    updateClient,
    updateItems,
    updateField,
    resetInvoice,
    newInvoice,
  }
}
