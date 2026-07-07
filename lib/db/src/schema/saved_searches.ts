import { pgTable, serial, integer, text, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const savedSearchesTable = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  scoutId: integer("scout_id").notNull(),
  name: text("name").notNull(),
  filters: jsonb("filters").notNull(),
  alertEnabled: boolean("alert_enabled").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSavedSearchSchema = createInsertSchema(savedSearchesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertSavedSearch = z.infer<typeof insertSavedSearchSchema>;
export type SavedSearch = typeof savedSearchesTable.$inferSelect;
