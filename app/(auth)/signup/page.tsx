'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '', company: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupCount, setSignupCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/signup-count')
      .then((res) => res.json())
      .then((data) => setSignupCount(data.count))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Network error. Please try again.');
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
          <p className="mt-2" style={{ color: '#666' }}>Create your account</p>
          {signupCount !== null && signupCount > 0 && (
            <p className="mt-1 text-sm" style={{ color: '#C8A951' }}>
              {signupCount} {signupCount === 1 ? 'founder has' : 'founders have'} already signed up
            </p>
          )}
        </div>

        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#722F3715', color: '#722F37', border: '1px solid #722F3730' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                required
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', color: '#1a1a1a', backgroundColor: '#FFFBF5' }}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', color: '#1a1a1a', backgroundColor: '#FFFBF5' }}
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                Company <span style={{ color: '#999' }}>(optional)</span>
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', color: '#1a1a1a', backgroundColor: '#FFFBF5' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

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
