import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idea } = body;

    if (!idea || typeof idea !== 'string' || idea.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please describe your idea in at least a few words.' },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000));

    const slug = idea
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 40);

    const prototypeUrl = `/prototype/${slug}-${Date.now().toString(36)}`;

    return NextResponse.json({
      success: true,
      prototypeUrl,
      message: 'Your interactive prototype is ready to review and share.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to generate prototype. Please try again.' },
      { status: 500 }
    );
  }
}
