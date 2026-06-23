import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/store';
import { hashPassword, setSessionCookie } from '@/lib/auth';
import { trackServerEvent } from '@/lib/analytics';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '127.0.0.1';
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many signups. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } }
      );
    }

    const body = await request.json();
    const { email, password, name, company, website } = body;

    // Honeypot check: if 'website' field is filled, it's a bot
    if (website) {
      return NextResponse.json({ success: true, user: { id: '', email: '', name: '' } });
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = createUser(email, name, company || '', passwordHash);

    // Auto-verify since we can't send real emails
    const { verifyUser } = await import('@/lib/store');
    verifyUser(user.verificationToken);

    // Create session and set cookie
    await setSessionCookie(user.id);

    await trackServerEvent('user_signup', email, { name, company });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
