import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getTotalUserCount } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
    },
    stats: {
      totalSignups: getTotalUserCount(),
    },
  });
}
