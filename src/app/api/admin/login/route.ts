import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Check credentials (use environment variables in production, fallback to hardcoded for demo)
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'fem2026';

    if (username === adminUser && password === adminPass) {
      const token = await encrypt({ role: 'admin' });
      
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}