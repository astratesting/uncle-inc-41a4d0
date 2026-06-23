'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

interface DashboardContentProps {
  user: {
    id: string;
    email: string;
    name: string;
    companyName: string;
    verified: boolean;
  };
}

const benefitCards = [
  {
    title: 'Marketplace Validation',
    description: 'Testing a two-sided marketplace idea for local services',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'AI Workflow Tool',
    description: 'Building an AI assistant for content creation teams',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'SaaS Dashboard',
    description: 'Validating a B2B analytics dashboard for small teams',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Top Nav */}
      <nav className="border-b" style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm" style={{ color: '#666' }}>{user.name}</span>
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="text-sm px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: '#1a1a1a', color: '#FFFBF5' }}
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Hero Welcome */}
        <div className="rounded-2xl p-6 md:p-8 mb-8" style={{ backgroundColor: '#1a1a1a', color: '#FFFBF5' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Welcome, {user.name}
              </h1>
              {user.companyName && (
                <p className="text-sm opacity-60">{user.companyName}</p>
              )}
            </div>
          </div>
          <p className="mt-3 opacity-80 text-sm md:text-base max-w-xl">
            {user.verified
              ? "Your account is ready. Start validating your startup idea below \u2014 describe what you want to build and we'll help you figure out if it's worth pursuing."
              : 'Please verify your email to unlock all features. Check your inbox for the verification link.'}
          </p>
        </div>

        {/* Onboarding Wizard \u2014 Main CTA */}
        <div className="mb-8">
          <OnboardingWizard userName={user.name} />
        </div>

        {/* What other founders are validating */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            What other founders are validating
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {benefitCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-5 transition-all hover:shadow-sm"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#C8A95115', color: '#C8A951' }}>
                  {card.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>
                  {card.title}
                </h3>
                <p className="text-xs" style={{ color: '#666' }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/analytics"
            className="rounded-xl p-5 transition-all hover:shadow-sm"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#C8A95115' }}>
              <svg className="w-5 h-5" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>Analytics</h3>
            <p className="text-xs" style={{ color: '#666' }}>Track signups and growth</p>
          </Link>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#C8A95115' }}>
              <svg className="w-5 h-5" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>Coming Soon</h3>
            <p className="text-xs" style={{ color: '#666' }}>AI-powered validation tools</p>
          </div>
        </div>
      </div>
    </div>
  );
}
