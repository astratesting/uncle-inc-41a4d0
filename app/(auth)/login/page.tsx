'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!form.email.trim()) {
      errors.email = 'Enter your email to sign in';
    }
    if (!form.password) {
      errors.password = 'Enter your password';
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'Invalid credentials') {
          setError("That email and password combination doesn't match our records. Try again or reset your password.");
        } else if (data.error === 'Please verify your email first') {
          setError('Please verify your email before signing in. Check your inbox for the verification link.');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#FFFBF5' }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            Uncle Inc.
          </Link>
          <p className="mt-2 text-sm" style={{ color: '#57534e' }}>
            Welcome back &mdash; let&apos;s keep building.
          </p>
        </div>

        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#722F3715', color: '#722F37', border: '1px solid #722F3730' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Your password"
                required
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: '#666' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium" style={{ color: '#C8A951' }}>
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
