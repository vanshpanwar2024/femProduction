import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

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
    
    // Create a mock user object
    const user = { 
      id: Date.now(), 
      email, 
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
