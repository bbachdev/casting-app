import { Lucia } from "lucia";
import { adapter as DrizzleAdapter } from "../db/adapter";

interface DatabaseUserAttributes {
	displayName: string;
  email: string;
  profileImageUrl: string;
}

export const lucia = new Lucia(DrizzleAdapter, {
	sessionCookie: {
    name: 'session',
    expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
	}
}