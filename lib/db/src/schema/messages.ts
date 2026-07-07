import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  // senderType: "athlete" | "scout" | "admin"
  senderType: text("sender_type").notNull(),
  senderId: integer("sender_id").notNull(),
  senderName: text("sender_name"),

  // recipientType: "athlete" | "scout" | "admin"
  recipientType: text("recipient_type").notNull(),
  recipientId: integer("recipient_id").notNull(),
  recipientName: text("recipient_name"),

  subject: text("subject"),
  body: text("body").notNull(),
  isRead: boolean("is_read").default(false),
  threadId: integer("thread_id"),   // groups replies into threads

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Message = typeof messagesTable.$inferSelect;
