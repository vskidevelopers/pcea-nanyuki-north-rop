import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeading({ title, subtitle, align = "left", className }: SectionHeadingProps) {
    return (
        <div className={cn("space-y-2 mb-8", align === "center" && "text-center", className)}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-navy">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}