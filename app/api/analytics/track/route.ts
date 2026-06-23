import { NextRequest, NextResponse } from 'next/server';
import { trackServerEvent } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, distinctId, properties } = body;

    if (!event) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    await trackServerEvent(event, distinctId || 'anonymous', properties);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
