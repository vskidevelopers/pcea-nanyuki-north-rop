import type { Metadata } from "next";
import { Inter, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PCEA Nanyuki North Parish | ROP 2026",
  description: "Boys Rite of Passage & Mentorship Programme 2026. Foundation build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}