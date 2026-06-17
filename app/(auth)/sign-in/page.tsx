'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-white font-display">
          Uncle Inc.
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-white font-display">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Sign in to your account to continue
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111118] p-8 rounded-2xl border border-gray-800">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 block w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[#06b6d4] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
