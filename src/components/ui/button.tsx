import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        luxury: "bg-primary text-primary-foreground hover:bg-emerald-light shadow-medium hover:shadow-strong hover:scale-105 font-semibold tracking-wide before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#d4af37] before:to-emerald before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-700 before:ease-out",
        elegant: "bg-primary text-primary-foreground hover:bg-emerald-light shadow-soft hover:shadow-medium hover:scale-105",
        liquid: "bg-primary text-primary-foreground shadow-medium hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#d4af37] before:via-emerald before:to-[#d4af37] before:translate-y-[100%] hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-in-out after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-700",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-lg px-10 text-base",
        xl: "h-16 rounded-lg px-12 text-lg",
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
