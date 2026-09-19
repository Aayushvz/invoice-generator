"use client";

import { useWizard } from "@/contexts/WizardContext";
import { usePanels, type ShellTab } from "@/contexts/PanelContext";
import {
    FileTextIcon,
    PaletteIcon,
} from "@/app/components/reusables/icons";

/*
  The phone layout's spine.

  Below 1100px the three columns cannot sit side by side, and what the
  app did instead was stack the form and the preview in one viewport:
  526px of form above a 225px sliver of invoice, with the DOCUMENT panel
  rendering at 0x0 and no way to reach it at all. Template, accent, font
  and density were simply unavailable on a phone.

  Each surface becomes a destination instead, switched from a bar at the
  bottom of the screen where a thumb already is. design.css has carried
  the rules for this the whole time (.cgShell[data-cg-tab="..."] hides
  the columns that are not current); nothing was rendering the bar that
  drives them.

  The Form tab shows the wizard's own progress as a ring rather than an
  icon, because on a phone the tab bar is the only place that progress
  can live once the panel it used to sit in is off screen.
*/

const R = 9;
const C = 2 * Math.PI * R;

const TABS: { id: ShellTab; label: string }[] = [
    { id: "form", label: "Form" },
    { id: "preview", label: "Invoice" },
    { id: "design", label: "Design" },
];

const MobileTabBar = () => {
    const { tab, setTab } = usePanels();
    const { activeStep, stepCount } = useWizard();

    const pct = Math.round(((activeStep + 1) / stepCount) * 100);

    return (
        <div className="cgMobileTabs" role="tablist" aria-label="Sections">
            {TABS.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    className="cgMobileTabs__tab"
                    onClick={() => setTab(t.id)}
                >
                    <span className="cgMobileTabs__iconWrap">
                        {t.id === "form" && (
                            <svg
                                className="cgRing__svg cgMobileTabs__ring"
                                viewBox="0 0 24 24"
                                aria-hidden
                            >
                                <circle
                                    className="cgRing__track"
                                    cx="12"
                                    cy="12"
                                    r={R}
                                    fill="none"
                                    strokeWidth="2"
                                />
                                <circle
                                    className="cgRing__fill"
                                    cx="12"
                                    cy="12"
                                    r={R}
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={C}
                                    strokeDashoffset={C - (C * pct) / 100}
                                />
                            </svg>
                        )}
                        {t.id === "preview" && (
                            <FileTextIcon className="cgMobileTabs__icon" />
                        )}
                        {t.id === "design" && (
                            <PaletteIcon className="cgMobileTabs__icon" />
                        )}
                    </span>
                    <span className="cgMobileTabs__label">{t.label}</span>
                    {t.id === "form" && (
                        <span className="cgMobileTabs__pct" aria-live="polite">
                            {pct}% complete
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default MobileTabBar;
