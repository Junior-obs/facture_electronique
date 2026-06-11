import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { companySchema, type CompanyFormData } from "../lib/validations"
import type { CompanyDetails } from "../types"

interface CompanyProfileProps {
  data: CompanyDetails
  onUpdate: (data: CompanyDetails) => void
}

export function CompanyProfile({ data, onUpdate }: CompanyProfileProps) {
  const {
    register,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: data,
  })

  const handleChange = (field: keyof CompanyDetails, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            Entreprise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            id="company-name"
            label="Nom de l'entreprise"
            placeholder="Ma Société SARL"
            {...register("name")}
            error={errors.name?.message}
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            id="company-logo"
            label="URL du logo"
            placeholder="https://example.com/logo.png"
            {...register("logoUrl")}
            value={data.logoUrl}
            onChange={(e) => handleChange("logoUrl", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="company-email"
              label="Email"
              type="email"
              placeholder="contact@entreprise.sn"
              {...register("email")}
              error={errors.email?.message}
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              id="company-phone"
              label="Téléphone"
              placeholder="+221 77 123 45 67"
              {...register("phone")}
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <Input
            id="company-address"
            label="Adresse"
            placeholder="Dakar, Sénégal"
            {...register("address")}
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="signatory-name"
              label="Nom du signataire"
              placeholder="Mamadou Diallo"
              {...register("signatoryName")}
              value={data.signatoryName}
              onChange={(e) => handleChange("signatoryName", e.target.value)}
            />
            <Input
              id="signature-location"
              label="Lieu de signature"
              placeholder="Dakar"
              {...register("signatureLocation")}
              value={data.signatureLocation}
              onChange={(e) => handleChange("signatureLocation", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
