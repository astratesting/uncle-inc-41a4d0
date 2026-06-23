import { ArrowRight, Hammer } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-[120px]" />
        <div className="absolute bottom-20 left-10 h-[400px] w-[400px] rounded-full bg-coral-200/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-honey-200/20 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Coming Soon badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-violet-100 border border-violet-200 px-5 py-2 animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
          </span>
          <span className="text-sm font-heading font-semibold text-violet-700 tracking-wide uppercase">
            Coming Soon
          </span>
        </div>

        {/* Company name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-gray-900 animate-slide-up">
          Uncle Inc.
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-2xl sm:text-3xl font-heading font-bold gradient-violet animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Building Digital Solutions for Modern Problems
        </p>

        {/* Value prop */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
          We are a software development company crafting digital products and
          platforms that help businesses operate smarter and consumers live
          easier. From concept to launch, we turn ambitious ideas into
          real-world solutions.
        </p>

        {/* Forge motif icon */}
        <div className="mt-10 flex justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-coral-500 shadow-lg shadow-violet-500/20">
            <Hammer className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* CTA arrow to waitlist */}
        <div className="mt-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-4 text-lg font-heading font-semibold text-white shadow-lg shadow-violet-600/25 hover:bg-violet-700 hover:shadow-xl transition-all duration-200"
          >
            Get Early Access
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
