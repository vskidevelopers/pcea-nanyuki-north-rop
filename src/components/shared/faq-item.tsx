interface FaqItemProps {
    question: string;
    answer: React.ReactNode;
}

export function FaqItem({ question, answer }: FaqItemProps) {
    return (
        <details className="group border border-border/60 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground pr-4">
                    {question}
                </h3>
                <div className="shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center group-open:bg-navy group-open:text-white transition-colors">
                    <svg
                        className="w-4 h-4 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </summary>
            <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-0">
                {answer}
            </div>
        </details>
    );
}