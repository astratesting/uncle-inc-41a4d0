import { NextResponse } from 'next/server';
import { getVerifiedUserCount, getTotalUserCount } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const total = getTotalUserCount();
  const verified = getVerifiedUserCount();
  return NextResponse.json({ count: total, verified, target: 10 });
}
