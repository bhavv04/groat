// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-100 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          `border border-black/60 bg-gradient-to-b from-neutral-800 to-black text-white hover:from-neutral-700 hover:to-neutral-900
           shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.25)]
           active:scale-[0.98]
           active:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(0,0,0,0.4)]`,
        github:
          `border border-black/60 bg-gradient-to-b from-gray-800 to-gray-900 text-white
           shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.25)]
           active:scale-[0.98]
           active:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(0,0,0,0.4)]
           dark:border-white/20 dark:from-gray-50 dark:to-gray-200 dark:text-gray-900
           dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.15)]
           dark:active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]`,
        outline:
          `border border-border bg-bg-elevated text-text hover:bg-muted
           shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.04)]
           active:scale-[0.98]
           active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]
           dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.2)]
           dark:active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]`,
        ghost:
          `text-text-muted hover:text-text hover:bg-bg-elevated
           active:scale-[0.98]`,
        muted:
          `border border-border bg-muted text-text-muted hover:text-text hover:bg-bg-elevated
           shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
           active:scale-[0.98]
           dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`,
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3",
        lg: "h-12 px-6",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };