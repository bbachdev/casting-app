import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("password_hash"),
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

export const oAuthAccountTable = pgTable("oauth_account", {
  providerId: text("provider_id").notNull(),
  provider_user_id: text("provider_user_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  }, (table) => {
    return {
      pk: primaryKey({columns: [table.providerId, table.provider_user_id]})
    }
  }
)

export const profileTable = pgTable("profile", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	bio: text("bio"),
  imageUrl: text("image_url")
});

export const teamTable = pgTable("team", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	ownerId: text("owner_id")
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
  imageUrl: text("image_url")
});

export const teamMemberTable = pgTable("team_member", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	teamId: text("team_id")
		.notNull()
		.references(() => teamTable.id),
	role: text("role").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const projectTable = pgTable("project", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	ownerId: text("owner_id")
		.notNull()
		.references(() => teamTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
  deadline: timestamp("deadline", {
		withTimezone: true,
		mode: "date"
  }),
  imageUrl: text("image_url")
});

export const tagTable = pgTable("tag", {
	id: text("id").primaryKey(),
	name: text("name").notNull()
});

export const projectTagTable = pgTable("project_tag", {
	id: text("id").primaryKey(),
	projectId: text("project_id")
		.notNull()
		.references(() => projectTable.id),
	tagId: text("tag_id")
		.notNull()
		.references(() => tagTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const roleTagTable = pgTable("role_tag", {
	id: text("id").primaryKey(),
	roleId: text("role_id")
		.notNull()
		.references(() => roleTable.id),
	tagId: text("tag_id")
		.notNull()
		.references(() => tagTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const userTagTable = pgTable("user_tag", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	tagId: text("tag_id")
		.notNull()
		.references(() => tagTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const roleTable = pgTable("role", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
  projectId: text("project_id")
		.notNull()
		.references(() => projectTable.id),
	description: text("description"),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const submissionTable = pgTable("submission", {
	id: text("id").primaryKey(),
	fileName: text("fileName").notNull(),
  sourceUrl: text("source_url").notNull(),
  roleId: text("role_id")
		.notNull()
		.references(() => roleTable.id),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});