import { Google, Apple } from "arctic"
import db from '@/db/db'
import { userTable, oAuthAccountTable, User, NewUser, OAuthAccount } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URI!)

// export const apple = new Apple({}, process.env.APPLE_REDIRECT_URI)

// eq(oAuthAccountTable.providerId, oauthAccount.providerId), eq(oAuthAccountTable.providerUserId, oauthAccount.providerUserId)

export async function getUserFromOAuthProvider(user: NewUser, oauthAccount: OAuthAccount) : Promise<User | null> {
  const existingAccount = await db.select({userId: oAuthAccountTable.userId, oAuthAccountId: oAuthAccountTable.providerUserId}).
  from(oAuthAccountTable).where(and(eq(oAuthAccountTable.providerId, oauthAccount.providerId), eq(oAuthAccountTable.providerUserId, oauthAccount.providerUserId))).limit(1);

  if(existingAccount.length === 0) {
    //Check if email exists and create user if not
    try{
      const userList : User[] = await db.select().from(userTable).where(eq(userTable.email, user.email)).limit(1);
      if(userList.length === 0) {
        const newUser = await db.insert(userTable).values(user).returning({id:userTable.id});
      }

      //Insert oAuth account
      const newOAuthRecord = await db.insert(oAuthAccountTable).values(oauthAccount).returning({id:oAuthAccountTable.providerUserId});
      if(newOAuthRecord.length === 0) {
        return null;
      }

      return userList[0];
    }catch(e) {
      console.log(e);
      return null
    } 
  }else {
    const userList : User[] = await db.select().from(userTable).where(eq(userTable.id, existingAccount[0].userId)).limit(1);
    if(userList.length === 0) {
      return null;
    }
    return userList[0];
  }
}