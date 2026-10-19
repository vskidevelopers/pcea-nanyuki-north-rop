import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * REFERENCE GENERATION UTILITY
 *
 * STATUS: IMPLEMENTED
 *
 * Generates cryptographically secure, non-sequential public references.
 *
 * Format: ROP-2026-XXXXXXXX (8 characters)
 * Character set: Uppercase letters and digits, excluding ambiguous characters
 *
 * Security properties:
 * - Non-sequential (not predictable)
 * - Non-guessable (large keyspace)
 * - Unique (checked against database)
 * - URL-safe (no special characters)
 */

// ============================================================================
// CHARACTER SET
// ============================================================================

// Uppercase letters and digits, excluding ambiguous characters:
// - 0 (zero) vs O (letter O)
// - 1 (one) vs I (letter I) vs L (letter L)
const CHARACTER_SET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

// Reference prefix (programme identifier)
const REFERENCE_PREFIX = "ROP-2026-";

// Reference length (8 characters after prefix)
const REFERENCE_LENGTH = 8;

// Maximum attempts to generate a unique reference before failing
const MAX_GENERATION_ATTEMPTS = 10;

// ============================================================================
// REFERENCE GENERATION
// ============================================================================

/**
 * Generates a single random reference string
 *
 * @returns A random string of length REFERENCE_LENGTH using CHARACTER_SET
 */
function generateRandomString(): string {
  // Generate enough random bytes to cover the reference length
  // Each byte gives us 256 possible values, we need CHARACTER_SET.length (31) values
  const bytes = randomBytes(REFERENCE_LENGTH);
  let result = "";

  for (let i = 0; i < REFERENCE_LENGTH; i++) {
    // Map byte value to character set index
    const index = bytes[i] % CHARACTER_SET.length;
    result += CHARACTER_SET[index];
  }

  return result;
}

/**
 * Generates a complete reference with prefix
 *
 * @returns A complete reference in format ROP-2026-XXXXXXXX
 */
function generateFullReference(): string {
  return `${REFERENCE_PREFIX}${generateRandomString()}`;
}

/**
 * Checks if a reference already exists in the database
 *
 * @param reference - The reference to check
 * @returns true if the reference exists, false otherwise
 */
async function referenceExists(reference: string): Promise<boolean> {
  const existing = await db
    .select({ id: applications.id })
    .from(applications)
    .where(eq(applications.reference, reference))
    .limit(1);

  return existing.length > 0;
}

/**
 * Generates a unique reference that doesn't exist in the database
 *
 * Attempts to generate a unique reference up to MAX_GENERATION_ATTEMPTS times.
 * If all attempts fail (extremely unlikely), throws an error.
 *
 * @returns A unique reference in format ROP-2026-XXXXXXXX
 * @throws Error if unable to generate a unique reference after MAX_GENERATION_ATTEMPTS
 */
export async function generateUniqueReference(): Promise<string> {
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
    const reference = generateFullReference();
    const exists = await referenceExists(reference);

    if (!exists) {
      return reference;
    }
  }

  // This should be extremely rare (probability of collision is negligible)
  throw new Error(
    "Unable to generate a unique reference after multiple attempts. Please try again.",
  );
}

// ============================================================================
// REFERENCE VALIDATION
// ============================================================================

/**
 * Validates that a reference matches the expected format
 *
 * @param reference - The reference to validate
 * @returns true if the reference matches the format, false otherwise
 */
export function isValidReferenceFormat(reference: string): boolean {
  // Pattern: ROP-2026- followed by 8 characters from CHARACTER_SET
  const pattern = new RegExp(
    `^${REFERENCE_PREFIX}[${CHARACTER_SET}]{${REFERENCE_LENGTH}}$`,
  );
  return pattern.test(reference);
}

/**
 * Calculates the theoretical keyspace size
 *
 * @returns The number of possible unique references
 */
export function calculateKeyspaceSize(): number {
  return Math.pow(CHARACTER_SET.length, REFERENCE_LENGTH);
}

// ============================================================================
// EXPORTS FOR TESTING
// ============================================================================

/**
 * Exports for testing purposes only
 * Do not use these in production code
 */
export const _internal = {
  generateRandomString,
  generateFullReference,
  CHARACTER_SET,
  REFERENCE_PREFIX,
  REFERENCE_LENGTH,
};
