import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LineItem, InvoiceTotals } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  const localeMap: Record<string, string> = {
    XOF: "fr-FR",
    EUR: "fr-FR",
    USD: "en-US",
    GBP: "en-GB",
    XAF: "fr-FR",
    CDF: "fr-CD",
    MAD: "ar-MA",
    GHS: "en-GH",
    NGN: "en-NG",
    ZAR: "en-ZA",
    KES: "en-KE",
    TZS: "en-TZ",
    RWF: "en-RW",
    UGX: "en-UG",
  }

  const locale = localeMap[currency] ?? "en-US"

  const currencyDisplayMap: Record<string, string> = {
    XOF: "CFA",
    XAF: "FCFA",
    CDF: "FC",
    MAD: "MAD",
    GHS: "GH₵",
    NGN: "₦",
    ZAR: "R",
    KES: "KSh",
    TZS: "TSh",
    RWF: "FRw",
    UGX: "USh",
  }

  const symbol = currencyDisplayMap[currency]

  if (symbol) {
    try {
      const formatted = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
      return `${symbol} ${formatted}`
    } catch {
      return `${symbol} ${amount.toLocaleString()}`
    }
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount.toLocaleString()} ${currency}`
  }
}

export function calculateTotals(items: LineItem[], taxRate: number): InvoiceTotals {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const grandTotal = subtotal + taxAmount

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  }
}

export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 90000) + 10000
  return `INV-${year}-${random}`
}

export function getDefaultIssueDate(): string {
  return new Date().toISOString().split("T")[0]
}

export function getDefaultDueDate(): string {
  const date = new Date()
  date.setDate(date.getDate() + 30)
  return date.toISOString().split("T")[0]
}
