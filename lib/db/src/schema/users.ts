import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  role: text("role").notNull().default("athlete"),
  fullName: text("full_name"),
  country: text("country"),
  phone: text("phone"),
  organization: text("organization"),
  profileCompleted: boolean("profile_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
