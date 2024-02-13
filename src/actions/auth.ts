'use server'
import { ServerActionResponse } from '@/util/actions';
import { eq } from 'drizzle-orm';
import drizzle from '@/lib/drizzle';
import { userTable } from '@/db/schema';

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