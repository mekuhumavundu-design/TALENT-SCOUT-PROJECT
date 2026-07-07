import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const pulsePostsTable = pgTable("pulse_posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  sportType: text("sport_type").notNull().default("all"),
  postType: text("post_type").notNull().default("news"),
  authorId: text("author_id"),
  authorName: text("author_name"),
  location: text("location"),
  imageUrl: text("image_url"),
  likesCount: integer("likes_count").notNull().default(0),
  flagged: boolean("flagged").notNull().default(false),
  isHighlight: boolean("is_highlight").notNull().default(false),
});

export type PulsePost = typeof pulsePostsTable.$inferSelect;
export type InsertPulsePost = typeof pulsePostsTable.$inferInsert;
