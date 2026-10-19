import { Container } from "./container";
import { programme, contacts, registrationStatus, organisation } from "@/content/programme";
import Link from "next/link";
import { Phone } from "lucide-react";
import { CopyrightYear } from "@/components/shared/copyright-year";

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/programme", label: "Programme" },
    { href: "/parents", label: "Parents" },
    { href: "/apply", label: "Apply" },
];

export function SiteFooter() {
    // Filter contacts that are approved for publication
    const approvedContacts = contacts.filter(c => c.isApprovedForPublication);

    return (
        <footer className="mt-auto border-t border-border bg-muted/30">
            <Container className="py-10 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand & Motto */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-foreground">
                            {programme.title}
                        </h2>
                        <p className="text-sm italic text-muted-foreground max-w-xs">
                            &ldquo;{programme.motto}&rdquo;
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-foreground">Quick Links</h2>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-foreground">Contact Us</h2>
                        <ul className="space-y-2">
                            {approvedContacts.map((contact) => (
                                <li key={contact.number}>
                                    <a
                                        href={`tel:${contact.number}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                                    >
                                        <Phone className="h-4 w-4" />
                                        {contact.number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {!registrationStatus.isOnlineRegistrationLive && (
                            <p className="text-xs text-muted-foreground pt-2 border-t border-border/50 mt-3">
                                {registrationStatus.offlineInstruction}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>
                        &copy; <CopyrightYear /> {organisation.name}. Foundation build.
                    </p>
                    <p>
                        Programme facts and content are provisional.
                    </p>
                </div>
            </Container>
        </footer>
    );
}