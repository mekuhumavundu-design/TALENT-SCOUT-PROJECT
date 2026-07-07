import { pgTable, serial, text, real, integer, timestamp, date } from "drizzle-orm/pg-core";

export const combineEventsTable = pgTable("combine_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  region: text("region").notNull(),
  eventDate: date("event_date").notNull(),
  sports: text("sports").array(),
  maxParticipants: integer("max_participants").default(50),
  registeredCount: integer("registered_count").default(0),
  price: real("price").notNull().default(0), // 0 = free, otherwise paid
  currency: text("currency").default("USD"),
  description: text("description"),
  status: text("status").notNull().default("open"), // open | full | completed | cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const combineRegistrationsTable = pgTable("combine_registrations", {
  id: serial("id").primaryKey(),
  combineId: integer("combine_id").notNull(),
  athleteId: integer("athlete_id").notNull(),
  paymentStatus: text("payment_status").default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CombineEvent = typeof combineEventsTable.$inferSelect;
export type CombineRegistration = typeof combineRegistrationsTable.$inferSelect;
