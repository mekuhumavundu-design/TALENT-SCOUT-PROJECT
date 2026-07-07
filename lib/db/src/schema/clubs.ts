import { pgTable, serial, integer, text, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const clubsTable = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region").notNull(),
  city: text("city"),
  tier: text("tier").notNull().default("grassroots"), // grassroots | academy | semi_pro | professional
  sports: jsonb("sports").$type<string[]>().notNull().default([]),
  description: text("description"),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  foundedYear: integer("founded_year"),
  memberCount: integer("member_count"),
  isVerified: boolean("is_verified").default(false),
  isOpen: boolean("is_open").default(true),     // accepting scouting requests
  openPositions: jsonb("open_positions").$type<{ sport: string; position: string; ageMin: number; ageMax: number }[]>().default([]),
  achievements: text("achievements"),
  scoutingFocus: text("scouting_focus"),         // what they look for in athletes
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Club = typeof clubsTable.$inferSelect;

export const clubFollowingsTable = pgTable("club_followings", {
  id: serial("id").primaryKey(),
  clubId: integer("club_id").notNull(),
  athleteId: integer("athlete_id").notNull(),
  athleteName: text("athlete_name"),
  athleteSport: text("athlete_sport"),
  requestMessage: text("request_message"),
  status: text("status").notNull().default("pending"), // pending | accepted | declined | monitoring
  clubNote: text("club_note"),                          // internal note from club
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ClubFollowing = typeof clubFollowingsTable.$inferSelect;
