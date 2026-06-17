const features = [
  {
    title: 'AI Rapid Prototyping',
    description:
      'Turn your idea into a clickable prototype in minutes with our AI-powered builder. No code needed.',
    icon: '⊞',
  },
  {
    title: 'Built-in User Testing',
    description:
      'Get real feedback from your target audience with integrated user testing panels and session recordings.',
    icon: '⊕',
  },
  {
    title: 'Launch Analytics',
    description:
      'Track engagement, conversion funnels, and user behavior with built-in analytics from day one.',
    icon: '◉',
  },
  {
    title: 'Guided Validation',
    description:
      'Follow our proven validation framework that helps you test assumptions before writing a single line of code.',
    icon: '✓',
  },
  {
    title: 'No Code Required',
    description:
      'Ship functional MVPs without writing code. Perfect for non-technical founders with big ideas.',
    icon: '⚡',
  },
  {
    title: 'Iterate with Data',
    description:
      'Use heatmaps, session replays, and user interviews to iterate based on evidence, not gut feelings.',
    icon: '↻',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white font-display">
            Everything you need to{' '}
            <span className="gradient-text">validate & launch</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Stop building in the dark. Our integrated platform gives you the tools to test,
            learn, and iterate — all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#111118] border border-gray-800 rounded-xl p-8 hover:border-[#4f46e5]/50 transition-colors"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-white font-display">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
