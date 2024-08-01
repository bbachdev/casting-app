import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
  email: text("email").notNull(),
  hashedPassword: text("hashed_password"),
  displayName: text("display_name"),
  dateOfBirth: timestamp("date_of_birth", {
    withTimezone: true,
    mode: "date"
  })
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});