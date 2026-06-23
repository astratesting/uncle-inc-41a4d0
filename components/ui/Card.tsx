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
          "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200",
          glow && "hover:border-violet-300 hover:shadow-md hover:shadow-violet-100"
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
