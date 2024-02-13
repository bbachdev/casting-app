import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").notNull(),
  displayName: text("display_name").notNull()
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

export const projectTable = pgTable("project", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull(),
  endDate: timestamp("end_date").notNull(),
  userId: text("user_id").notNull().references(() => userTable.id)
});

export const tag = pgTable("tag", {
  projectId: text("project_id").notNull().references(() => projectTable.id),
  tagName: text("tag_name").notNull()
});

export const projectTag = pgTable("project_tag", {
  projectId: text("project_id").notNull().references(() => projectTable.id),
  tagId: text("tag_id").notNull().references(() => tag.projectId),
});

export const roleTable = pgTable("role", {
  id: text("id").primaryKey(),
  roleTitle: text("role_title").notNull(),
  projectId: text("project_id").notNull().references(() => projectTable.id),
  imageUrl: text("image_url").notNull(),
});

export const audition = pgTable("audition", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projectTable.id),
  roleId: text("role_id").notNull().references(() => roleTable.id),
  userId: text("user_id").notNull().references(() => userTable.id),
  srcUrl: text("src_url").notNull(),
  createdAt: timestamp("created_at").notNull()
});
