import { forwardRef, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-charcoal-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            clsx(
              "w-full rounded-lg border bg-charcoal-800/50 px-4 py-2.5 text-sm text-ivory placeholder-charcoal-500 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
              error
                ? "border-red-500 focus:ring-red-500/50"
                : "border-charcoal-700 hover:border-charcoal-600"
            ),
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
