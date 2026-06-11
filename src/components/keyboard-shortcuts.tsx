import { useEffect } from "react"
import { Command } from "lucide-react"

interface KeyboardShortcutsProps {
  onNewInvoice: () => void
  onExport: () => void
  onToggleTheme: () => void
}

export function useKeyboardShortcuts({ onNewInvoice, onExport, onToggleTheme }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key === "n") {
        e.preventDefault()
        onNewInvoice()
      }
      if (mod && e.key === "e") {
        e.preventDefault()
        onExport()
      }
      if (mod && e.key === "\\") {
        e.preventDefault()
        onToggleTheme()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onNewInvoice, onExport, onToggleTheme])
}

export function KeyboardShortcutsHint() {
  return (
    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1">
        <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-border bg-muted text-[10px] font-medium">
          <Command className="h-2.5 w-2.5" />
        </kbd>
        <span>N</span>
        <span className="ml-0.5">Nouvelle</span>
      </span>
      <span className="flex items-center gap-1">
        <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-border bg-muted text-[10px] font-medium">
          <Command className="h-2.5 w-2.5" />
        </kbd>
        <span>E</span>
        <span className="ml-0.5">Exporter</span>
      </span>
      <span className="flex items-center gap-1">
        <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-border bg-muted text-[10px] font-medium">
          <Command className="h-2.5 w-2.5" />
        </kbd>
        <span>\</span>
        <span className="ml-0.5">Thème</span>
      </span>
    </div>
  )
}
