'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '', companyName: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#C8A95120' }}>
              <svg className="w-8 h-8" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>Check Your Email</h1>
            <p className="mb-6" style={{ color: '#666' }}>
              We sent a verification link to <strong>{form.email}</strong>. Click the link in the email to activate your account.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              Go to Login
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
          <p className="mt-2" style={{ color: '#666' }}>Create your account to get started</p>
        </div>

        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#722F3715', color: '#722F37', border: '1px solid #722F3730' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFBF5', color: '#1a1a1a' }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>Company Name</label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFBF5', color: '#1a1a1a' }}
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFBF5', color: '#1a1a1a' }}
                placeholder="john@acme.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFBF5', color: '#1a1a1a' }}
                placeholder="••••••••"
              />
              <p className="text-xs mt-1" style={{ color: '#999' }}>At least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: '#666' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-medium hover:underline" style={{ color: '#722F37' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
