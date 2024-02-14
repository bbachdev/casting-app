'use server'
import { ServerActionResponse } from '@/util/actions';
import { eq } from 'drizzle-orm';
import drizzle from '@/lib/drizzle';
import { userTable } from '@/db/schema';
import { lucia } from '@/lib/lucia';
import { cookies } from "next/headers";

export const checkEmail = async (email: string) : Promise<ServerActionResponse> => {
  const user = await drizzle.query.userTable.findFirst({
    where: eq(userTable.email, email)
  })

  return (user) ? ServerActionResponse(200, `User exists`) : ServerActionResponse(404, `User doesn't exist`);
}

export const attemptLogin = async (email: string, password: string) : Promise<ServerActionResponse> => {
  const user = await drizzle.query.userTable.findFirst({
    where: eq(userTable.email, email)
  })
  console.log("User: ", user)

  if (!user) {
    return ServerActionResponse(404, 'User not found');
  }

  //TODO: Verify password w/ bcrypt


  return ServerActionResponse(200, user);
}

export const createSession = async (userId: string) : Promise<ServerActionResponse> => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = cookies()
  cookieStore.set({
    name: "session",
    path: "/",
    value: sessionCookie.serialize(),
  })
  
  return ServerActionResponse(200, `Session created for user ${userId}`);
}