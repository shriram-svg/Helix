"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-helix-green/30 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "bg-helix-green text-white hover:bg-green-700 active:bg-green-800",
        outline:
          "border border-helix-border text-helix-black hover:border-helix-green hover:text-helix-green bg-transparent",
        ghost:
          "text-helix-silver hover:text-helix-black hover:bg-helix-bg bg-transparent",
        soft: "bg-helix-green/10 text-helix-green hover:bg-helix-green/20",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-md",
      },
      size: {
        sm: "text-xs px-3 py-1.5 gap-1.5",
        md: "text-sm px-4 py-2 gap-2",
        lg: "text-base px-6 py-3 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "solid",
      shape: "rounded",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  variant,
  shape,
  size,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonVariants({ variant, shape, size })} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
