import { forwardRef, type LabelHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-medium text-muted-foreground tracking-wide uppercase",
          className,
        )}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
    )
  },
)

Label.displayName = "Label"

export { Label }
export type { LabelProps }
