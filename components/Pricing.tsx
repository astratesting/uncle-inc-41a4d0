import Link from 'next/link';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring and validating your first idea.',
    features: [
      '1 active project',
      '5 testers per project',
      'Basic analytics',
      'Community support',
      'AI prototyping (10 credits/mo)',
    ],
    cta: 'Get Started',
    href: '/sign-up',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious founders validating multiple ideas.',
    features: [
      'Unlimited projects',
      '100 testers per project',
      'Advanced analytics & heatmaps',
      'Priority support',
      'AI prototyping (unlimited)',
      'Custom domains',
      'Session recordings',
    ],
    cta: 'Start Pro Trial',
    href: '/sign-up',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: '/month',
    description: 'For founding teams moving fast together.',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      '500 testers per project',
      'Team collaboration',
      'Custom branding',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: '/sign-up',
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-display">
            Simple,{' '}
            <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.highlighted
                  ? 'border-[#4f46e5] bg-[#111118] ring-1 ring-[#4f46e5]'
                  : 'border-gray-800 bg-[#111118]'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#4f46e5] text-white text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white font-display">{tier.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white font-display">
                  {tier.price}
                </span>
                <span className="text-gray-400">{tier.period}</span>
              </div>
              <p className="mt-3 text-sm text-gray-400">{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-[#14b8a6]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`mt-8 block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                  tier.highlighted
                    ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white'
                    : 'border border-gray-700 hover:border-gray-500 text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
