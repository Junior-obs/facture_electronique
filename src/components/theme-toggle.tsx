import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

interface ThemeToggleProps {
  theme: "dark" | "light"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="relative"
      aria-label={`Passer en mode ${theme === "dark" ? "clair" : "sombre"}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </motion.div>
    </Button>
  )
}
