import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Resend } from 'resend';
import { createUser, verifyUser } from '@/lib/store';
import { hashPassword, setSessionCookie } from '@/lib/auth';
import { trackServerEvent } from '@/lib/analytics';
import { checkRateLimit } from '@/lib/rate-limit';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const SPOT_LIMIT = 10;

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
      return NextResponse.json({ success: true, message: 'Check your email to verify your signup.' });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Full account signup (with password)
    if (password) {
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }

      const passwordHash = await hashPassword(password);
      const user = createUser(email, name, company || '', passwordHash);

      // Auto-verify since we can't send real emails
      verifyUser(user.verificationToken);

      // Create session and set cookie
      await setSessionCookie(user.id);

      await trackServerEvent('user_signup', email, { name, company });

      return NextResponse.json({
        success: true,
        message: 'Account created! Redirecting to dashboard...',
        user: { id: user.id, email: user.email, name: user.name },
      });
    }

    // Waitlist signup (no password) — write to signups.json
    const SIGNUPS_PATH = path.join(process.cwd(), 'data', 'signups.json');

    let signups: any[] = [];
    try {
      const data = await fs.readFile(SIGNUPS_PATH, 'utf-8');
      signups = JSON.parse(data);
    } catch {
      signups = [];
    }

    // Enforce spot limit server-side
    const verifiedCount = signups.filter((s: any) => s.verified).length;
    if (verifiedCount >= SPOT_LIMIT) {
      return NextResponse.json({ error: 'All spots have been claimed.' }, { status: 409 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = signups.find((s: any) => s.email === normalizedEmail);
    if (existing && existing.verified) {
      return NextResponse.json({ error: 'This email is already signed up' }, { status: 409 });
    }

    if (existing) {
      existing.token = crypto.randomBytes(32).toString('hex');
      existing.createdAt = new Date().toISOString();
      await fs.writeFile(SIGNUPS_PATH, JSON.stringify(signups, null, 2));
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
      const verifyUrl = `${baseUrl}/verify?token=${existing.token}`;
      await trackServerEvent('waitlist_signup_submitted', normalizedEmail, { name, company });
      await sendVerificationEmail(normalizedEmail, verifyUrl);
      return NextResponse.json({
        success: true,
        message: 'Check your email to verify your signup.',
        verifyUrl,
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    signups.push({
      name: typeof name === 'string' ? name.trim() : undefined,
      email: normalizedEmail,
      company: typeof company === 'string' ? company.trim() : undefined,
      token,
      verified: false,
      createdAt: new Date().toISOString(),
    });
    await fs.writeFile(SIGNUPS_PATH, JSON.stringify(signups, null, 2));

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const verifyUrl = `${baseUrl}/verify?token=${token}`;

    await trackServerEvent('waitlist_signup_submitted', normalizedEmail, { name, company });
    await sendVerificationEmail(normalizedEmail, verifyUrl);

    return NextResponse.json({
      success: true,
      message: 'Check your email to verify your signup.',
      verifyUrl,
    });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

async function sendVerificationEmail(to: string, verifyUrl: string) {
  if (!resend) {
    console.log(`[VERIFY LINK] ${to}: ${verifyUrl}`);
    return;
  }
  await resend.emails.send({
    from: 'Uncle Inc <noreply@uncleinc.com>',
    to,
    subject: 'Verify your spot — Uncle Inc',
    html: `<p>Thanks for signing up! Click below to verify your spot:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
  });
}
