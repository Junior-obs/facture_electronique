import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline"
  size?: "sm" | "md" | "lg" | "icon"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
          variant === "primary" && "bg-primary text-primary-foreground hover:brightness-110 active:brightness-90",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-accent active:bg-accent/80",
          variant === "ghost" && "text-foreground hover:bg-accent active:bg-accent/80",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:brightness-110 active:brightness-90",
          variant === "outline" && "border border-border bg-transparent hover:bg-accent active:bg-accent/80",
          size === "sm" && "h-8 px-3 text-xs rounded-md",
          size === "md" && "h-9 px-4 text-sm rounded-lg",
          size === "lg" && "h-10 px-5 text-sm rounded-lg",
          size === "icon" && "h-9 w-9 rounded-lg",
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

export { Button }
export type { ButtonProps }
