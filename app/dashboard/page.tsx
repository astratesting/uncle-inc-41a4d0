'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { trackOnboarding } from '@/lib/analytics';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [wizardDone, setWizardDone] = useState(false);

  useEffect(() => {
    trackOnboarding('first_login');

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login?redirect=/dashboard');
          return;
        }
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          router.push('/login?redirect=/dashboard');
        }
      } catch {
        // Fallback: check localStorage
        const stored = localStorage.getItem('uncle_user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            router.push('/login?redirect=/dashboard');
          }
        } else {
          router.push('/login?redirect=/dashboard');
        }
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('uncle_user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-[#4A90D9] mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-[#1A3A5C]">Uncle Inc.</span>
              <span className="hidden sm:inline text-sm text-gray-500">|</span>
              <span className="hidden sm:inline text-sm text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              {user?.email && (
                <span className="text-sm text-gray-600 hidden md:inline">{user.email}</span>
              )}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!wizardDone ? (
          <OnboardingWizard userName={user?.name} />
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#1A3A5C] mb-2">
                Your Projects
              </h2>
              <p className="text-gray-600">
                Track your validated ideas and prototypes here.
              </p>
            </div>

            {/* Placeholder for project list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h3 className="font-semibold text-[#1A3A5C]">Start a new project</h3>
                    <p className="text-sm text-gray-500">Validate another idea</p>
                  </div>
                </div>
                <button
                  onClick={() => setWizardDone(false)}
                  className="w-full px-4 py-2 bg-[#4A90D9] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors text-sm font-medium"
                >
                  New Validation
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="font-semibold text-[#1A3A5C]">Your first prototype</h3>
                    <p className="text-sm text-gray-500">Complete the wizard to see it here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
