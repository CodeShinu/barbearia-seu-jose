import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-widest",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-forest-deep hover:bg-cream hover:text-forest-deep shadow-lg shadow-gold/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-gold text-gold hover:bg-gold hover:text-forest-deep",
        secondary: "bg-brick text-cream hover:bg-brick/80",
        ghost: "hover:bg-gold/10 hover:text-gold",
        link: "text-gold underline-offset-4 hover:underline",
        premium:
          "bg-gold-gradient text-forest-deep shadow-xl shadow-gold/30 hover:scale-105 active:scale-95 transition-transform",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
