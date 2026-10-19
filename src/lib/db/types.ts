import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { guardians, applications, paymentRecords } from "./schema";

// ============================================================================
// GUARDIAN TYPES
// ============================================================================

export type Guardian = InferSelectModel<typeof guardians>;
export type NewGuardian = InferInsertModel<typeof guardians>;

// ============================================================================
// APPLICATION TYPES
// ============================================================================

export type Application = InferSelectModel<typeof applications>;
export type NewApplication = InferInsertModel<typeof applications>;

// ============================================================================
// PAYMENT RECORD TYPES
// ============================================================================

export type PaymentRecord = InferSelectModel<typeof paymentRecords>;
export type NewPaymentRecord = InferInsertModel<typeof paymentRecords>;

// ============================================================================
// ENUM TYPES
// ============================================================================

export type PaymentMethod = "mpesa" | "bank_transfer" | "pay_later";
export type PaymentStatus =
  | "unpaid"
  | "awaiting_verification"
  | "paid"
  | "payment_failed";
export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "needs_information"
  | "approved"
  | "not_approved"
  | "withdrawn";

// ============================================================================
// COMPOSITE TYPES (for API responses)
// ============================================================================

export type ApplicationWithGuardian = Application & {
  guardian: Guardian;
};

export type ApplicationWithPayment = Application & {
  paymentRecord: PaymentRecord | null;
};

export type FullApplicationDetails = Application & {
  guardian: Guardian;
  paymentRecord: PaymentRecord | null;
};
