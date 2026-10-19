/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "./nav-link";
import { programmeStatus } from "@/content/programme";

const links = [
    { href: "/", label: "Home" },
    { href: "/programme", label: "Programme" },
    { href: "/parents", label: "Parents" },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close the menu automatically when the route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className="md:hidden flex items-center gap-2">
            {!programmeStatus.isApproved && (
                <Badge variant="outline" className="bg-accent-gold/10 text-accent-gold border-accent-gold/30 font-medium text-[10px] px-2 py-0.5">
                    Draft
                </Badge>
            )}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg p-4 flex flex-col gap-3 z-40">
                    {links.map((link) => (
                        <NavLink key={link.href} href={link.href} className="text-base py-2">
                            {link.label}
                        </NavLink>
                    ))}
                    <Link href="/apply" className="mt-2">
                        <Button className="w-full bg-navy hover:bg-navy/90 text-white">
                            Apply / Register
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}