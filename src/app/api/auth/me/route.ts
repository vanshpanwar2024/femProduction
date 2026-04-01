import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const payload = await decrypt(session);
    
    if (payload) {
      return NextResponse.json({ authenticated: true, user: payload });
    }
    
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
