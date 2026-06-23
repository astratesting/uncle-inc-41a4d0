'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PasswordStrength from '@/components/ui/PasswordStrength';
import GoalSelector from '@/components/onboarding/GoalSelector';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', password: '', name: '', company: '' });
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) {
      errors.name = 'We need your name to personalize your experience';
    }

    if (!form.email.trim()) {
      errors.email = 'We need your email to set up your account';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "That doesn't look like a valid email \u2014 double-check the format";
    }

    if (!form.password) {
      errors.password = 'Choose a password to secure your account';
    } else if (form.password.length < 6) {
      errors.password = 'Make it at least 6 characters for security';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async () => {
    if (!goal) {
      setError("Pick what you're trying to do \u2014 it helps us tailor your experience");
      return;
    }

    setError('');
    setLoading(true);
    setFieldErrors({});

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, goal }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'User already exists') {
          setFieldErrors({ email: 'An account with this email already exists. Try signing in instead.' });
          setStep(1);
          return;
        }
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      // Track onboarding friction event
      fetch('/api/onboarding/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'signup_completed',
          userId: data.userId || form.email,
          properties: { goal, step: 2 },
        }),
      }).catch(() => {});

      setSuccess(true);
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#22c55e15' }}>
              <svg className="w-8 h-8" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
              Check your email!
            </h2>
            <p className="text-sm mb-2" style={{ color: '#57534e' }}>
              We sent a verification link to <strong>{form.email}</strong>
            </p>
            <p className="text-sm mb-6" style={{ color: '#666' }}>
              No spam folder digging required &mdash; it&apos;ll arrive in under 60 seconds.
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 text-center"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#FFFBF5' }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            Uncle Inc.
          </Link>
          <p className="mt-3 text-sm font-medium" style={{ color: '#57534e' }}>
            Stop guessing. Start validating.
          </p>
          <p className="mt-1 text-xs" style={{ color: '#666' }}>
            Build what founders actually want.
          </p>
        </div>

        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: step >= 1 ? '#C8A951' : '#e7e5e4',
                  color: step >= 1 ? '#1a1a1a' : '#a8a29e',
                }}
              >
                1
              </div>
              <span className="text-xs font-medium" style={{ color: step >= 1 ? '#1a1a1a' : '#a8a29e' }}>
                Your details
              </span>
            </div>
            <div className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: step >= 2 ? '#C8A951' : '#e7e5e4' }} />
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: step >= 2 ? '#C8A951' : '#e7e5e4',
                  color: step >= 2 ? '#1a1a1a' : '#a8a29e',
                }}
              >
                2
              </div>
              <span className="text-xs font-medium" style={{ color: step >= 2 ? '#1a1a1a' : '#a8a29e' }}>
                Your goal
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#722F3715', color: '#722F37', border: '1px solid #722F3730' }}>
              {error}
            </div>
          )}

          {/* Step 1: Name + Email + Password */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                  }}
                  placeholder="Jane Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: fieldErrors.name ? '#ef4444' : '#e2e0d8',
                    color: '#1a1a1a',
                    backgroundColor: '#FFFBF5',
                  }}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: fieldErrors.email ? '#ef4444' : '#e2e0d8',
                    color: '#1a1a1a',
                    backgroundColor: '#FFFBF5',
                  }}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                  Your Startup Name <span style={{ color: '#999' }}>(optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Inc."
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                  style={{ borderColor: '#e2e0d8', color: '#1a1a1a', backgroundColor: '#FFFBF5' }}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                  }}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                  style={{
                    borderColor: fieldErrors.password ? '#ef4444' : '#e2e0d8',
                    color: '#1a1a1a',
                    backgroundColor: '#FFFBF5',
                  }}
                />
                {fieldErrors.password && (
                  <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{fieldErrors.password}</p>
                )}
                <PasswordStrength password={form.password} />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
              >
                Continue
              </button>
            </form>
          )}

          {/* Step 2: Goal Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <GoalSelector onSelect={setGoal} selected={goal} />

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 border"
                  style={{ borderColor: '#e2e0d8', color: '#57534e', backgroundColor: '#FFFFFF' }}
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={loading || !goal}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm" style={{ color: '#666' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-medium" style={{ color: '#C8A951' }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
