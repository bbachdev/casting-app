'use server'

import db from '@/db/db'
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { lucia } from '@/utils/auth';
import { cache } from 'react';
import { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type ServerActionResponse = {
  status: number;
  body: any;
}

export async function attemptSignIn(email: string, password: string) : Promise<ServerActionResponse> {
  const userList = await db.select({
    id: userTable.id,
    email: userTable.email,
    hashedPassword: userTable.hashedPassword,
    displayName: userTable.displayName
  }).from(userTable).where(eq(userTable.email, email)).limit(1);

  //If no user is found, return error
  if (userList.length === 0) {
    return {
      status: 401,
      body: 'The email or password provided is incorrect.'
    }
  }
  
  const user = userList[0];
  const isMatch = await Bun.password.verify(password, ''+user.hashedPassword)

  //If passwords don't match, return error
  if (!isMatch) {
    return {
      status: 401,
      body: 'The email or password provided is incorrect.'
    }
  }

  //Create session and log in user
  const session = await lucia.createSession(user.id, { email: user.email, displayName: user.displayName });
  const sessionCookie = lucia.createSessionCookie(session.id);

  //Return success response with session cookie
  return {
    status: 302,
    body: {
      location: "/",
      "set-cookie": sessionCookie.serialize()
    }
  }
}

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
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

export async function signOut() {
  const { session } = await validateRequest();
  if(!session) {
    return {
      status: 401,
      body: 'Unauthorized.'
    }
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return {
    status: 200,
    body: 'Signed out successfully.'
  }
}