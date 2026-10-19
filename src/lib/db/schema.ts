import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  date,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * DATABASE SCHEMA
 *
 * STATUS: APPROVED FOR IMPLEMENTATION
 *
 * This schema implements the registration data model approved in Phase 3.3.
 * All fields, constraints, and relationships follow the Blueprint specifications.
 *
 * Key design decisions:
 * - Multi-boy support: guardians table separate from applications
 * - 4 payment statuses: unpaid, awaiting_verification, paid, payment_failed
 * - 6 application statuses: submitted, under_review, needs_information, approved, not_approved, withdrawn
 * - Non-sequential public references for security
 * - Idempotency via submission_token
 * - Duplicate detection via (guardian_id, candidate_full_name, candidate_date_of_birth)
 */

// ============================================================================
// ENUMS
// ============================================================================

export const paymentMethodEnum = pgEnum("payment_method", [
  "mpesa",
  "bank_transfer",
  "pay_later",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "unpaid",
  "awaiting_verification",
  "paid",
  "payment_failed",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "submitted",
  "under_review",
  "needs_information",
  "approved",
  "not_approved",
  "withdrawn",
]);

// ============================================================================
// GUARDIANS TABLE
// ============================================================================

export const guardians = pgTable(
  "guardians",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(), // E.164 format
    email: text("email"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    // Phone must be unique to prevent duplicate guardian records
    phoneUniqueIdx: uniqueIndex("guardians_phone_unique_idx").on(table.phone),
  }),
);

// ============================================================================
// APPLICATIONS TABLE
// ============================================================================

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    guardianId: uuid("guardian_id")
      .notNull()
      .references(() => guardians.id, { onDelete: "restrict" }),

    // Public reference (non-sequential, non-guessable)
    reference: text("reference").notNull(),

    // Idempotency key (UUID generated client-side per form load)
    submissionToken: text("submission_token").notNull(),

    // Candidate (boy) information
    candidateFullName: text("candidate_full_name").notNull(),
    candidateDateOfBirth: date("candidate_date_of_birth").notNull(),

    // Payment choice
    paymentMethodChosen: paymentMethodEnum("payment_method_chosen").notNull(),

    // Application status
    applicationStatus: applicationStatusEnum("application_status")
      .notNull()
      .default("submitted"),

    // Consent tracking
    consentVersion: text("consent_version").notNull(),
    consentedAt: timestamp("consented_at", { withTimezone: true }).notNull(),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    // Reference must be unique (public identifier)
    referenceUniqueIdx: uniqueIndex("applications_reference_unique_idx").on(
      table.reference,
    ),

    // Submission token must be unique (idempotency)
    submissionTokenUniqueIdx: uniqueIndex(
      "applications_submission_token_unique_idx",
    ).on(table.submissionToken),

    // Duplicate detection: same guardian + same candidate name + same DOB
    duplicateDetectionIdx: uniqueIndex(
      "applications_duplicate_detection_idx",
    ).on(table.guardianId, table.candidateFullName, table.candidateDateOfBirth),

    // Index for guardian lookups (when viewing all applications for a guardian)
    guardianIdIdx: index("applications_guardian_id_idx").on(table.guardianId),

    // Index for status filtering (staff dashboard)
    applicationStatusIdx: index("applications_status_idx").on(
      table.applicationStatus,
    ),
  }),
);

// ============================================================================
// PAYMENT RECORDS TABLE
// ============================================================================

export const paymentRecords = pgTable(
  "payment_records",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // One payment record per application
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "restrict" }),

    // Amount in minor units (KSh 11,700 = 1,170,000 cents)
    amountMinorUnits: integer("amount_minor_units").notNull(),

    // Payment status
    paymentStatus: paymentStatusEnum("payment_status")
      .notNull()
      .default("unpaid"),

    // Staff verification (nullable until verified)
    verifiedBy: uuid("verified_by"), // Future FK to staff_users
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    verificationNotes: text("verification_notes"),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    // One payment record per application
    applicationIdUniqueIdx: uniqueIndex(
      "payment_records_application_id_unique_idx",
    ).on(table.applicationId),

    // Index for status filtering (staff payment verification queue)
    paymentStatusIdx: index("payment_records_status_idx").on(
      table.paymentStatus,
    ),
  }),
);

// ============================================================================
// PROGRAMME SETTINGS TABLE (existing, preserved)
// ============================================================================

export const programmeSettings = pgTable("programme_settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ============================================================================
// RELATIONSHIPS
// ============================================================================

export const guardiansRelations = relations(guardians, ({ many }) => ({
  applications: many(applications),
}));

export const applicationsRelations = relations(
  applications,
  ({ one, many }) => ({
    guardian: one(guardians, {
      fields: [applications.guardianId],
      references: [guardians.id],
    }),
    paymentRecord: one(paymentRecords, {
      fields: [applications.id],
      references: [paymentRecords.applicationId],
    }),
  }),
);

export const paymentRecordsRelations = relations(paymentRecords, ({ one }) => ({
  application: one(applications, {
    fields: [paymentRecords.applicationId],
    references: [applications.id],
  }),
}));

// ============================================================================
// SCHEMA EXPORT
// ============================================================================

export const schema = {
  guardians,
  applications,
  paymentRecords,
  programmeSettings,
  // Enums
  paymentMethodEnum,
  paymentStatusEnum,
  applicationStatusEnum,
};
