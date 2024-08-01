'use server'

import db from '@/db/db'
import { userTable } from '@/db/schema';

async function attemptSignIn(email: string, password: string) {
  const userList = await db.select({
    id: userTable.id,
    email: userTable.email,
    hashedPassword: userTable.hashedPassword,
    displayName: userTable.displayName
  }).from(userTable).limit(1);

  //If no user is found, return error
  if (userList.length === 0) {
    //TODO: Create error response
    return null;
  }
  
  const user = userList[0];
  const passHash = await Bun.password.hash(password)

  //If passwords don't match, return error
  if (user.hashedPassword !== passHash) {
    //TODO: Create error response
    return null;
  }
}