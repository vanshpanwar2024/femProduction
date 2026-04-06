import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }
    
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Supabase client is not configured properly.' },
        { status: 500 }
      );
    }

    // Register user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      );
    }

    // Create the session payload from the real verified user
    const user = { 
      id: authData.user?.id || Date.now(), 
      email: authData.user?.email || email, 
      name, 
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
      { success: false, error: 'Something went wrong during signup.' },
      { status: 500 }
    );
  }
}
