import Link from 'next/link';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-[#111118] text-sm text-gray-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
          Now in early access
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-display leading-tight">
          Validate your startup idea{' '}
          <span className="gradient-text">before you build it</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Uncle Inc. is the AI-assisted MVP development platform that helps early-stage founders
          prototype, test, and launch — no technical co-founder required.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-up"
            className="px-8 py-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-xl transition-colors text-lg"
          >
            Start Validating Free
          </Link>
          <a
            href="#features"
            className="px-8 py-4 border border-gray-700 hover:border-gray-500 text-white font-medium rounded-xl transition-colors text-lg"
          >
            See How It Works
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          No credit card required • Free tier available
        </p>
      </div>
    </section>
  );
}
