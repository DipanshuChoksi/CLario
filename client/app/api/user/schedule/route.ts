import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch the user's schedule from public.users table
  const { data, error } = await supabase
    .from('users')
    .select('schedule')
    .eq('id', session.user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is the code for multiple or no rows returned when .single() is used
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ schedule: data?.schedule || null });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { schedule } = await req.json();

    if (typeof schedule !== 'string') {
      return NextResponse.json({ error: 'Schedule must be a string' }, { status: 400 });
    }

    // Upsert into public.users using the NextAuth ID
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: session.user.id,
        email: session.user.email,
        schedule: schedule,
      }, { onConflict: 'id' })
      .select('schedule')
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, schedule: data.schedule });
  } catch (error: any) {
    console.error('Failed to update schedule:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
