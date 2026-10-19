"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1",
                isActive ? "text-navy" : "text-muted-foreground",
                className
            )}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </Link>
    );
}