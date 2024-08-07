import { Google, Apple } from "arctic"
import db from '@/db/db'
import { userTable, oAuthAccountTable, User, NewUser, OAuthAccount, NewProfile, profileTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URI!)

// export const apple = new Apple({}, process.env.APPLE_REDIRECT_URI)

// eq(oAuthAccountTable.providerId, oauthAccount.providerId), eq(oAuthAccountTable.providerUserId, oauthAccount.providerUserId)

export async function getUserFromOAuthProvider(user: NewUser, oauthAccount: OAuthAccount) : Promise<User | null> {
  const existingAccount = await db.select({userId: oAuthAccountTable.userId, oAuthAccountId: oAuthAccountTable.providerUserId}).
  from(oAuthAccountTable).where(and(eq(oAuthAccountTable.providerId, oauthAccount.providerId), eq(oAuthAccountTable.providerUserId, oauthAccount.providerUserId))).limit(1);

  if(existingAccount.length === 0) {
    //Check if email exists and create user if not
    try{
      var userList : User[] = await db.select().from(userTable).where(eq(userTable.email, user.email)).limit(1);
      var newUserId : string | null = null;
      if(userList.length === 0) {
        const newUser = await db.insert(userTable).values(user).returning({id:userTable.id, email: userTable.email, displayName: userTable.displayName, dateOfBirth: userTable.dateOfBirth, imageUrl: userTable.imageUrl, hashedPassword: userTable.hashedPassword});
        userList = [newUser[0]]

        // Create profile and associate with user
        const profile : NewProfile = {
          id: generateIdFromEntropySize(10),
          userId: userList[0].id
        }
        await db.insert(profileTable).values(profile);
      }

      //Insert oAuth account regardless of user creation
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