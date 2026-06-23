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
          "rounded-xl border border-gray-800 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-200",
          glow && "hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)]",
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
