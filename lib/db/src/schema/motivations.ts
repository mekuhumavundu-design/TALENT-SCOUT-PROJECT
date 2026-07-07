import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const motivationsTable = pgTable("motivations", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author"),
  sport: text("sport"), // null = universal
  category: text("category").notNull().default("mindset"), // mindset | physical | tactical | recovery
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Motivation = typeof motivationsTable.$inferSelect;
