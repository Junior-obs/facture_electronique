import { useState, useRef } from "react"
import { Download, Loader2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface ExportButtonProps {
  previewRef: React.RefObject<HTMLDivElement | null>
  fileName: string
}

export function ExportButton({ previewRef, fileName }: ExportButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleExport = async () => {
    setState("loading")

    try {
      const element = previewRef.current
      if (!element) {
        toast.error("Erreur", { description: "Aperçu non disponible" })
        setState("idle")
        return
      }

      element.scrollIntoView({ behavior: "instant", block: "start" })
      await new Promise((r) => setTimeout(r, 100))

      const html2canvasModule = await import("html2canvas")
      const html2canvas = html2canvasModule.default
      const { jsPDF } = await import("jspdf")

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const pageHeight = 297

      const pdf = new jsPDF("p", "mm", "a4")

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      } else {
        let heightLeft = imgHeight
        let position = 0
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
        while (heightLeft > 0) {
          position -= pageHeight
          pdf.addPage()
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
      }

      pdf.save(`${fileName}.pdf`)

      setState("success")
      toast.success("Facture exportée avec succès", {
        description: `Téléchargement de ${fileName}.pdf`,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error("PDF export error:", err)
      toast.error("Erreur d'export", {
        description: message.length > 80 ? message.slice(0, 80) + "…" : message,
      })
      setState("idle")
      return
    }

    timeoutRef.current = setTimeout(() => {
      setState("idle")
    }, 2500)
  }

  return (
    <Button
      onClick={handleExport}
      disabled={state === "loading"}
      className="relative min-w-[180px]"
      size="lg"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Télécharger PDF
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Génération du PDF...
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Exporté !
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
