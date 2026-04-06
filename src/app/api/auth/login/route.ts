import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Supabase client is not configured properly.' },
        { status: 500 }
      );
    }

    // Authenticate against Supabase Database
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { success: false, error: authError.message || 'Invalid credentials.' },
        { status: 401 }
      );
    }
    
    // Create the session payload from the real verified user
    const user = { 
      id: authData.user.id, 
      email: authData.user.email, 
      name: authData.user.user_metadata?.name || email.split('@')[0], 
      role: 'user' 
    };
    
    const session = await encrypt(user);
    
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    
    return NextResponse.json({ success: true, user });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
