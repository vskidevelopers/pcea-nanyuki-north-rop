/**
 * CENTRALISED PROGRAMME CONTENT
 *
 * STATUS: PROVISIONAL / DRAFT
 *
 * All facts below were transcribed from the supplied PCEA Nanyuki North Parish
 * programme poster or confirmed by the client. They MUST NOT be treated as final
 * production data until explicitly approved.
 *
 * RULES:
 * 1. Do not import facts from another PCEA parish.
 * 2. Do not invent missing information (age ranges, deadlines, refund policies).
 * 3. An authorised parish representative must approve these facts before
 *    the `isApproved` flag is set to true and they are published to production.
 */

export const programmeStatus = {
  isApproved: false,
  lastUpdated: "2026-01-19",
} as const;

export const organisation = {
  name: "PCEA Nanyuki North Parish Men Fellowship",
  acronym: "PCMF",
} as const;

export const programme = {
  title: "Boys Rite of Passage & Mentorship Programme",
  acronym: "ROP",
  year: 2026,
  motto: "Give us your boy and we give you a responsible man.",
  durationDays: 21,
} as const;

export const schedule = {
  startDate: "2026-11-07",
  endDate: "2026-11-28",
  displayText: "7 – 28 November 2026",
} as const;

export const venue = {
  name: "PCEA Nturukuma Church",
} as const;

// ============================================================================
// FEES AND PAYMENT CONFIGURATION
// ============================================================================

export const fees = {
  programmeCharge: {
    amount: 11200,
    currency: "KSh",
    displayText: "KSh 11,200",
  },
  registrationFee: {
    amount: 500,
    currency: "KSh",
    displayText: "KSh 500",
  },
  // CONFIRMED: Registration fee is additional to the programme charge.
  isRegistrationFeeAdditional: true,
  // Total amount in minor units (KSh 11,700 = 1,170,000 cents)
  totalMinorUnits: 1170000,
} as const;

export const paymentDetails = {
  mpesa: {
    paybill: "222111",
    accountNumber: "174174",
    isStkPushEnabled: false,
  },
  bank: {
    bankName: "Family Bank",
    accountNumber: "064000085996",
    // CONFIRMED: Account holder name
    accountName: "PCEA Nanyuki North Parish",
    // CONFIRMED: Reference format instruction
    referenceInstruction:
      "Use your application reference (e.g., ROP-2026-A7X9K2) as the payment reference",
  },
} as const;

// Payment statuses (Blueprint standard)
export const paymentStatuses = {
  UNPAID: "unpaid",
  AWAITING_VERIFICATION: "awaiting_verification",
  PAID: "paid",
  PAYMENT_FAILED: "payment_failed",
} as const;

export type PaymentStatus =
  (typeof paymentStatuses)[keyof typeof paymentStatuses];

// ============================================================================
// CONTACTS
// ============================================================================

export const contacts = [
  { number: "0726179239", owner: "TBC", isApprovedForPublication: true },
  { number: "0722909502", owner: "TBC", isApprovedForPublication: true },
  { number: "0725952436", owner: "TBC", isApprovedForPublication: true },
] as const;

// ============================================================================
// REGISTRATION CONFIGURATION
// ============================================================================

export const registrationStatus = {
  isOnlineRegistrationLive: false,
  offlineInstruction:
    "Online registration is coming soon. For now, please visit the parish office to register.",
} as const;

// CONFIRMED: Parents may register more than one boy
export const registrationRules = {
  allowsMultipleCandidatesPerGuardian: true,
  // Withdrawal window: 7 days from submission OR before application status changes to 'under_review'
  withdrawalWindowDays: 7,
  // Eligibility: 12+ years old (teens)
  // DOB must be on or before 2014-11-07 to be 12+ on programme start (2026-11-07)
  // DOB must be on or after 2007-01-01 (age 19 max on programme start)
  candidateDobMin: "2007-01-01",
  candidateDobMax: "2014-11-07",
} as const;

// ============================================================================
// CONSENT CONFIGURATION
// ============================================================================

// CONFIRMED: Consent version approved October 2026
export const consentVersion = "v1.0-2026-10";

// PLACEHOLDER: Requires legal review and parish approval before production
export const consentDeclaration = {
  isApproved: false,
  version: consentVersion,
  text: "I confirm that the information provided is accurate. I consent to the collection and storage of the above data for the purpose of registering my son for the Boys Rite of Passage & Mentorship Programme 2026. I understand that my data will be handled in accordance with the parish's privacy policy and that I have the right to access, correct, or request deletion of this information.",
  // Required consent topics (per Kenyan Data Protection Act, 2019):
  // - Data collected and purpose
  // - Who has access
  // - Retention period
  // - Parent's rights (access, correction, deletion)
  // - Contact for privacy queries
  requiresApproval: true,
} as const;

// ============================================================================
// PROGRAMME TOPICS AND BENEFITS
// ============================================================================

export const topics = [
  "Manhood and adulthood",
  "Christian growth",
  "Youth roles in family and community",
  "African culture and heritage",
  "Religion and radicalisation",
  "Time management",
  "Substance abuse",
  "Sexuality and bullying",
  "Technology and media influence",
  "Stress management",
  "Communication skills",
] as const;

export const benefits = [
  "Guided transition from boyhood to responsible manhood.",
  "Strong foundation in Christian values and spiritual growth.",
  "Practical life skills for navigating modern challenges.",
  "A supportive community of mentors and peers.",
] as const;

// ============================================================================
// DATA RETENTION (Policy decision for Phase 5)
// ============================================================================

export const dataRetention = {
  // CONFIRMED: Retain data after the programme ends
  // Specific retention period (e.g., 6 months, 1 year) requires parish decision
  policy: "after_programme_ends",
  requiresSpecification: true,
} as const;
