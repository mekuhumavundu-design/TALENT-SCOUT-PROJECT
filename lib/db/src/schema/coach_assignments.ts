import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const coachAssignmentsTable = pgTable("coach_assignments", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  coachId: integer("coach_id").notNull(),
  status: text("status").notNull().default("active"), // active | ended
  sport: text("sport"),
  goals: text("goals"),
  notes: text("notes"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CoachAssignment = typeof coachAssignmentsTable.$inferSelect;
