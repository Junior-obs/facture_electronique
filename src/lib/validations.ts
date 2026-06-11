import { z } from "zod"

export const lineItemSchema = z.object({
  id: z.string(),
  productName: z.string().min(1, "Le nom du produit est requis"),
  description: z.string().optional(),
  quantity: z.coerce.number().min(0, "Doit être 0 ou plus").positive("Doit être supérieur à 0"),
  unitPrice: z.coerce.number().min(0, "Doit être 0 ou plus"),
})

export const companySchema = z.object({
  name: z.string().min(1, "Le nom de l'entreprise est requis"),
  logoUrl: z.string().optional(),
  email: z.string().email("Email invalide").or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  signatoryName: z.string().optional(),
  signatureLocation: z.string().optional(),
})

export const clientSchema = z.object({
  name: z.string().min(1, "Le nom du client est requis"),
  company: z.string().optional(),
  email: z.string().email("Email invalide").or(z.literal("")),
  address: z.string().optional(),
  phone: z.string().optional(),
})

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Le numéro de facture est requis"),
  issueDate: z.string().min(1, "La date d'émission est requise"),
  dueDate: z.string().min(1, "La date d'échéance est requise"),
  currency: z.string().min(1, "La devise est requise"),
  notes: z.string().optional(),
  taxRate: z.coerce.number().min(0, "Le taux ne peut pas être négatif").max(100, "Le taux ne peut pas dépasser 100"),
})

export type LineItemFormData = z.infer<typeof lineItemSchema>
export type CompanyFormData = z.infer<typeof companySchema>
export type ClientFormData = z.infer<typeof clientSchema>
export type InvoiceFormData = z.infer<typeof invoiceSchema>
