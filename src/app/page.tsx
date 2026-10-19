import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProvisionalNotice } from "@/components/shared/provisional-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  programme,
  organisation,
  schedule,
  venue,
  programmeStatus,
  topics,
  benefits,
  contacts
} from "@/content/programme";
import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Users,
  BookOpen,
  Lightbulb
} from "lucide-react";

// Map topics to icons for visual interest
const topicIcons = [Users, BookOpen, ShieldCheck, Lightbulb, CheckCircle2];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy/5 to-background py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium bg-navy/10 text-navy border-navy/20">
              {organisation.name}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy">
              {programme.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Equipping boys with the values, skills, and spiritual foundation to navigate the journey to responsible manhood.
            </p>

            <p className="text-base italic text-foreground/80 font-medium">
              &ldquo;{programme.motto}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/apply">
                <Button size="lg" className="bg-navy hover:bg-navy/90 text-white shadow-md text-base px-8">
                  Apply / Register <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/programme">
                <Button variant="outline" size="lg" className="text-base px-8">
                  Explore the Programme
                </Button>
              </Link>
            </div>

            {/* Provisional Notice */}
            {!programmeStatus.isApproved && (
              <div className="pt-6">
                <ProvisionalNotice className="max-w-xl mx-auto text-left" />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Benefits / Value Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <SectionHeading
            title="A Journey to Responsible Manhood"
            subtitle="The Rite of Passage programme is designed to guide boys through a critical transition, providing mentorship, spiritual growth, and practical life skills."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, index) => {
              const Icon = topicIcons[index % topicIcons.length];
              return (
                <Card key={index} className="text-center border-border/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-brand-blue" />
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

      {/* Topics Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <SectionHeading
            title="What Your Son Will Learn"
            subtitle="The curriculum covers essential topics to prepare boys for the challenges and responsibilities of adulthood."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/60 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-accent-green shrink-0" />
                <span className="text-sm font-medium text-foreground">{topic}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Parent Info / Reassurance Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionHeading
              title="For Parents & Guardians"
              subtitle="We understand the importance of this journey for your family. Find detailed information on registration, fees, and what to expect."
              align="center"
            />
            <Link href="/parents">
              <Button variant="outline" size="lg" className="text-base px-8">
                View Parent Information
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Contact / Logistics Section */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-gold">
                <Calendar className="h-5 w-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Dates</h3>
              </div>
              <p className="text-lg font-medium text-white/90">{schedule.displayText}</p>
              <p className="text-sm text-white/60">Duration: {programme.durationDays} days (provisional)</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-gold">
                <MapPin className="h-5 w-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Venue</h3>
              </div>
              <p className="text-lg font-medium text-white/90">{venue.name}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-gold">
                <Phone className="h-5 w-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
              </div>
              <ul className="space-y-1">
                {contacts.filter(c => c.isApprovedForPublication).map((contact) => (
                  <li key={contact.number}>
                    <a href={`tel:${contact.number}`} className="text-lg font-medium text-white/90 hover:text-accent-gold transition-colors">
                      {contact.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}