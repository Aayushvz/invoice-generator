import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Mapped onto the tool's control tokens rather than shadcn's defaults.
 *
 * The scale is: one radius (--cg-control-radius), one button height
 * (--cg-control-h), one label size and weight. Before this the app had
 * rounded-md at three heights (40/36/44) and a 14px label, none of which
 * matched the toolbar, the panels or each other, which is most of why the
 * controls read as a different product from the chrome around them.
 *
 * No focus ring here: .cgShell *:focus-visible draws a single accent
 * outline, and this used to add a second one underneath it.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--cg-control-radius)] text-[length:var(--cg-control-label-size)] font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--cg-accent)] text-[var(--cg-accent-fg)] hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[var(--cg-line)] bg-transparent text-[var(--cg-fg)] hover:border-[var(--cg-fg-2)]",
        secondary:
          "bg-[var(--cg-field)] text-[var(--cg-fg)] hover:bg-[var(--cg-line-2)]",
        ghost:
          "text-[var(--cg-fg-2)] hover:bg-[var(--cg-line-2)] hover:text-[var(--cg-fg)]",
        /*
         * Was text-primary + underline. In this panel that produced a row
         * of full-size accent-coloured sentences ("Add Custom Input",
         * "+ Discount + Tax + Shipping") that shouted louder than the
         * fields they belonged to and wrapped onto two lines. A quiet
         * control that gains its accent on hover reads as secondary, which
         * is what these are.
         */
        link: "h-auto px-0 text-[var(--cg-fg-2)] hover:text-[var(--cg-accent)]",
      },
      size: {
        default: "h-[var(--cg-control-h)] px-[var(--cg-control-pad-x)]",
        sm: "h-8 px-3",
        lg: "h-[var(--cg-control-h)] px-6",
        icon: "h-[var(--cg-control-h)] w-[var(--cg-control-h)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
