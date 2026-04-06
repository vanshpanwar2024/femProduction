import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const errorParam = url.searchParams.get('error');

  if (errorParam) {
    return NextResponse.redirect(new URL('/?error=Google login failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=No code provided', request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/?error=Google OAuth is not configured securely', request.url));
  }

  // Construct redirect URI seamlessly without needing env for the host
  const isDev = process.env.NODE_ENV === 'development';
  const redirectUri = isDev 
    ? 'http://localhost:3000/api/auth/google/callback'
    : `https://${request.headers.get('host')}/api/auth/google/callback`;

  try {
    // 1. Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Google token error:', tokenData);
      return NextResponse.redirect(new URL('/?error=Failed to exchange token', request.url));
    }

    // 2. Fetch user profile from Google using the access token
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('Google user data error:', userData);
      return NextResponse.redirect(new URL('/?error=Failed to fetch Google profile', request.url));
    }

    // 3. Transform Google User data to our auth platform representation
    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name || userData.given_name || userData.email.split('@')[0],
      avatar: userData.picture,
      role: 'user', // Default role assigning
      provider: 'google',
    };

    // 4. Create custom JWT session payload
    const session = await encrypt(user);

    // 5. Store session within an HTTP-Only Secure Cookie
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    // 6. Redirect to home successfully
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    return NextResponse.redirect(new URL('/?error=Internal server error during Google OAuth setup', request.url));
  }
}
