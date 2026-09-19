"use client";

import { createContext, useContext, useMemo, useState } from "react";

/*
  Which of the two side panels are collapsed.

  It lives in context rather than in InvoiceMain because the state has
  three consumers that are not in a line: the shell sets the data
  attributes the CSS keys off, and each panel owns its own header button
  and its own collapsed rail. Threading it through props would mean
  InvoiceForm and DocumentPanel both taking a pair of props they only
  pass to one button each.

  Deliberately NOT persisted. Collapsing a panel is a thing you do to see
  the document for a moment, not a preference, and a tool that reopens
  with its form hidden looks broken.
*/

/* which surface the phone layout is showing. Desktop ignores it: all
   three columns are visible there, and design.css only reads
   data-cg-tab below 1100px. */
export type ShellTab = "form" | "preview" | "design";

type PanelState = {
    tab: ShellTab;
    setTab: (t: ShellTab) => void;
    formCollapsed: boolean;
    setFormCollapsed: (v: boolean) => void;
    sideCollapsed: boolean;
    setSideCollapsed: (v: boolean) => void;
};

const PanelContext = createContext<PanelState | null>(null);

export function PanelProvider({ children }: { children: React.ReactNode }) {
    const [formCollapsed, setFormCollapsed] = useState(false);
    const [sideCollapsed, setSideCollapsed] = useState(false);
    const [tab, setTab] = useState<ShellTab>("form");

    const value = useMemo(
        () => ({
            tab,
            setTab,
            formCollapsed,
            setFormCollapsed,
            sideCollapsed,
            setSideCollapsed,
        }),
        [tab, formCollapsed, sideCollapsed]
    );

    return (
        <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
    );
}

export function usePanels(): PanelState {
    const ctx = useContext(PanelContext);
    if (!ctx) {
        throw new Error("usePanels must be used inside a PanelProvider");
    }
    return ctx;
}
