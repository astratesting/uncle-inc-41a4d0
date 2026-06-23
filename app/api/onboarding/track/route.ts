import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, idea, metadata } = body;

    if (!event) {
      return NextResponse.json({ success: false, error: 'Event name is required.' }, { status: 400 });
    }

    console.log(`[Onboarding Analytics] ${event}:`, {
      idea: idea || null,
      metadata: metadata || {},
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      event,
      tracked: true,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to track event.' }, { status: 500 });
  }
}
