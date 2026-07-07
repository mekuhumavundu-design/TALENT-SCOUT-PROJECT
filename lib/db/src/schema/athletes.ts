import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const athletesTable = pgTable("athletes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age"),
  sport: text("sport").notNull().default("Athletics"),
  stat: text("stat"),
  videoUrl: text("video_url"),
  town: text("town"),
  addedBy: text("added_by"),
  contactWhatsapp: text("contact_whatsapp"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Athlete = typeof athletesTable.$inferSelect;
export type InsertAthlete = typeof athletesTable.$inferInsert;
