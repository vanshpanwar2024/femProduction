import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Mock authentication: allow any valid request with password >= 6 length to succeed
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials. Password must be at least 6 characters.' },
        { status: 401 }
      );
    }
    
    // Create a mock user object based on the email provided
    const user = { 
      id: Date.now(), 
      email, 
      name: email.split('@')[0], 
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
