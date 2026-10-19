import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

/**
 * FOUNDATION SCHEMA
 * 
 * STATUS: PRELIMINARY
 * 
 * No application, guardian, or sensitive child tables are created yet.
 * This file is reserved for future Phase 3/4 migrations (applications, payment_records, audit_logs).
 * 
 * A minimal, non-sensitive placeholder table is included below to verify the Drizzle + Neon 
 * connection and migration workflow without inventing premature business logic or sensitive fields.
 */

export const programmeSettings = pgTable("programme_settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Export schema object for Drizzle ORM initialization
export const schema = {
  programmeSettings,
};