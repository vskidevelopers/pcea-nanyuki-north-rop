import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProvisionalNoticeProps {
    className?: string;
    message?: string;
}

export function ProvisionalNotice({ className, message }: ProvisionalNoticeProps) {
    return (
        <div className={cn("p-4 bg-accent-gold/10 border border-accent-gold/30 rounded-lg flex items-start gap-3", className)}>
            <AlertTriangle className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
                <p className="font-semibold">Draft Environment</p>
                <p className="text-muted-foreground mt-1">
                    {message || "Programme facts, dates, and fees are provisional and require parish approval before production. No live registration or payment features are active."}
                </p>
            </div>
        </div>
    );
}