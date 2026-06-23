import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

const benefits = [
  "AI-powered market analysis in minutes",
  "Real user testing with structured feedback",
  "Interactive prototypes without code",
  "Data-driven decisions on what to build next",
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-burgundy/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs font-medium text-gold tracking-wider uppercase">
            Coming Soon
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-ivory">
          Validate Before
          <br />
          <span className="text-gradient-gold">You Build</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-charcoal-300 leading-relaxed">
          Uncle Inc. is the AI-assisted platform that helps founders test startup
          ideas with real users — before writing a single line of code.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                <ArrowRight className="h-3 w-3 text-gold" />
              </div>
              <span className="text-sm text-charcoal-300">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/api/auth/demo-signin">
            <Button size="lg">
              <Play className="h-4 w-4" />
              Try Live Demo
            </Button>
          </a>
          <a href="#waitlist">
            <Button variant="outline" size="lg">
              Join the Waitlist
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
