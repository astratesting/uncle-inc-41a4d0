import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/store';
import { verifyPassword, setSessionCookie } from '@/lib/auth';
import { trackServerEvent } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.verified) {
      return NextResponse.json({ error: 'Please verify your email before logging in' }, { status: 403 });
    }

    await setSessionCookie(user.id);

    await trackServerEvent('user_login', user.email);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
