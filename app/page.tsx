import Link from 'next/link';
import { SignupCounter } from '@/components/SignupCounter';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Nav */}
      <nav className="border-b" style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium" style={{ color: '#1a1a1a' }}>Sign In</Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: '#C8A95115', color: '#C8A951' }}>
          Now accepting early access signups
        </div>
        <div className="mb-6 flex justify-center">
          <SignupCounter />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
          Validate Your Startup Idea Before You Build It
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#666' }}>
          Uncle Inc. helps early-stage founders test ideas with real users, generate prototypes, and launch with confidence — no technical co-founder required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
          >
            Start Validating Free
          </Link>
          <Link
            href="#features"
            className="px-8 py-3.5 rounded-xl font-semibold text-lg transition-all"
            style={{ backgroundColor: '#FFFFFF', color: '#1a1a1a', border: '1px solid #e2e0d8' }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
          What We're Building
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'AI Rapid Prototyping', desc: 'Describe your idea and get a functional prototype in minutes, not months.' },
            { title: 'Built-in User Testing', desc: 'Put your prototype in front of real users and get actionable feedback.' },
            { title: 'Launch Analytics', desc: 'Track validation metrics and know exactly when you have product-market fit.' },
            { title: 'Guided Validation', desc: 'Step-by-step process to validate assumptions before writing code.' },
            { title: 'No Code Required', desc: 'Built for non-technical founders. If you can describe it, you can build it.' },
            { title: 'Iterate with Data', desc: 'Real user data drives every iteration so you build what people actually want.' },
          ].map((feature, i) => (
            <div key={i} className="rounded-2xl p-6 transition-all hover:shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
              <h3 className="font-semibold text-lg mb-2" style={{ color: '#1a1a1a' }}>{feature.title}</h3>
              <p className="text-sm" style={{ color: '#666' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="rounded-3xl p-12" style={{ backgroundColor: '#1a1a1a' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFFBF5', fontFamily: 'Georgia, serif' }}>
            Stop Guessing. Start Validating.
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#999' }}>
            Join early access and be the first to validate your startup idea with real data.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3.5 rounded-xl font-semibold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
          >
            Create Free Account
          </Link>
          <p className="mt-4 text-sm" style={{ color: '#666' }}>
            No credit card required. Early access includes free prototyping credits.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: '#e2e0d8' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm" style={{ color: '#999' }}>
            © {new Date().getFullYear()} Uncle Inc. — AI-Assisted MVP Development for Startup Founders
          </p>
        </div>
      </footer>
    </div>
  );
}
