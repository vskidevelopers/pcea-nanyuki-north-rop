import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProvisionalNotice } from "@/components/shared/provisional-notice";
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
    programmeStatus
} from "@/content/programme";
import Link from "next/link";
import {
    Phone,
    Building2,
    Smartphone,
    Clock,
    FileText,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    MapPin
} from "lucide-react";

export default function ApplyPage() {
    const approvedContacts = contacts.filter(c => c.isApprovedForPublication);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-navy/5 to-background py-16 md:py-20">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium bg-navy/10 text-navy border-navy/20">
                            Registration
                        </Badge>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-navy">
                            Apply / Register
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Begin the journey to responsible manhood for your son.
                        </p>

                        {!programmeStatus.isApproved && (
                            <div className="pt-6">
                                <ProvisionalNotice className="max-w-xl mx-auto text-left" />
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* Current Registration Status */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="How to Register"
                            subtitle="Current registration process and next steps."
                            align="center"
                        />

                        <Card className="border-border/60 shadow-sm border-l-4 border-l-brand-blue">
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

                                <div className="p-4 bg-accent-gold/10 border border-accent-gold/30 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-foreground">Online Registration Coming Soon</p>
                                            <p className="text-xs text-muted-foreground">
                                                The online registration system is currently under development. When it launches, you will be able to:
                                            </p>
                                            <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                                                <li>Complete the registration form online</li>
                                                <li>Choose your preferred payment method</li>
                                                <li>Receive a unique application reference</li>
                                                <li>Track your application status securely</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact CTA */}
                        <div className="text-center space-y-4 pt-4">
                            <p className="text-sm text-muted-foreground">
                                Ready to register now? Contact the parish office or call us:
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                {approvedContacts.map((contact) => (
                                    <a
                                        key={contact.number}
                                        href={`tel:${contact.number}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <Phone className="h-4 w-4 text-brand-blue" />
                                        <span className="text-sm font-medium text-foreground">{contact.number}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Fee Structure */}
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

            {/* Payment Methods Preview */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <SectionHeading
                            title="Payment Methods"
                            subtitle="When online registration launches, you will be able to choose from these payment options."
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

            {/* What to Expect */}
            <section className="py-16 md:py-20 bg-muted/30">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="What to Expect"
                            subtitle="The future online registration process will be simple and secure."
                            align="center"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground">Simple Form</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Complete a straightforward online form with all required information about your son and your family.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-brand-blue" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground">Unique Reference</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Receive a unique application reference number to track your registration progress.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-accent-green" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground">Flexible Payment</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Choose the payment method that works best for your family: bank transfer, M-Pesa, or pay later.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-accent-green" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground">Secure Tracking</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Track your application status securely using your reference number and a verification method.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-20 bg-navy text-white">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Questions? We&apos;re Here to Help
                        </h2>
                        <p className="text-white/80 leading-relaxed">
                            Contact the parish office or call us directly. We&apos;re happy to answer any questions about the programme or registration process.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/parents">
                                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-white/30 text-white hover:bg-white/10">
                                    View Parent Information
                                </Button>
                            </Link>
                            <Link href="/programme">
                                <Button size="lg" className="bg-white text-navy hover:bg-white/90 text-base px-8">
                                    Explore the Programme <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}