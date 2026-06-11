import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { clientSchema, type ClientFormData } from "../lib/validations"
import type { ClientDetails } from "../types"

interface ClientInfoProps {
  data: ClientDetails
  onUpdate: (data: ClientDetails) => void
}

export function ClientInfo({ data, onUpdate }: ClientInfoProps) {
  const {
    register,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: data,
  })

  const handleChange = (field: keyof ClientDetails, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Client
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            id="client-name"
            label="Nom du client"
            placeholder="Moussa Diop"
            {...register("name")}
            error={errors.name?.message}
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="client-company"
              label="Société"
              placeholder="Solutions Numériques SARL"
              {...register("company")}
              value={data.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />
            <Input
              id="client-email"
              label="Email"
              type="email"
              placeholder="moussa@diop.sn"
              {...register("email")}
              error={errors.email?.message}
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <Input
            id="client-address"
            label="Adresse"
            placeholder="Dakar, Almadies"
            {...register("address")}
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            id="client-phone"
            label="Téléphone"
              placeholder="+221 76 123 45 67"
            {...register("phone")}
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
