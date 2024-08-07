import { google } from '@/utils/oAuth';
import { generateCodeVerifier, generateState } from "arctic";
import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from "next/headers";

export const dynamic = 'force-dynamic' // defaults to auto

export async function OPTIONS(req: NextRequest) {
  return new NextResponse('', {
    status: 200,
  })
}

export async function POST(req: NextRequest) {
  try {
    const { provider } = await req.json()
    console.log(provider)
    switch (provider) {
      case 'google':
        const state = generateState()
        const codeVerifier = generateCodeVerifier()
        if(provider === 'google') {
          const authUrl = await google.createAuthorizationURL(state, codeVerifier, 
            {scopes: ['email', 'profile']}
          )
          //authUrl.searchParams.set("access_type", "offline");
          cookies().set('oauth_state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
            maxAge: 60 * 10, // 10 minutes
            sameSite: 'lax',
            path: "/"
          })
          cookies().set('oauth_code_verifier', codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
            maxAge: 60 * 10, // 10 minutes
            sameSite: 'lax',
            path: "/"
          })
          console.log("Auth URL: ", authUrl.toString())
          return new NextResponse(authUrl.toString(), { status: 200 })
        }
      default:
        console.log("Invalid provider")
        return new Response('Invalid provider', { status: 400 })
    }
  }catch(e) {
    console.log(e)
    return new Response(null, {
      status: 500
    })
  }
}