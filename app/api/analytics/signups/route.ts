import { NextResponse } from 'next/server';
import { getVerifiedUserCount, getTotalUserCount, getRecentSignups } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const totalSignups = getTotalUserCount();
  const verifiedSignups = getVerifiedUserCount();
  const recentSignups = getRecentSignups(20);

  return NextResponse.json({
    totalSignups,
    verifiedSignups,
    target: 10,
    progress: Math.min(Math.round((verifiedSignups / 10) * 100), 100),
    recentSignups,
  });
}
