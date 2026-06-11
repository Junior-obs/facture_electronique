import { useRef, useCallback } from "react"
import { Toaster } from "sonner"
import { motion } from "framer-motion"
import { InvoiceForm } from "./components/invoice-form"
import { InvoicePreview } from "./components/invoice-preview"
import { ThemeToggle } from "./components/theme-toggle"
import { TemplateSelector } from "./components/template-selector"
import { ExportButton } from "./components/export-button"
import { useKeyboardShortcuts, KeyboardShortcutsHint } from "./components/keyboard-shortcuts"
import { useInvoice } from "./hooks/useInvoice"
import { useTheme } from "./hooks/useTheme"
import { Separator } from "./components/ui/separator"

export default function App() {
  const { invoice, updateCompany, updateClient, updateItems, updateField, newInvoice } = useInvoice()
  const { theme, toggleTheme } = useTheme()
  const previewRef = useRef<HTMLDivElement>(null)

  const handleExport = useCallback(() => {
    const btn = document.querySelector("[data-export-btn]") as HTMLButtonElement
    btn?.click()
  }, [])

  useKeyboardShortcuts({
    onNewInvoice: newInvoice,
    onExport: handleExport,
    onToggleTheme: toggleTheme,
  })

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Toaster
        position="top-center"
        theme={theme}
        richColors
        closeButton
      />

      {/* Top Navigation Bar */}
      <header className="no-print flex items-center justify-between px-6 h-12 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight">Facture</span>
          <Separator orientation="vertical" className="h-4" />
          <TemplateSelector value={invoice.template} onChange={(t) => updateField("template", t)} />
        </div>
        <div className="flex items-center gap-3">
          <KeyboardShortcutsHint />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        {/* Left Panel: Form */}
        <motion.div
          className="no-print w-full md:w-[480px] md:min-w-[480px] md:overflow-y-auto border-r border-border"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="px-4 md:px-6 py-5">
            <InvoiceForm
              invoice={invoice}
              updateCompany={updateCompany}
              updateClient={updateClient}
              updateItems={updateItems}
              updateField={updateField}
              onNewInvoice={newInvoice}
              onExport={handleExport}
            />
          </div>
        </motion.div>

        {/* Right Panel: Preview */}
        <motion.div
          className="flex-none md:flex-1 flex flex-col bg-muted-30"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          {/* Preview Toolbar */}
          <div className="no-print flex items-center justify-between px-4 md:px-6 py-3 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500-80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500-80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500-80" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                Aperçu — {invoice.invoiceNumber}
              </span>
            </div>
            <div data-export-btn>
              <ExportButton previewRef={previewRef} fileName={`Facture-${invoice.invoiceNumber}`} />
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-[210mm] mx-auto">
              <InvoicePreview ref={previewRef} invoice={invoice} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
