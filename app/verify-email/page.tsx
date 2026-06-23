'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'verified' | 'waiting'>('checking');

  useEffect(() => {
    let stopped = false;
    let attempts = 0;
    const maxAttempts = 30;

    const checkStatus = async () => {
      if (stopped) return;
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user?.verified) {
            if (!stopped) {
              setStatus('verified');
              setTimeout(() => router.push('/dashboard'), 1500);
            }
            return;
          }
        }
      } catch {}

      attempts++;
      if (!stopped && attempts < maxAttempts) {
        setTimeout(checkStatus, 2000);
      } else if (!stopped) {
        setStatus('waiting');
      }
    };

    const initialCheck = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user?.verified) {
            if (!stopped) {
              setStatus('verified');
              setTimeout(() => router.push('/dashboard'), 1500);
            }
            return;
          }
        }
      } catch {}
      if (!stopped) {
        setStatus('waiting');
        checkStatus();
      }
    };

    initialCheck();

    return () => { stopped = true; };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#FFFBF5' }}>
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
          {status === 'checking' && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#C8A95115' }}>
                <svg className="w-8 h-8 animate-spin" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
                Checking verification status...
              </h2>
              <p className="text-sm" style={{ color: '#666' }}>
                One moment while we check your account.
              </p>
            </>
          )}

          {status === 'verified' && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#22c55e15' }}>
                <svg className="w-8 h-8" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
                Email verified!
              </h2>
              <p className="text-sm" style={{ color: '#666' }}>
                Redirecting you to your dashboard...
              </p>
            </>
          )}

          {status === 'waiting' && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#C8A95115' }}>
                <svg className="w-8 h-8" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
                Waiting for email verification
              </h2>
              <p className="text-sm mb-6" style={{ color: '#666' }}>
                Check your inbox and click the verification link. We&apos;re checking automatically &mdash; you&apos;ll be redirected once verified.
              </p>

              <div className="flex items-center justify-center gap-1 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ backgroundColor: '#C8A951', animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>

              <Link
                href="/dashboard"
                className="inline-block w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 text-center"
                style={{ backgroundColor: '#e7e5e4', color: '#57534e' }}
              >
                Skip for now, take me to the dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
