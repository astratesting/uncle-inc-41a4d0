import { cn } from "@/lib/utils";

interface AuthFormCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthFormCard({
  title,
  subtitle,
  children,
  className,
}: AuthFormCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-ink">
      {/* Background orbit decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="orbit-ring"
          style={{
            width: "600px",
            height: "600px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="orbit-ring"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(6, 182, 212, 0.1)",
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,0.4)]"
          style={{
            top: "calc(50% - 200px)",
            left: "50%",
            animation: "orbit 20s linear infinite",
          }}
        />
      </div>

      <div
        className={cn(
          "relative w-full max-w-md p-8 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(79,70,229,0.05)] animate-fade-in",
          className
        )}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">Uncle Inc.</span>
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-center mb-1">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[#8888a0] text-center mb-6">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
