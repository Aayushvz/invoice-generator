import React from "react";

// Utils
import { cn } from "@/lib/utils";

type SubheadingProps = {
    children: React.ReactNode;
    className?: string;
};

/**
 * Section heading inside the form.
 *
 * Deliberately small and quiet: with the surrounding cards removed, these
 * headings plus the hairline rules are what give the form its structure, so
 * they need to read as labels rather than compete as titles.
 *
 * It uses .cgSide__eyebrow, the panel eyebrow from the tool design
 * language, rather than its own Tailwind stack. The form was mixing three
 * label idioms in one column: mono uppercase on the field labels, semibold
 * sans uppercase here, and plain sans elsewhere. One idiom, declared once.
 *
 * Callers pass the label only. The trailing colons they used to append by
 * hand are gone: a colon after a heading that is already separated from its
 * content by position and a rule is punctuation doing nothing.
 */
export default function Subheading({ children, className }: SubheadingProps) {
    return (
        <h2
            className={cn("cgSide__eyebrow", className)}
        >
            {children}
        </h2>
    );
}
