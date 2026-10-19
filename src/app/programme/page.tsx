import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProvisionalNotice } from "@/components/shared/provisional-notice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    programme,
    organisation,
    schedule,
    venue,
    programmeStatus,
    topics,
    benefits
} from "@/content/programme";
import Link from "next/link";
import {
    CheckCircle2,
    Calendar,
    MapPin,
    Clock,
    ArrowRight,
    BookOpen,
    Users,
    ShieldCheck,
    Lightbulb,
    Heart,
    Target,
    GraduationCap,
    Handshake
} from "lucide-react";

// Map topics to icons for visual interest
const topicIcons = [Users, BookOpen, ShieldCheck, Lightbulb, CheckCircle2, Heart, Target, GraduationCap, Handshake, Clock, Users];

// Map benefits to icons
const benefitIcons = [GraduationCap, Heart, Lightbulb, Users];

export default function ProgrammePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-navy/5 to-background py-16 md:py-20">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium bg-navy/10 text-navy border-navy/20">
                            The Programme
                        </Badge>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-navy">
                            {programme.title}
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            A comprehensive mentorship journey designed to guide boys through the critical transition from boyhood to responsible manhood, grounded in Christian values and practical life skills.
                        </p>

                        <p className="text-base italic text-foreground/80 font-medium">
                            &ldquo;{programme.motto}&rdquo;
                        </p>

                        {!programmeStatus.isApproved && (
                            <div className="pt-6">
                                <ProvisionalNotice className="max-w-xl mx-auto text-left" />
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* About / Purpose Section */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <SectionHeading
                            title="About the Programme"
                            subtitle="The Boys Rite of Passage & Mentorship Programme is an initiative by the PCEA Nanyuki North Parish Men Fellowship (PCMF) to equip young boys with the values, skills, and spiritual foundation they need to navigate the challenges of modern life and become responsible men."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                        <Target className="h-5 w-5 text-brand-blue" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground">Purpose</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        To provide a structured, supportive environment where boys can learn about manhood, Christian growth, and their roles in family and community.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border/60 shadow-sm">
                                <CardContent className="pt-6 space-y-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                                        <Heart className="h-5 w-5 text-accent-green" />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground">Approach</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Through mentorship, teaching, and community support, the programme addresses real-life challenges boys face today, from technology influence to substance abuse.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Topics Section */}
            <section className="py-16 md:py-20 bg-muted/30">
                <Container>
                    <SectionHeading
                        title="Mentorship Topics"
                        subtitle="The curriculum covers essential topics to prepare boys for the challenges and responsibilities of adulthood."
                        align="center"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto">
                        {topics.map((topic, index) => {
                            const Icon = topicIcons[index % topicIcons.length];
                            return (
                                <div key={topic} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                        <Icon className="h-4 w-4 text-brand-blue" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground pt-1">{topic}</span>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <SectionHeading
                        title="Programme Benefits"
                        subtitle="What your son will gain from this transformative experience."
                        align="center"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
                        {benefits.map((benefit, index) => {
                            const Icon = benefitIcons[index % benefitIcons.length];
                            return (
                                <Card key={index} className="border-border/60 shadow-sm">
                                    <CardContent className="pt-6 space-y-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center">
                                            <Icon className="h-5 w-5 text-accent-green" />
                                        </div>
                                        <p className="text-sm text-foreground leading-relaxed">
                                            {benefit}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Logistics Section */}
            <section className="py-16 md:py-20 bg-navy text-white">
                <Container>
                    <SectionHeading
                        title="Programme Details"
                        subtitle="Key logistical information about the programme."
                        align="center"
                        className="text-white"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-accent-gold" />
                            </div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Dates</h3>
                            <p className="text-lg font-medium text-white/90">{schedule.displayText}</p>
                            <p className="text-xs text-white/60">Provisional</p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-accent-gold" />
                            </div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Duration</h3>
                            <p className="text-lg font-medium text-white/90">{programme.durationDays} days</p>
                            <p className="text-xs text-white/60">As stated on poster</p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-accent-gold" />
                            </div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Venue</h3>
                            <p className="text-lg font-medium text-white/90">{venue.name}</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-background">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-navy">
                            Ready to Learn More?
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Find detailed information for parents and guardians, including registration arrangements, fees, and payment methods.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/parents">
                                <Button size="lg" variant="outline" className="text-base px-8">
                                    View Parent Information
                                </Button>
                            </Link>
                            <Link href="/apply">
                                <Button size="lg" className="bg-navy hover:bg-navy/90 text-white text-base px-8">
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