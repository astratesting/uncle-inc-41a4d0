import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variants = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/25 active:bg-violet-800",
  coral:
    "bg-coral-500 text-white hover:bg-coral-600 shadow-lg shadow-coral-500/25 active:bg-coral-700",
  outline:
    "border border-violet-300 text-violet-700 hover:bg-violet-50 bg-transparent",
  ghost: "text-gray-500 hover:text-gray-800 hover:bg-gray-100",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-warm-offwhite disabled:opacity-50 disabled:cursor-not-allowed",
            variants[variant],
            sizes[size]
          ),
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
