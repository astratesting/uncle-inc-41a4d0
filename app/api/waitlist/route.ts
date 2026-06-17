import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Store in Supabase waitlist table if available
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    
    const { error } = await supabase.from('waitlist').insert({ email });
    
    if (error) {
      // If the waitlist table doesn't exist yet, just acknowledge the signup
      console.error('Waitlist insert error:', error.message);
      return NextResponse.json({ success: true, message: 'Thanks for joining the waitlist!' });
    }

    return NextResponse.json({ success: true, message: 'Thanks for joining the waitlist!' });
  } catch (err) {
    // Graceful fallback if Supabase is not configured
    return NextResponse.json({ success: true, message: 'Thanks for joining the waitlist!' });
  }
}
