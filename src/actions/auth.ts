'use server'
import { ServerActionResponse } from '@/util/actions';
import { eq } from 'drizzle-orm';
import drizzle from '@/lib/drizzle';
import { userTable } from '@/db/schema';
import { lucia } from '@/lib/lucia';
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { redirect } from 'next/navigation'
import { cache } from 'react';
import { Session, User } from 'lucia';

export const checkEmail = async (email: string) : Promise<ServerActionResponse> => {
  const user = await drizzle.query.userTable.findFirst({
    where: eq(userTable.email, email)
  })

  return (user) ? ServerActionResponse(200, `User exists`) : ServerActionResponse(404, `User doesn't exist`);
}

export const attemptLogin = async (email: string, password: string) : Promise<ServerActionResponse> => {
  try{
    const user = await drizzle.query.userTable.findFirst({
      where: eq(userTable.email, email)
    })
    console.log("User: ", user)

    if (!user) {
      return ServerActionResponse(404, 'User not found');
    }

    const argon2id = new Argon2id();
    if(!await argon2id.verify(user.hashedPassword, password)) {
      return ServerActionResponse(401, 'Incorrect password');
    }

    //Create session for user
    await createSession(user.id);
  }catch(e){
    console.error("Error logging in: ", e);
    return ServerActionResponse(500, 'An error occurred. Please try again later.');
  }
  //Redirect to dashboard (Outside of try-catch due to redirect's behavior: https://github.com/vercel/next.js/issues/49298)
  redirect('/dashboard');
}

export const createSession = async (userId: string) : Promise<ServerActionResponse> => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  
  return ServerActionResponse(200, `Session created for user ${userId}`);
}

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    console.log("Cookie name: ", lucia.sessionCookieName)
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

    console.log("Session ID: ", sessionId)
		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
    console.log("Result: ", result)
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);

export const signOut = async () : Promise<ServerActionResponse> => {
  const { session } = await validateRequest();
	if (!session) {
		return {
      success: false,
      status: 401,
      response: "No session exists" ,
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/signin");
}