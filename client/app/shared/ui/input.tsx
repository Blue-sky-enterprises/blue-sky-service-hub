import * as React from "react"
import { cn } from "@/app/core/utils"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // BASE
        "flex h-9 w-full min-w-0 rounded-bs-md border bg-transparent px-3 py-1 text-sm transition-all outline-none bs-input",

        // BLUESKY THEME STYLES
        "border-bs-border bg-bs-bg text-bs-primary placeholder:text-bs-secondary",

        // FOCUS STATE
        "focus-visible:border-bs-accent focus-visible:shadow-[0_0_0_3px_rgba(124,92,252,0.15)]",

        // DISABLED
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // INVALID STATE
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",

        // DARK MODE SUPPORT
        "dark:bg-[#0A0812] dark:border-[#2A2740] dark:text-[#F0EEFF]",

        className
      )}
      {...props}
    />
  )
}

export { Input }