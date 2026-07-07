import { pgTable, serial, text, real, timestamp } from "drizzle-orm/pg-core";

export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  planName: text("plan_name").notNull(),
  status: text("status").notNull().default("trial"),
  amount: real("amount"),
  paidAt: timestamp("paid_at"),
});

export type Subscription = typeof subscriptionsTable.$inferSelect;
export type InsertSubscription = typeof subscriptionsTable.$inferInsert;
