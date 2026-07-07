import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const pushSubscriptionsTable = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  recipientType: text("recipient_type").notNull(),
  recipientId: text("recipient_id").notNull(),
  endpoint: text("endpoint").notNull().unique(),
  keysP256dh: text("keys_p256dh").notNull(),
  keysAuth: text("keys_auth").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type PushSubscription = typeof pushSubscriptionsTable.$inferSelect;
