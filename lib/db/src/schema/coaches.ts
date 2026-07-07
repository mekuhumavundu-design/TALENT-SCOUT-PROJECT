import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coachesTable = pgTable("coaches", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  organization: text("organization"),
  licenseNumber: text("license_number"),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCoachSchema = createInsertSchema(coachesTable).omit({ id: true, createdAt: true, isVerified: true });
export type InsertCoach = z.infer<typeof insertCoachSchema>;
export type Coach = typeof coachesTable.$inferSelect;
