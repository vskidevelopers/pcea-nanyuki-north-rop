CREATE TYPE "public"."application_status" AS ENUM('submitted', 'under_review', 'needs_information', 'approved', 'not_approved', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('mpesa', 'bank_transfer', 'pay_later');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('unpaid', 'awaiting_verification', 'paid', 'payment_failed');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guardian_id" uuid NOT NULL,
	"reference" text NOT NULL,
	"submission_token" text NOT NULL,
	"candidate_full_name" text NOT NULL,
	"candidate_date_of_birth" date NOT NULL,
	"payment_method_chosen" "payment_method" NOT NULL,
	"application_status" "application_status" DEFAULT 'submitted' NOT NULL,
	"consent_version" text NOT NULL,
	"consented_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guardians" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"amount_minor_units" integer NOT NULL,
	"payment_status" "payment_status" DEFAULT 'unpaid' NOT NULL,
	"verified_by" uuid,
	"verified_at" timestamp with time zone,
	"verification_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_guardian_id_guardians_id_fk" FOREIGN KEY ("guardian_id") REFERENCES "public"."guardians"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "applications_reference_unique_idx" ON "applications" USING btree ("reference");--> statement-breakpoint
CREATE UNIQUE INDEX "applications_submission_token_unique_idx" ON "applications" USING btree ("submission_token");--> statement-breakpoint
CREATE UNIQUE INDEX "applications_duplicate_detection_idx" ON "applications" USING btree ("guardian_id","candidate_full_name","candidate_date_of_birth");--> statement-breakpoint
CREATE INDEX "applications_guardian_id_idx" ON "applications" USING btree ("guardian_id");--> statement-breakpoint
CREATE INDEX "applications_status_idx" ON "applications" USING btree ("application_status");--> statement-breakpoint
CREATE UNIQUE INDEX "guardians_phone_unique_idx" ON "guardians" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "payment_records_application_id_unique_idx" ON "payment_records" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX "payment_records_status_idx" ON "payment_records" USING btree ("payment_status");