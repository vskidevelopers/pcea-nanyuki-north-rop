import { z } from "zod";
import { registrationRules } from "@/content/programme";

/**
 * REGISTRATION FORM VALIDATION
 *
 * STATUS: IMPLEMENTED
 *
 * This schema is the authoritative server-side validation for registration form input.
 * All client-side validation is for UX only; this schema is used by the Server Action
 * to validate all data before database operations.
 *
 * Key validation rules:
 * - Guardian name: 2-100 chars, letters/spaces/hyphens/apostrophes only
 * - Guardian phone: Kenyan format (07/01/254), normalized to E.164 (+254...)
 * - Guardian email: optional, valid email format, max 254 chars
 * - Candidate name: 2-100 chars, letters/spaces/hyphens/apostrophes only
 * - Candidate DOB: YYYY-MM-DD format, must be 12-19 years old on programme start
 * - Payment method: must be one of mpesa, bank_transfer, pay_later
 * - Consent: must be true (literal)
 * - Submission token: UUID v4 for idempotency
 */

// ============================================================================
// HELPER: Phone normalization to E.164
// ============================================================================

/**
 * Normalizes a Kenyan phone number to E.164 format (+254XXXXXXXXX)
 *
 * Accepts:
 * - 07XXXXXXXX or 01XXXXXXXX (10 digits)
 * - +2547XXXXXXXX or +2541XXXXXXXX (12 chars with +)
 * - 2547XXXXXXXX or 2541XXXXXXXX (12 digits without +)
 *
 * Returns: +254XXXXXXXXX (E.164 format)
 */
function normalizeKenyanPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Already in international format (254...)
  if (digits.startsWith("254") && digits.length === 12) {
    return `+${digits}`;
  }

  // Local format without leading 0 (7... or 1...)
  if (
    (digits.startsWith("7") || digits.startsWith("1")) &&
    digits.length === 9
  ) {
    return `+254${digits}`;
  }

  // Local format with leading 0 (07... or 01...)
  if (digits.startsWith("0") && digits.length === 10) {
    return `+254${digits.substring(1)}`;
  }

  // Return as-is (will fail validation if format is invalid)
  return phone;
}

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================

// Name pattern: letters, spaces, hyphens, apostrophes only
const namePattern = /^[a-zA-Z\s'-]+$/;

// Kenyan phone pattern (before normalization)
// Accepts: 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX, +2541XXXXXXXX, 2547XXXXXXXX, 2541XXXXXXXX
const kenyanPhonePattern = /^(0[17]\d{8}|\+?254[17]\d{8})$/;

// ============================================================================
// FORM INPUT SCHEMA
// ============================================================================

export const registrationFormSchema = z.object({
  // --------------------------------------------------------------------------
  // Guardian information
  // --------------------------------------------------------------------------

  guardianFullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters")
    .regex(
      namePattern,
      "Full name may only contain letters, spaces, hyphens, and apostrophes",
    )
    .transform((val) => val.trim().replace(/\s+/g, " ")),

  guardianPhone: z
    .string()
    .regex(
      kenyanPhonePattern,
      "Please enter a valid Kenyan phone number (e.g., 07XXXXXXXX)",
    )
    .transform(normalizeKenyanPhone),

  guardianEmail: z
    .union([
      z.literal(""),
      z
        .string()
        .email("Please enter a valid email address")
        .max(254, "Email address is too long"),
    ])
    .transform((val) => (val === "" ? undefined : val.trim().toLowerCase())),

  // --------------------------------------------------------------------------
  // Candidate (boy) information
  // --------------------------------------------------------------------------

  candidateFullName: z
    .string()
    .min(2, "Candidate's full name must be at least 2 characters")
    .max(100, "Candidate's full name must be at most 100 characters")
    .regex(
      namePattern,
      "Candidate's name may only contain letters, spaces, hyphens, and apostrophes",
    )
    .transform((val) => val.trim().replace(/\s+/g, " ")),

  candidateDateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format")
    .transform((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date of birth");
      }
      return date;
    })
    .refine(
      (date) => {
        const min = new Date(registrationRules.candidateDobMin);
        const max = new Date(registrationRules.candidateDobMax);
        return date >= min && date <= max;
      },
      {
        message:
          "Candidate must be between 12 and 19 years old on the programme start date",
      },
    ),

  // --------------------------------------------------------------------------
  // Payment choice
  // --------------------------------------------------------------------------

  paymentMethodChosen: z.enum(["mpesa", "bank_transfer", "pay_later"], {
    error: "Please select a valid payment method",
  }),

  // --------------------------------------------------------------------------
  // Consent
  // --------------------------------------------------------------------------

  consentAccepted: z.literal(true, {
    error: "You must accept the consent declaration to proceed",
  }),

  // --------------------------------------------------------------------------
  // Idempotency token (generated client-side as UUID v4)
  // --------------------------------------------------------------------------

  submissionToken: z
    .string()
    .uuid("Invalid submission token. Please refresh the page and try again."),
});

// ============================================================================
// OUTPUT TYPES
// ============================================================================

/**
 * Raw form data before validation/transformation
 * Used by client components for form state
 */
export type RegistrationFormData = z.input<typeof registrationFormSchema>;

/**
 * Validated and normalized data after transformation
 * Used by Server Actions for database insertion
 */
export type RegistrationInput = z.output<typeof registrationFormSchema>;
