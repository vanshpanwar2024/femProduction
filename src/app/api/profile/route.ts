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

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, age, dob, gender, category, bio, socialLink, portfolioLink } = body;

    // Upsert profile data matched on email
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        email: user.email,
        name: name || user.name,
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
