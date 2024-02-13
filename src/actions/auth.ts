'use server'
import { ServerActionResponse } from '@/util/actions';
import drizzle from '@/lib/drizzle';

export const attemptLogin = async (email: string, password: string) : Promise<ServerActionResponse> => {
  const user = await drizzle.query.userTable.findFirst({
    with: {
      email
    }
  });

  if (!user) {
    return ServerActionResponse(404, 'User not found');
  }

  //TODO: Verify password w/ bcrypt


  return ServerActionResponse(200, user);
}