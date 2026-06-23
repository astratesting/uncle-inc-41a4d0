import { NextResponse } from 'next/server';

function generatePrototype(idea: string) {
  const lower = idea.toLowerCase();

  let name = 'Your Product';
  let description = '';
  let features: string[] = [];
  let nextSteps: string[] = [];

  // Analyze the idea and generate contextual output
  if (lower.includes('marketplace') || lower.includes('connect')) {
    name = 'Marketplace Platform';
    description = `A two-sided marketplace that connects the right people at the right time. Based on your idea: "${idea.slice(0, 100)}${idea.length > 100 ? '...' : ''}"`;
    features = [
      'User profiles for both sides of the marketplace (providers and customers)',
      'Search and filtering to match supply with demand in real-time',
      'Booking or request system with confirmation flow',
      'Rating and review system to build trust',
      'Secure messaging between matched parties',
    ];
    nextSteps = [
      'Interview 10 potential users on each side of the marketplace',
      'Build a landing page to test demand with a waitlist',
      'Create a manual matching process to validate the core loop before building',
      'Define your take rate and pricing model',
    ];
  } else if (lower.includes('saas') || lower.includes('tool') || lower.includes('software') || lower.includes('app')) {
    name = 'SaaS Tool';
    description = `A focused software tool that solves a specific pain point. Based on your idea: "${idea.slice(0, 100)}${idea.length > 100 ? '...' : ''}"`;
    features = [
      'Clean dashboard showing the most important metrics at a glance',
      'Core workflow that eliminates the #1 pain point',
      'Simple onboarding that gets users to value in under 2 minutes',
      'Integration with tools your users already rely on',
      'Export and reporting for stakeholders',
    ];
    nextSteps = [
      'Shadow 5 people who currently solve this problem manually',
      'Build a clickable prototype and test it with real users',
      'Launch a private beta with 20 early adopters',
      'Measure time-to-first-value and iterate on onboarding',
    ];
  } else if (lower.includes('ai') || lower.includes('automat') || lower.includes('generat')) {
    name = 'AI-Powered Product';
    description = `An intelligent product that uses AI to automate or enhance workflows. Based on your idea: "${idea.slice(0, 100)}${idea.length > 100 ? '...' : ''}"`;
    features = [
      'AI-powered input processing that understands natural language',
      'Smart output generation tailored to the user\'s context',
      'Feedback loop that improves results over time',
      'Templates and presets for common use cases',
      'Human-in-the-loop review for critical outputs',
    ];
    nextSteps = [
      'Define the narrowest possible use case and nail it first',
      'Test your AI prompts with 20 real examples from target users',
      'Build a no-code prototype to validate the core AI workflow',
      'Establish quality metrics and human evaluation criteria',
    ];
  } else {
    name = 'Startup Product';
    description = `A new product solving a real problem. Based on your idea: "${idea.slice(0, 100)}${idea.length > 100 ? '...' : ''}"`;
    features = [
      'Simple, focused solution to the core problem',
      'User-friendly interface that requires no explanation',
      'Quick setup that delivers value in the first session',
      'Feedback mechanism to capture user insights',
      'Analytics to understand how people actually use it',
    ];
    nextSteps = [
      'Write down the #1 problem you\'re solving and for whom',
      'Find 10 people who have this problem and talk to them',
      'Create a landing page describing the solution and measure interest',
      'Build the smallest possible version and get it in front of users',
    ];
  }

  return { name, description, features, nextSteps };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idea } = body;

    if (!idea || typeof idea !== 'string') {
      return NextResponse.json({ error: 'Idea description is required' }, { status: 400 });
    }

    // Simulate processing delay (2-3 seconds)
    const delay = 2000 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const prototype = generatePrototype(idea);

    return NextResponse.json(prototype);
  } catch {
    return NextResponse.json({ error: 'Failed to generate prototype' }, { status: 500 });
  }
}
