import { WaitlistForm } from '@/components/WaitlistForm';

export function WaitlistCTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-display">
            Stop guessing.{' '}
            <span className="gradient-text">Start validating.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Join the waitlist and be the first to know when Uncle Inc. launches. Early
            access members get free Pro tier for 3 months.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
