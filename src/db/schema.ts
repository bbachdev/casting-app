import { pgTable, text, serial, primaryKey, timestamp, date } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").notNull(),
  displayName: text("display_name").notNull(),
  profileImageUrl: text("profile_image_url"),
  dateOfBirth: date("date_of_birth").notNull()
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
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull(),
  endDate: timestamp("end_date").notNull(),
  userId: text("user_id").notNull().references(() => userTable.id)
});

export const tag = pgTable("tag", {
  tagId: serial("id").primaryKey(),
  tagName: text("tag_name").notNull(),
});

export const projectTag = pgTable("project_tag", {
  projectId: serial("project_id").notNull().references(() => projectTable.id),
  tagId: serial("tag_id").notNull().references(() => tag.tagId),
  }, (table) => {
    return {
      pk: primaryKey({ columns: [table.projectId, table.tagId] }),
    };
});

export const roleTable = pgTable("role", {
  id: serial("id").primaryKey(),
  roleTitle: text("role_title").notNull(),
  projectId: serial("project_id").notNull().references(() => projectTable.id),
  imageUrl: text("image_url").notNull(),
});

export const audition = pgTable("audition", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").notNull().references(() => projectTable.id),
  roleId: serial("role_id").notNull().references(() => roleTable.id),
  userId: text("user_id").notNull().references(() => userTable.id),
  srcUrl: text("src_url").notNull(),
  createdAt: timestamp("created_at").notNull()
});
