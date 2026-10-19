/**
 * CENTRALISED PROGRAMME CONTENT
 *
 * STATUS: PROVISIONAL / DRAFT
 *
 * All facts below were transcribed from the supplied PCEA Nanyuki North Parish
 * programme poster. They MUST NOT be treated as confirmed production data.
 *
 * RULES:
 * 1. Do not import facts from another PCEA parish.
 * 2. Do not invent missing information (age ranges, deadlines, refund policies).
 * 3. An authorised parish representative must approve these facts before
 *    the `isApproved` flag is set to true and they are published to production.
 */

export const programmeStatus = {
  isApproved: false,
  lastUpdated: "2026-01-01", // Update this date when facts are verified
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
  // Poster says 21 days. Date range is 7-28 Nov (22 days inclusive).
  // Duration requires clarification from parish.
  durationDays: 21,
} as const;

export const schedule = {
  startDate: "2026-11-07",
  endDate: "2026-11-28",
  displayText: "7 – 28 November 2026",
} as const;

export const venue = {
  name: "PCEA Nturukuma Church",
  // Exact public-facing wording and directions require confirmation.
} as const;

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
} as const;

export const paymentDetails = {
  mpesa: {
    paybill: "222111",
    accountNumber: "174174",
    // STK Push is a future integration. Do not present as working.
    isStkPushEnabled: false,
  },
  bank: {
    bankName: "Family Bank",
    accountNumber: "064000085996",
    // Account name and reference instructions require confirmation.
  },
} as const;

export const contacts = [
  // CONFIRMED: These numbers are approved for public publication.
  { number: "0726179239", owner: "TBC", isApprovedForPublication: true },
  { number: "0722909502", owner: "TBC", isApprovedForPublication: true },
  { number: "0725952436", owner: "TBC", isApprovedForPublication: true },
] as const;

// CONFIRMED: Registration status and offline instructions.
export const registrationStatus = {
  isOnlineRegistrationLive: false,
  offlineInstruction:
    "Online registration is coming soon. For now, please visit the parish office to register.",
} as const;

// Programme topics transcribed from the poster.
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

// Programme benefits.
export const benefits = [
  "Guided transition from boyhood to responsible manhood.",
  "Strong foundation in Christian values and spiritual growth.",
  "Practical life skills for navigating modern challenges.",
  "A supportive community of mentors and peers.",
] as const;
