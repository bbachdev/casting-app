import { google } from '@/utils/oAuth';
import { generateCodeVerifier, generateState } from "arctic";
import { NextRequest } from 'next/server';
import { serializeCookie } from "oslo/cookie";

export default function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const provider = searchParams.get('provider')
  switch (provider) {
    case 'google':
      const state = generateState()
      const codeVerifier = generateCodeVerifier()
      if(provider === 'google') {
        const authUrl = google.createAuthorizationURL(state, codeVerifier, 
          {scopes: ['email', 'profile']}
        )
        const headers = new Headers()
        headers.set('Location', authUrl.toString())
        headers.set('Set-Cookie', serializeCookie("oauth_state", state, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
          maxAge: 60 * 10, // 10 minutes
          path: "/"
        }))
        headers.append('Set-Cookie', serializeCookie("oauth_code_verifier", codeVerifier, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
          maxAge: 60 * 10, // 10 minutes
          path: "/"
        }))
        return new Response('Redirecting to Google OAuth...', {
          status: 302,
          headers
        })
      }
    default:
      return new Response('Invalid provider', { status: 400 })
  }
}