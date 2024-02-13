'use server'
import { ServerActionResponse } from '@/util/actions';
import drizzle from '@/lib/drizzle';
import { userTable } from '@/db/schema'
import { eq } from 'drizzle-orm';

import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

type User = typeof userTable.$inferInsert

export const createUser = async (email: string, password: string, displayName: string) : Promise<ServerActionResponse> => {
  //Check if user already exists
  const user = await drizzle.query.userTable.findFirst({
    where: eq(userTable.email, email)
  });

  if(user) {
    return ServerActionResponse(409, 'A user with this email already exists. Please sign in or use a different email.');
  }

  //Hash password
  const argon2id = new Argon2id();
  password = await argon2id.hash(password);

  //Create user
  const newUser: User = {
    id: generateId(15),
    email,
    hashedPassword: password,
    createdAt: new Date(),
    displayName
  }
  const createdUser = await drizzle.insert(userTable).values(newUser).returning({ userId: userTable.id, email: userTable.email, displayName: userTable.displayName});

  return ServerActionResponse(201, createdUser);
}