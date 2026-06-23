'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PasswordStrength } from '@/components/ui/PasswordStrength';
import { trackOnboarding } from '@/lib/analytics';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'We need your name to personalize your experience.';
    if (!email.trim()) errors.email = 'Please enter your work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Hmm, that email doesn\'t look quite right. Check for typos?';
    if (!password) errors.password = 'Choose a password to secure your account.';
    else if (password.length < 8) errors.password = 'Password needs at least 8 characters for security.';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), company: company.trim(), password, website: honeypot }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        trackOnboarding('signup_completed', { email: email.trim() });
      } else {
        const msg = data.error || data.message || 'Something went wrong. Please try again.';
        if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('exist')) {
          setError('An account with this email already exists. Want to sign in instead?');
        } else if (msg.toLowerCase().includes('password')) {
          setFieldErrors({ password: 'Choose a stronger password with at least 8 characters.' });
        } else {
          setError(msg);
        }
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#22C55E]/10 mb-6">
            <svg className="w-8 h-8 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1A3A5C] mb-3">
            Check your email!
          </h1>
          <p className="text-gray-600 mb-4">
            We sent a verification link to <strong>{email}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            It should arrive in under 60 seconds. No spam folder digging required.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-[#1A3A5C] text-white font-semibold rounded-lg hover:bg-[#152f4a] transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#1A3A5C]">
            Uncle Inc.
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            AI-assisted MVP validation for startup founders
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Headline */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#1A3A5C] mb-1">
              Stop guessing. Start validating.
            </h1>
            <p className="text-sm text-gray-600">
              Build what founders actually want — validated by real user data.
            </p>
          </div>

          {/* General error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
              {error.includes('sign in') && (
                <Link href="/login" className="text-sm text-[#4A90D9] hover:underline mt-1 inline-block">
                  Go to sign in →
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field — invisible to humans, bots will fill it */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: '' })); }}
                placeholder="Jane Founder"
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-gray-900 placeholder:text-gray-400 ${
                  fieldErrors.name ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-[#4A90D9] focus:border-[#4A90D9]'
                }`}
                disabled={isSubmitting}
              />
              {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' })); }}
                placeholder="jane@startup.com"
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-gray-900 placeholder:text-gray-400 ${
                  fieldErrors.email ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-[#4A90D9] focus:border-[#4A90D9]'
                }`}
                disabled={isSubmitting}
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Your Startup Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90D9] focus:border-[#4A90D9] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' })); }}
                placeholder="At least 8 characters"
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-gray-900 placeholder:text-gray-400 ${
                  fieldErrors.password ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-[#4A90D9] focus:border-[#4A90D9]'
                }`}
                disabled={isSubmitting}
              />
              {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
              <PasswordStrength password={password} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1A3A5C] text-white font-semibold rounded-lg hover:bg-[#152f4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#4A90D9] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Uncle Inc. — Validate Startup Ideas Without a Technical Co-Founder
        </p>
      </div>
    </div>
  );
}
