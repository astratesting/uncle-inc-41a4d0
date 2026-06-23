import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/store';
import { verifyPassword, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

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
      return NextResponse.json({
        error: 'Please verify your email before logging in. Check your inbox.',
        needsVerification: true,
      }, { status: 403 });
    }

    await setSessionCookie(user.id);

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
