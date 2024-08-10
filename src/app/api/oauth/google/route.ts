import { lucia } from '@/utils/auth';
import { getUserFromOAuthProvider, google } from '@/utils/oAuth' 
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { NextRequest, NextResponse } from 'next/server';
import { parseCookies } from "oslo/cookie";
import { cookies } from "next/headers";
import { NewUser, NewOAuthAccount } from '@/db/schema';


export async function GET(req: NextRequest) {
  const cookiesList = parseCookies(req.headers.get("Cookie") ?? "");
  const stateCookie = cookiesList.get("oauth_state") ?? null;
  const codeVerifierCookie = cookiesList.get("oauth_code_verifier") ?? null;

  const url = new URL(req.url);
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

  // Verify state
	if (!state || !stateCookie || !code || stateCookie !== state) {
		return new Response(null, {
			status: 400
		});
	}

  try {
    if(!codeVerifierCookie) {
      return new Response(null, {
        status: 400
      });
    }
    const tokens = await google.validateAuthorizationCode(code, codeVerifierCookie)
    const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    //TODO: Perhaps try to make this a type (if needed)?
    const googleUser = await response.json();

    console.log(googleUser);
    //Parse user data
    const parsedGoogleUser : NewUser = {
      id: generateIdFromEntropySize(10),
      email: googleUser.email,
      displayName: googleUser.name,
      imageUrl: googleUser.picture,
    }

    const oauthAccount : NewOAuthAccount = {
      providerId: 'google',
      providerUserId: googleUser.id,
      userId: parsedGoogleUser.id
    }

    //Create user in database if they don't exist
    const user = await getUserFromOAuthProvider(parsedGoogleUser, oauthAccount)
    if(user === null) {
      return new Response(null, {
        status: 500
      });
    }

    //Create session and log in user
    const session = await lucia.createSession(user.id, { email: user.email, displayName: user.displayName, photoUrl: user.imageUrl, status: user.status });
		const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie)
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL+"/dashboard");

  }catch(e) {
    console.log(e);
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
  }
}