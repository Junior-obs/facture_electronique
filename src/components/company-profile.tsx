import { useRef, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, ImageIcon, Trash2, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { companySchema, type CompanyFormData } from "../lib/validations"
import type { CompanyDetails } from "../types"

interface CompanyProfileProps {
  data: CompanyDetails
  onUpdate: (data: CompanyDetails) => void
}

const MAX_LOGO_SIZE = 400

export function CompanyProfile({ data, onUpdate }: CompanyProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
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

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image (PNG, JPG, SVG, WEBP…)")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const src = reader.result as string

      if (file.type === "image/svg+xml") {
        handleChange("logoUrl", src)
        toast.success("Logo téléchargé")
        return
      }

      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > MAX_LOGO_SIZE || height > MAX_LOGO_SIZE) {
          const ratio = Math.min(MAX_LOGO_SIZE / width, MAX_LOGO_SIZE / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          toast.error("Impossible de traiter l'image")
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        handleChange("logoUrl", canvas.toDataURL("image/png"))
        toast.success("Logo téléchargé")
      }
      img.onerror = () => {
        toast.error("Impossible de lire l'image sélectionnée")
      }
      img.src = src
    }
    reader.readAsDataURL(file)
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
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Logo</span>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="h-12 w-12 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                {data.logoUrl ? (
                  <img src={data.logoUrl} alt="Logo de l'entreprise" className="h-full w-full object-contain" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-3.5 w-3.5" />
                  {data.logoUrl ? "Remplacer" : "Télécharger"}
                </Button>
                {data.logoUrl && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleChange("logoUrl", "")}>
                    <Trash2 className="h-3.5 w-3.5" />
                    Retirer
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG, SVG ou WEBP — redimensionnée automatiquement</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
