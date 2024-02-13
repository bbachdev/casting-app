import { Lucia } from "lucia";
import { adapter as DrizzleAdapter } from "../db/adapter";

export const lucia = new Lucia(DrizzleAdapter, {
	sessionCookie: {
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
	}
}