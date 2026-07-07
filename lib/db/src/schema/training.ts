import { pgTable, serial, integer, text, real, boolean, timestamp } from "drizzle-orm/pg-core";

export const trainingSessionsTable = pgTable("training_sessions", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  athleteName: text("athlete_name"),
  sport: text("sport").notNull(),
  activityType: text("activity_type").notNull(), // sprint | drills | gym | match_practice | endurance | agility
  title: text("title").notNull(),
  status: text("status").notNull().default("live"), // live | completed
  notes: text("notes"),
  videoUrl: text("video_url"),
  durationMinutes: integer("duration_minutes"),
  distanceMeters: integer("distance_meters"),
  location: text("location"),
  isPublic: boolean("is_public").default(true),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type TrainingSession = typeof trainingSessionsTable.$inferSelect;

export const trainingEntriesTable = pgTable("training_entries", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  exerciseName: text("exercise_name").notNull(),
  setValue: real("set_value"),
  unit: text("unit"),
  reps: integer("reps"),
  setNumber: integer("set_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type TrainingEntry = typeof trainingEntriesTable.$inferSelect;

export const coachingFeedbackTable = pgTable("coaching_feedback", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  scoutId: integer("scout_id"),
  scoutName: text("scout_name").notNull(),
  scoutOrg: text("scout_org"),
  comment: text("comment").notNull(),
  drillFocus: text("drill_focus"),
  rating: integer("rating"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CoachingFeedback = typeof coachingFeedbackTable.$inferSelect;
