'use server'
import { ServerActionResponse } from '@/util/actions';
import drizzle from '@/lib/drizzle';
import { userTable } from '@/db/schema'
import { eq } from 'drizzle-orm';

import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { createSession } from './auth';
import { redirect } from 'next/navigation'

type User = typeof userTable.$inferInsert

export const createUser = async (email: string, password: string, displayName: string, dob: Date) : Promise<ServerActionResponse> => {
  //Verify data is present
  if(!email || !password || !displayName || !dob) {
    return ServerActionResponse(400, 'Please fill out all fields.');
  }

  try{
    //Check if user already exists
    console.log("==Check if user exists")
    const user = await drizzle.query.userTable.findFirst({
      where: eq(userTable.email, email)
    });

    if(user) {
      return ServerActionResponse(409, 'A user with this email already exists. Please sign in or use a different email.');
    }

    //Hash password
    console.log("==Hash password")
    const argon2id = new Argon2id();
    password = await argon2id.hash(password);

    console.log("==Create user")
    //Create user
    const newUser: User = {
      id: generateId(15),
      email,
      hashedPassword: password,
      createdAt: new Date(),
      displayName,
      dateOfBirth: dob.toLocaleString('en-US')
    }
    const createdUser = await drizzle.insert(userTable).values(newUser).returning({ userId: userTable.id, email: userTable.email, displayName: userTable.displayName});

    //Generate session for new user
    await createSession(createdUser[0].userId);
  }catch(e){
    console.error("Error creating user: ", e);
    return ServerActionResponse(500, 'An error occurred. Please try again later.');
  }
  //Redirect to dashboard (Outside of try-catch due to redirect's behavior: https://github.com/vercel/next.js/issues/49298)
  redirect('/dashboard');
}