import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '@/lib/store';
import { setSessionCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
  }

  const user = verifyUser(token);
  if (!user) {
    return NextResponse.redirect(new URL('/login?error=invalid_token', request.url));
  }

  await setSessionCookie(user.id);
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = body;

  if (!token) {
    return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
  }

  const user = verifyUser(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
  }

  await setSessionCookie(user.id);
  return NextResponse.json({ success: true, message: 'Email verified successfully' });
}
