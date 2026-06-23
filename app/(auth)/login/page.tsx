'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackOnboarding } from '@/lib/analytics';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!email.trim()) errors.email = 'Please enter your work email.';
    if (!password) errors.password = 'Please enter your password.';
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.user) {
          localStorage.setItem('uncle_user', JSON.stringify(data.user));
        }
        trackOnboarding('first_login');
        router.push(redirectTo);
      } else {
        const msg = data.error || data.message || 'Invalid credentials.';
        if (msg.toLowerCase().includes('verify') || msg.toLowerCase().includes('verification')) {
          setError('Please verify your email first. Check your inbox for the verification link.');
        } else if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('invalid')) {
          setError('The email or password you entered is incorrect. Please try again.');
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
              Welcome back
            </h1>
            <p className="text-sm text-gray-600">
              Pick up where you left off.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-gray-900 placeholder:text-gray-400 ${
                  fieldErrors.password ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-[#4A90D9] focus:border-[#4A90D9]'
                }`}
                disabled={isSubmitting}
              />
              {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
              <div className="mt-1 text-right">
                <Link href="/forgot-password" className="text-xs text-[#4A90D9] hover:underline">
                  Forgot your password?
                </Link>
              </div>
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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            New to Uncle Inc.?{' '}
            <Link href="/signup" className="text-[#4A90D9] hover:underline font-medium">
              Create an account
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
