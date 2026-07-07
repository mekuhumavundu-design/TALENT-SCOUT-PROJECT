import { pgTable, serial, integer, text, real, timestamp } from "drizzle-orm/pg-core";

export const invoicesTable = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  scoutId: integer("scout_id").notNull(),
  scoutName: text("scout_name"),
  clubName: text("club_name").notNull(),
  athleteId: integer("athlete_id").notNull(),
  athleteName: text("athlete_name"),
  contractValue: real("contract_value").notNull(),
  commissionPercent: real("commission_percent").notNull().default(6),
  commissionAmount: real("commission_amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("pending"),
  signedAt: timestamp("signed_at").notNull().defaultNow(),
  dueDate: timestamp("due_date").notNull(),
  paidAt: timestamp("paid_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Invoice = typeof invoicesTable.$inferSelect;
export type InsertInvoice = typeof invoicesTable.$inferInsert;
