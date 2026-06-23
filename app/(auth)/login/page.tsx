'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
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
          <p className="mt-2" style={{ color: '#666' }}>Welcome back</p>
        </div>

        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#722F3715', color: '#722F37', border: '1px solid #722F3730' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFBF5', color: '#1a1a1a' }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: '#666' }}>
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium hover:underline" style={{ color: '#722F37' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
