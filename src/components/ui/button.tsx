import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(16,121,91,0.3)] hover:shadow-[0_0_30px_rgba(16,121,91,0.5)] relative before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none hover:brightness-110",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] relative before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
        outline: "border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40 text-foreground shadow-[0_0_15px_rgba(16,121,91,0.2)] hover:shadow-[0_0_25px_rgba(16,121,91,0.4)] relative before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] relative before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        luxury: "bg-primary text-primary-foreground hover:bg-primary shadow-[0_0_25px_rgba(16,121,91,0.4)] hover:shadow-[0_0_40px_rgba(16,121,91,0.6)] hover:scale-105 font-semibold tracking-wide relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/25 before:to-transparent before:pointer-events-none hover:brightness-115",
        elegant: "bg-primary text-primary-foreground hover:bg-primary shadow-[0_0_20px_rgba(16,121,91,0.35)] hover:shadow-[0_0_35px_rgba(16,121,91,0.55)] hover:scale-105 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none hover:brightness-110",
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
