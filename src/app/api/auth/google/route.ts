import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    return NextResponse.json(
      { error: 'Google Client ID is not configured in the environment' },
      { status: 500 }
    );
  }

  // Automatically determine the protocol and host dynamically, or use env variable
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth/google/callback`;

  // Define Google OAuth 2.0 endpoint
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  
  // Set parameters
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  
  // Redirect user to Google for authentication
  return NextResponse.redirect(authUrl.toString());
}
