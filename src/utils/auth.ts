import { Lucia } from "lucia";
import adapter from "@/db/authAdapter";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
  getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
      displayName: attributes.displayName,
      imageUrl: attributes.imageUrl,
      isNew: attributes.status === "new"
		};
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: {
			email: string;
      displayName: string;
      imageUrl: string;
      status: string;
      isNew: boolean;
		};
	}
}