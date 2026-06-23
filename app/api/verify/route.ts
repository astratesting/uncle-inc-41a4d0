import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '@/lib/store';
import { setSessionCookie } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';
import { trackServerEvent } from '@/lib/analytics';

const SIGNUPS_PATH = path.join(process.cwd(), 'data', 'signups.json');

async function verifyWaitlistEntry(token: string): Promise<boolean> {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, 'utf-8');
    const signups = JSON.parse(data);
    if (!Array.isArray(signups)) return false;
    const idx = signups.findIndex((s: Record<string, unknown>) => s.token === token);
    if (idx === -1) return false;
    signups[idx].verified = true;
    signups[idx].verifiedAt = new Date().toISOString();
    await fs.writeFile(SIGNUPS_PATH, JSON.stringify(signups, null, 2));
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
  }

  // Try store.json first (full account)
  const user = verifyUser(token);
  if (user) {
    await setSessionCookie(user.id);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Try signups.json (waitlist entry)
  const waitlistVerified = await verifyWaitlistEntry(token);
  if (waitlistVerified) {
    await trackServerEvent('waitlist_verified', token, {});
    return NextResponse.redirect(new URL('/?verified=true', request.url));
  }

  return NextResponse.redirect(new URL('/?verified=failed', request.url));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = body;

  if (!token) {
    return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
  }

  // Try store.json first
  const user = verifyUser(token);
  if (user) {
    await setSessionCookie(user.id);
    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  }

  // Try signups.json
  const waitlistVerified = await verifyWaitlistEntry(token);
  if (waitlistVerified) {
    await trackServerEvent('waitlist_verified', token, {});
    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  }

  return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
}
