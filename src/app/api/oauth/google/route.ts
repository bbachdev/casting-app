import { lucia } from '@/utils/auth';
import { getUserFromOAuthProvider, google } from '@/utils/oAuth' 
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { NextRequest } from 'next/server';
import { parseCookies } from "oslo/cookie";
import { NewUser, NewOAuthAccount } from '@/db/schema';


export default async function GET(req: NextRequest) {
  const cookies = parseCookies(req.headers.get("Cookie") ?? "");
  const stateCookie = cookies.get("oauth_state") ?? null;
  const codeVerifierCookie = cookies.get("oauth_code_verifier") ?? null;

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
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
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
      dateOfBirth: googleUser.birthday,
      imageUrl: googleUser.photoUrl,
    }

    const oauthAccount : NewOAuthAccount = {
      providerId: 'google',
      providerUserId: googleUser.localId,
      userId: googleUser.localId
    }

    //Create user in database if they don't exist
    const user = await getUserFromOAuthProvider(parsedGoogleUser, oauthAccount)
    if(user === null) {
      return new Response(null, {
        status: 500
      });
    }

    //Create session and log in user
    const session = await lucia.createSession(user.id, { email: user.email, displayName: user.displayName, photoUrl: user.imageUrl });
		const sessionCookie = lucia.createSessionCookie(session.id);
    return new Response(null, {
      status: 302,
      headers: {
        "Location:": "/dashboard",
        "Set-Cookie": sessionCookie.serialize()
      }
    });

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