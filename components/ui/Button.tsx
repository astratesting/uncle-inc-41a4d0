import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variants = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 active:bg-indigo-700",
  outline:
    "border border-gray-700 text-gray-200 hover:border-indigo-500 hover:text-indigo-400 bg-transparent",
  ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  danger: "bg-red-600 text-white hover:bg-red-500",
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
            "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-ink disabled:opacity-50 disabled:cursor-not-allowed",
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
