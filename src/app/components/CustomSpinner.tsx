import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin-steps text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-16",
      large: "size-20",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function CustomSpinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      {/* <Loader className={cn(loaderVariants({ size }), className)} /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(loaderVariants({ size }), className)}
      >
        <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" opacity="1" />
        <line x1="2" x2="6" y1="12" y2="12" opacity="0.8" />
        <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" opacity="0.7" />
        <line x1="12" x2="12" y1="18" y2="22" opacity="0.6" />
        <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" opacity="0.5" />
        <line x1="18" x2="22" y1="12" y2="12" opacity="0.4" />
        <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" opacity="0.2" />
        <line x1="12" x2="12" y1="2" y2="6" opacity="0.1" />
      </svg>
      {children}
    </span>
  );
}
