import { type HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ className, glow, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-xl border border-charcoal-700 bg-charcoal-800/50 p-6 backdrop-blur-sm transition-all duration-200",
          glow &&
            "hover:border-gold/30 hover:shadow-[0_0_20px_rgba(184,168,138,0.08)]"
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
