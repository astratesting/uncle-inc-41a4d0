import { NextResponse } from 'next/server';
import { getVerifiedUserCount, getTotalUserCount } from '@/lib/store';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SIGNUPS_PATH = path.join(process.cwd(), 'data', 'signups.json');

interface WaitlistEntry {
  verified?: boolean;
  [key: string]: unknown;
}

async function getVerifiedWaitlistCount(): Promise<number> {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, 'utf-8');
    const signups = JSON.parse(data);
    if (!Array.isArray(signups)) return 0;
    return signups.filter((s: WaitlistEntry) => s.verified === true).length;
  } catch {
    return 0;
  }
}

export async function GET() {
  const totalUsers = getTotalUserCount();
  const verifiedUsers = getVerifiedUserCount();
  const verifiedWaitlist = await getVerifiedWaitlistCount();
  // Verified count = verified account users + verified waitlist entries
  const count = verifiedUsers + verifiedWaitlist;
  return NextResponse.json({ count, verified: count, target: 10 });
}
