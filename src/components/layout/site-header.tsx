import { Container } from "./container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { organisation, programmeStatus } from "@/content/programme";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
    // Extracts "PCEA Nanyuki North" for a cleaner header display
    const shortName = organisation.name.split(" ").slice(0, 3).join(" ");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 relative">
            <Container className="flex h-16 items-center justify-between">
                {/* Logo / Identity */}
                <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-bold text-sm shadow-sm">
                        {organisation.acronym.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground leading-tight">
                            {shortName}
                        </span>
                        <span className="text-xs text-muted-foreground leading-tight hidden sm:block">
                            {organisation.acronym}
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/programme">Programme</NavLink>
                    <NavLink href="/parents">Parents</NavLink>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {!programmeStatus.isApproved && (
                        <Badge variant="outline" className="bg-accent-gold/10 text-accent-gold border-accent-gold/30 font-medium">
                            Draft Environment
                        </Badge>
                    )}
                    <Link href="/apply">
                        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white shadow-sm">
                            Apply / Register
                        </Button>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <MobileNav />
            </Container>
        </header>
    );
}