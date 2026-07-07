import { pgTable, serial, integer, text, real, timestamp } from "drizzle-orm/pg-core";

export const trialRequestsTable = pgTable("trial_requests", {
  id: serial("id").primaryKey(),
  scoutId: integer("scout_id").notNull(),
  athleteId: integer("athlete_id").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"), // pending | approved | declined | completed
  contractValue: real("contract_value"), // filled when trial converts
  placementFeePercent: real("placement_fee_percent").default(15),
  placementFeePaid: real("placement_fee_paid"),
  placementFeeStatus: text("placement_fee_status").default("unpaid"), // unpaid | invoiced | paid
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type TrialRequest = typeof trialRequestsTable.$inferSelect;
