'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess('Check your email for a confirmation link!');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-white font-display">
          Uncle Inc.
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-white font-display">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Start validating your startup idea today
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111118] p-8 rounded-2xl border border-gray-800">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-400 bg-green-900/20 border border-green-800 rounded-lg">
            {success}
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
            placeholder="Min. 8 characters"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#06b6d4] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
