"use client";

import { useState, useEffect } from "react";

export function CopyrightYear() {
    // Default to 2026 for the static prerender phase (matches the programme year)
    const [year, setYear] = useState<string>("2026");

    useEffect(() => {
        // Safely evaluate the current year only on the client after mount
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setYear(new Date().getFullYear().toString());
    }, []);

    return <>{year}</>;
}