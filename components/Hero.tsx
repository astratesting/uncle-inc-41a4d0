import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Compass className="h-[500px] w-[500px] text-indigo-500/5" strokeWidth={0.5} />
        </div>
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-medium text-indigo-300 font-mono">
            AI-POWERED MVP VALIDATION
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
          Validate Before
          <br />
          <span className="gradient-text">You Build</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
          Uncle Inc. is the AI-assisted MVP platform that helps founders test ideas
          with real users before writing a single line of code. Stop building what
          nobody wants.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="min-w-[200px]">
              Start Validating
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Sub-metric */}
        <p className="mt-8 text-xs text-gray-600 font-mono">
          Join early-access founders shaping the future of startup validation
        </p>
      </div>
    </section>
  );
}
