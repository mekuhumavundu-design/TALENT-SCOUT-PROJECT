import { pgTable, serial, integer, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const athleteAnalysesTable = pgTable("athlete_analyses", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  sport: text("sport").notNull(),
  title: text("title"),
  imageBase64: text("image_base64"), // stored as base64 for demo
  analysisJson: jsonb("analysis_json"), // full AI analysis result
  overallScore: integer("overall_score"), // 0-100
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type AthleteAnalysis = typeof athleteAnalysesTable.$inferSelect;
