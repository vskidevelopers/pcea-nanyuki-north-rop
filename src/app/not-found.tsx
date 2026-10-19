"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <Container className="py-20 md:py-32">
            <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy/10 text-navy">
                    <span className="text-4xl font-bold">404</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-navy">
                    Page Not Found
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <Link href="/">
                        <Button size="lg" className="bg-navy hover:bg-navy/90 text-white text-base px-8">
                            <Home className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-8"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        </Container>
    );
}