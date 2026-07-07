import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const clipsTable = pgTable("clips", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  title: text("title").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  durationSeconds: integer("duration_seconds").notNull(),
  timestamp: timestamp("timestamp").notNull(),

  // MANDATORY two-angle system
  angle: text("angle").notNull().default("match"),
  // angle: "match" = full match/competition footage | "isolated" = drill/technique close-up
  recordedAt: timestamp("recorded_at"),        // actual recording date (user-supplied)
  competition: text("competition"),            // tournament/match name for match clips
  drillName: text("drill_name"),               // drill type for isolated clips
  timestampNotes: text("timestamp_notes"),     // e.g. "Goals at 1:23, 4:45"

  eventName: text("event_name"),
  eventLocation: text("event_location"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  verificationStatus: text("verification_status").notNull().default("unverified"),
  verifiedByCoachId: integer("verified_by_coach_id"),
  verificationNotes: text("verification_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertClipSchema = createInsertSchema(clipsTable).omit({
  id: true,
  createdAt: true,
  verificationStatus: true,
  verifiedByCoachId: true,
  verificationNotes: true,
});
export type InsertClip = z.infer<typeof insertClipSchema>;
export type Clip = typeof clipsTable.$inferSelect;
