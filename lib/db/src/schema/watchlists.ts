import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const watchlistsTable = pgTable("watchlists", {
  id: serial("id").primaryKey(),
  scoutId: integer("scout_id").notNull(),
  athleteId: integer("athlete_id").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Watchlist = typeof watchlistsTable.$inferSelect;
