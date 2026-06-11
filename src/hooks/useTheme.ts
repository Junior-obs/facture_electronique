import { useEffect, useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"

type Theme = "dark" | "light"

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark")

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("dark", "light")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [setTheme])

  return { theme, toggleTheme, setTheme }
}
