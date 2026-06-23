import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '@/lib/store';
import { setSessionCookie } from '@/lib/auth';
import { trackServerEvent } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing_token', baseUrl));
  }

  const user = verifyUser(token);
  if (!user) {
    return NextResponse.redirect(new URL('/login?error=invalid_token', baseUrl));
  }

  // Create session and redirect to dashboard
  await setSessionCookie(user.id);

  await trackServerEvent('email_verified', user.email);

  return NextResponse.redirect(new URL('/dashboard', baseUrl));
}
