import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/store';
import { hashPassword } from '@/lib/auth';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, companyName } = body;

    if (!email || !password || !name || !companyName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = createUser(email, name, companyName, passwordHash);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const verifyUrl = `${baseUrl}/api/verify?token=${user.verificationToken}`;

    // Try to send verification email via Resend if configured
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Uncle Inc. <noreply@uncleinc.com>',
            to: user.email,
            subject: 'Verify your email — Uncle Inc.',
            html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px">
              <h1 style="color:#1a1a1a">Welcome to Uncle Inc.</h1>
              <p>Hi ${user.name},</p>
              <p>Thanks for signing up! Please verify your email to get started.</p>
              <p style="margin:24px 0">
                <a href="${verifyUrl}" style="background:#C8A951;color:#1a1a1a;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600">Verify Email</a>
              </p>
              <p style="color:#666;font-size:0.85rem">Or copy this link: <br/>${verifyUrl}</p>
              <hr style="border:none;border-top:1px solid #eee;margin:32px 0"/>
              <p style="color:#999;font-size:0.8rem">Sent by Uncle Inc.</p>
            </div>`,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Account created! Check your email to verify your account.',
      verificationToken: process.env.NODE_ENV === 'development' ? user.verificationToken : undefined,
    });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
