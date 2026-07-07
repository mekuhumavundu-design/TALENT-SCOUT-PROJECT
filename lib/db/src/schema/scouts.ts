import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scoutsTable = pgTable("scouts", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  organization: text("organization").notNull(),
  role: text("role"),
  applicationStatus: text("application_status").notNull().default("pending"),
  applicationNotes: text("application_notes"),
  approvedAt: timestamp("approved_at"),
  tosAcceptedAt: timestamp("tos_accepted_at"),
  tosVersion: text("tos_version"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertScoutSchema = createInsertSchema(scoutsTable).omit({
  id: true,
  createdAt: true,
  applicationStatus: true,
  approvedAt: true,
  tosAcceptedAt: true,
  tosVersion: true,
});
export type InsertScout = z.infer<typeof insertScoutSchema>;
export type Scout = typeof scoutsTable.$inferSelect;
