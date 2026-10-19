import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProvisionalNotice } from "@/components/shared/provisional-notice";
import { FaqItem } from "@/components/shared/faq-item";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    programme,
    organisation,
    fees,
    paymentDetails,
    contacts,
    registrationStatus,
    programmeStatus,
    schedule,
    venue
} from "@/content/programme";
import Link from "next/link";
import {
    Phone,
    CreditCard,
    Building2,
    Smartphone,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    FileText,
    HelpCircle
} from "lucide-react";

export default function ParentsPage() {
    const approvedContacts = contacts.filter(c => c.isApprovedForPublication);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-navy/5 to-background py-16 md:py-20">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium bg-navy/10 text-navy border-navy/20">
                            For Parents & Guardians
                        </Badge>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-navy">
                            Parent Information
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Everything you need to know about registering your son for the {programme.title}.
                        </p>

                        {!programmeStatus.isApproved && (
                            <div className="pt-6">
                                <ProvisionalNotice className="max-w-xl mx-auto text-left" />
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Getting Started Section */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="How to Get Started"
                            subtitle="Registration is currently handled offline at the parish office."
                        />

                        <Card className="border-border/60 shadow-sm">
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-brand-blue" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-base font-semibold text-foreground">Current Registration Process</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {registrationStatus.offlineInstruction}
                                        </p>
                                    </div>
                                </div>

                                {!registrationStatus.isOnlineRegistrationLive && (
                                    <div className="p-3 bg-accent-gold/10 border border-accent-gold/30 rounded-lg flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                                        <p className="text-xs text-foreground">
                                            Online registration will be available soon. Check back for updates or contact the parish office for current availability.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Fees Section */}
            <section className="py-16 md:py-20 bg-muted/30">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="Programme Fees"
                            subtitle="Clear breakdown of the programme costs."
                            align="center"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Programme Charge</h3>
                                        <Badge variant="outline" className="bg-navy/10 text-navy border-navy/20">Main Fee</Badge>
                                    </div>
                                    <p className="text-3xl font-bold text-navy">{fees.programmeCharge.displayText}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Covers the full {programme.durationDays}-day programme experience.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Registration Fee</h3>
                                        <Badge variant="outline" className="bg-accent-green/10 text-accent-green border-accent-green/20">Additional</Badge>
                                    </div>
                                    <p className="text-3xl font-bold text-navy">{fees.registrationFee.displayText}</p>
                                    <p className="text-xs text-muted-foreground">
                                        One-time fee, additional to the programme charge.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {fees.isRegistrationFeeAdditional && (
                            <div className="p-4 bg-background border border-border/60 rounded-lg">
                                <p className="text-sm text-muted-foreground text-center">
                                    <span className="font-semibold text-foreground">Total:</span>{" "}
                                    KSh {(fees.programmeCharge.amount + fees.registrationFee.amount).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Payment Methods Section */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <SectionHeading
                            title="Payment Methods"
                            subtitle="Choose the payment option that works best for your family."
                            align="center"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Bank Transfer */}
                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-brand-blue" />
                                        <h3 className="text-base font-semibold text-foreground">Bank Transfer</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs">Bank</p>
                                            <p className="font-medium text-foreground">{paymentDetails.bank.bankName}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs">Account Number</p>
                                            <p className="font-medium text-foreground">{paymentDetails.bank.accountNumber}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground pt-2 border-t border-border/40">
                                        Staff will verify your payment after you report the transfer.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* M-Pesa */}
                            <Card className="border-border/60 shadow-sm relative overflow-hidden">
                                <div className="absolute top-2 right-2">
                                    <Badge variant="outline" className="bg-accent-gold/10 text-accent-gold border-accent-gold/30 text-[10px]">
                                        Coming Soon
                                    </Badge>
                                </div>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                                        <h3 className="text-base font-semibold text-foreground">M-Pesa</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs">Paybill</p>
                                            <p className="font-medium text-foreground">{paymentDetails.mpesa.paybill}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs">Account</p>
                                            <p className="font-medium text-foreground">{paymentDetails.mpesa.accountNumber}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground pt-2 border-t border-border/40">
                                        Online M-Pesa payment integration is not yet available. Please use bank transfer or pay later for now.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Pay Later */}
                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-accent-green" />
                                        <h3 className="text-base font-semibold text-foreground">Pay Later</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Complete your registration now and arrange payment at a later date.
                                    </p>
                                    <p className="text-xs text-muted-foreground pt-2 border-t border-border/40">
                                        Your application will be saved and you can settle payment before the programme begins.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-20 bg-muted/30">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="Contact Us"
                            subtitle="Have questions? Reach out to the organising team."
                            align="center"
                        />

                        <div className="flex flex-col items-center gap-4">
                            {approvedContacts.map((contact) => (
                                <a
                                    key={contact.number}
                                    href={`tel:${contact.number}`}
                                    className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow w-full max-w-md"
                                >
                                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-brand-blue" />
                                    </div>
                                    <span className="text-base font-medium text-foreground">{contact.number}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="Frequently Asked Questions"
                            subtitle="Answers to common questions from parents and guardians."
                            align="center"
                        />

                        <div className="space-y-3">
                            <FaqItem
                                question="How do I register my son?"
                                answer={
                                    <p>
                                        {registrationStatus.offlineInstruction} Online registration will be available in the future.
                                    </p>
                                }
                            />

                            <FaqItem
                                question="What is the total cost of the programme?"
                                answer={
                                    <div className="space-y-2">
                                        <p>The programme fee is <span className="font-semibold">{fees.programmeCharge.displayText}</span>, with an additional registration fee of <span className="font-semibold">{fees.registrationFee.displayText}</span>.</p>
                                        <p className="text-xs text-muted-foreground">Total: KSh {(fees.programmeCharge.amount + fees.registrationFee.amount).toLocaleString()}</p>
                                    </div>
                                }
                            />

                            <FaqItem
                                question="When does the programme run?"
                                answer={
                                    <p>
                                        The programme is scheduled for <span className="font-semibold">{schedule.displayText}</span> (provisional). Please confirm exact dates with the parish office.
                                    </p>
                                }
                            />

                            <FaqItem
                                question="Where is the programme held?"
                                answer={
                                    <p>
                                        The programme will be held at <span className="font-semibold">{venue.name}</span>.
                                    </p>
                                }
                            />

                            <FaqItem
                                question="What age range is the programme for?"
                                answer={
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                                        <span>Please contact the parish office for information about age eligibility.</span>
                                    </p>
                                }
                            />

                            <FaqItem
                                question="What documents are required for registration?"
                                answer={
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                                        <span>Please contact the parish office for a complete list of required documents.</span>
                                    </p>
                                }
                            />

                            <FaqItem
                                question="Is there a refund policy?"
                                answer={
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                                        <span>Please contact the parish office for information about cancellation and refund policies.</span>
                                    </p>
                                }
                            />

                            <FaqItem
                                question="Can I pay in instalments?"
                                answer={
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                                        <span>Please contact the parish office to discuss payment arrangements.</span>
                                    </p>
                                }
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-navy text-white">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Ready to Register?
                        </h2>
                        <p className="text-white/80 leading-relaxed">
                            Visit the parish office to begin the registration process, or explore the programme details to learn more.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/programme">
                                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-white/30 text-white hover:bg-white/10">
                                    View Programme Details
                                </Button>
                            </Link>
                            <Link href="/apply">
                                <Button size="lg" className="bg-white text-navy hover:bg-white/90 text-base px-8">
                                    Apply / Register <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}