import { Layout, FileText, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import type { InvoiceTemplate } from "../types"

interface TemplateSelectorProps {
  value: InvoiceTemplate
  onChange: (template: InvoiceTemplate) => void
}

const templates: { value: InvoiceTemplate; label: string; icon: typeof Layout }[] = [
  { value: "modern", label: "Moderne", icon: Layout },
  { value: "classic", label: "Classique", icon: FileText },
  { value: "minimal", label: "Minimal", icon: Minus },
]

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {templates.map((template) => {
        const Icon = template.icon
        const isActive = value === template.value
        return (
          <Button
            key={template.value}
            variant={isActive ? "primary" : "ghost"}
            size="sm"
            onClick={() => onChange(template.value)}
            className="relative text-xs"
            aria-label={`Modèle ${template.label.toLowerCase()}`}
          >
            {isActive && (
              <motion.div
                layoutId="template-indicator"
                className="absolute inset-0 rounded-md bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" />
              {template.label}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
