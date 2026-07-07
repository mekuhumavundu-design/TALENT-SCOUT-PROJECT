import { pgTable, serial, integer, text, real, boolean, timestamp, date, jsonb } from "drizzle-orm/pg-core";

// Standardized test battery per sport — published benchmarks
export const physicalTestsTable = pgTable("physical_tests", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  sport: text("sport").notNull(),
  testDate: date("test_date").notNull(),
  testLocation: text("test_location"),
  adminName: text("admin_name"),           // who administered
  adminRole: text("admin_role"),           // e.g. "FIFA-licensed coach"
  isVerified: boolean("is_verified").default(false),
  verifiedBy: text("verified_by"),

  // Universal physique
  height: real("height"),         // cm
  weight: real("weight"),         // kg
  reachHeight: real("reach_height"), // cm (for combat sports)

  // Speed / explosiveness
  sprint40m: real("sprint_40m"),   // seconds
  sprint60m: real("sprint_60m"),   // seconds
  sprint100m: real("sprint_100m"), // seconds
  reactionTime: real("reaction_time"), // milliseconds

  // Power / jump
  verticalJump: real("vertical_jump"),       // cm
  standingLongJump: real("standing_long_jump"), // cm
  broadJump: real("broad_jump"),             // cm

  // Agility
  shuttleRun: real("shuttle_run"),     // seconds (5-10-5)
  tTest: real("t_test"),               // seconds
  yBalance: real("y_balance"),         // composite score

  // Endurance
  beepTest: real("beep_test"),         // level reached
  cooperTest: real("cooper_test"),     // metres in 12 minutes
  vo2Max: real("vo2_max"),             // estimated ml/kg/min

  // Strength
  pushUpMax: integer("push_up_max"),   // reps
  pullUpMax: integer("pull_up_max"),   // reps
  coreEndurance: integer("core_endurance"), // seconds plank

  // Sport-specific extra data (flexible JSON for boxing rounds, swim splits, etc.)
  extraData: jsonb("extra_data"),

  // Wingspan / reach
  wingspan: real("wingspan"),          // cm
  armReach: real("arm_reach"),         // cm

  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type PhysicalTest = typeof physicalTestsTable.$inferSelect;

// Published benchmarks by sport + tier (for comparison display)
export const benchmarksTable = pgTable("benchmarks", {
  id: serial("id").primaryKey(),
  sport: text("sport").notNull(),
  level: text("level").notNull(), // elite | professional | development | youth
  metric: text("metric").notNull(),
  minValue: real("min_value"),
  goodValue: real("good_value"),
  eliteValue: real("elite_value"),
  unit: text("unit"),
  lowerIsBetter: boolean("lower_is_better").default(false),
});
