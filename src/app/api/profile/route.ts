import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const user = session ? await decrypt(session) : null;

    const body = await request.json();
    const { name, email, age, dob, gender, category, bio, socialLink, portfolioLink } = body;

    const targetEmail = user?.email || email;

    if (!targetEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Upsert profile data matched on email
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        email: targetEmail,
        name: name || user?.name || '',
        age: age ? parseInt(age) : null,
        dob,
        gender,
        category,
        bio,
        social_link: socialLink,
        portfolio_link: portfolioLink,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      console.error('Supabase profile insertion error:', error);
      return NextResponse.json({ error: 'Failed to save profile', details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (err) {
    console.error('Profile save exception:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
