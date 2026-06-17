import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-20 overflow-hidden">
      {/* Orbit background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orbit-ring"
          style={{
            width: "800px",
            height: "800px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="orbit-ring"
          style={{
            width: "600px",
            height: "600px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(6, 182, 212, 0.08)",
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
            borderColor: "rgba(20, 184, 166, 0.08)",
          }}
        />
        {/* Orbiting dots */}
        <div
          className="orbit-dot"
          style={{
            top: "calc(50% - 300px)",
            left: "50%",
            animation: "orbit 20s linear infinite",
          }}
        />
        <div
          className="orbit-dot"
          style={{
            top: "calc(50% + 300px)",
            left: "50%",
            animation: "orbit 25s linear infinite reverse",
            background: "var(--color-cyan)",
            boxShadow: "0 0 12px var(--color-cyan-glow)",
          }}
        />
        <div
          className="orbit-dot"
          style={{
            top: "50%",
            left: "calc(50% - 300px)",
            animation: "orbit 15s linear infinite",
            background: "var(--color-teal)",
            boxShadow: "0 0 12px var(--color-teal-glow)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered MVP Development
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
          Validate your startup idea
          <br />
          <span className="gradient-text">in days, not months</span>
        </h1>

        <p className="text-lg text-[#8888a0] max-w-2xl mx-auto mb-10 leading-relaxed">
          Uncle Inc. combines AI-powered prototyping, real user testing, and
          launch analytics in one platform. Go from napkin sketch to validated
          MVP without writing a single line of code.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors text-lg"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[#1e1e2e] hover:border-indigo-500/30 text-[#e4e4ec] font-medium transition-colors text-lg"
          >
            See How It Works
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#8888a0]">
          No credit card required · Free to start
        </p>
      </div>
    </section>
  );
}
