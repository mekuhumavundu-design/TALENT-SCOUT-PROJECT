import { pgTable, serial, integer, text, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  recipientType: text("recipient_type").notNull(), // "scout" | "athlete"
  recipientId: integer("recipient_id").notNull(),
  type: text("type").notNull(), // "new_match" | "trial_update" | "message" | "verification"
  title: text("title").notNull(),
  body: text("body").notNull(),
  isRead: boolean("is_read").default(false),
  meta: jsonb("meta"), // e.g. { athleteId, searchId, trialId }
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Notification = typeof notificationsTable.$inferSelect;
