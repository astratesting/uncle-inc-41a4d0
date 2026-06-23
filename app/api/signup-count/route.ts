import { NextResponse } from 'next/server';
import { getVerifiedUserCount, getTotalUserCount } from '@/lib/store';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SIGNUPS_PATH = path.join(process.cwd(), 'data', 'signups.json');

async function getWaitlistCount(): Promise<number> {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, 'utf-8');
    const signups = JSON.parse(data);
    return Array.isArray(signups) ? signups.length : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const totalUsers = getTotalUserCount();
  const verified = getVerifiedUserCount();
  const waitlistCount = await getWaitlistCount();
  // Count is the sum of user accounts and waitlist signups (deduped by total users being a superset)
  const count = totalUsers + waitlistCount;
  return NextResponse.json({ count, verified, target: 10 });
}
