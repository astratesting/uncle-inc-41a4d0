import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/store';
import { hashPassword } from '@/lib/auth';
import { trackServerEvent } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = createUser(email, name || '', '', passwordHash);

    // Auto-verify
    const { verifyUser } = await import('@/lib/store');
    verifyUser(user.verificationToken);

    await trackServerEvent('user_registered', email.toLowerCase(), { name });

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      verifyUrl: `/api/auth/verify-email?token=${user.verificationToken}`,
    });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
