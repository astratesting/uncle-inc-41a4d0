import { NextResponse } from 'next/server';
import { trackServerEvent } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, userId, properties } = body;

    if (!event || typeof event !== 'string') {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    await trackServerEvent(event, userId || 'anonymous', properties);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
