import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Top Nav */}
      <nav className="border-b" style={{ borderColor: '#e2e0d8', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
            Uncle Inc.
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm" style={{ color: '#666' }}>{user.name}</span>
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="text-sm px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: '#1a1a1a', color: '#FFFBF5' }}
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Card */}
        <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: '#1a1a1a', color: '#FFFBF5' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#C8A951', color: '#1a1a1a' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Welcome, {user.name}</h1>
              <p className="text-sm opacity-70">{user.companyName}</p>
            </div>
          </div>
          <p className="mt-4 opacity-80">
            {user.verified
              ? 'Your account is verified. Start validating your startup idea today.'
              : 'Please verify your email to unlock all features.'}
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/analytics"
            className="rounded-2xl p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: '#C8A95115' }}>
              <svg className="w-6 h-6" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: '#1a1a1a' }}>Analytics</h3>
            <p className="text-sm" style={{ color: '#666' }}>Track verified signups and growth</p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="rounded-2xl p-6 transition-all hover:shadow-md"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: '#722F3715' }}>
              <svg className="w-6 h-6" style={{ color: '#722F37' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: '#1a1a1a' }}>Profile</h3>
            <p className="text-sm" style={{ color: '#666' }}>Manage your account settings</p>
          </Link>

          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: '#C8A95115' }}>
              <svg className="w-6 h-6" style={{ color: '#C8A951' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: '#1a1a1a' }}>Coming Soon</h3>
            <p className="text-sm" style={{ color: '#666' }}>AI-powered MVP validation tools</p>
          </div>
        </div>
      </div>
    </div>
  );
}
