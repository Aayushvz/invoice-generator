/*
  Hand-rolled icon set, matching the one /contract ships.

  This app already depends on lucide-react, and the rest of the UI still
  uses it. These exist for the surfaces that have been brought onto the
  tool design language, where the convention is a local set rather than a
  library: see docs/TOOL-DESIGN-LANGUAGE.md in the portfolio repo.

  24x24 viewBox, 1.5px stroke, fill="none", stroke="currentColor" so every
  icon inherits colour from its control and themes for free. Every icon is
  decorative: aria-hidden and focusable="false", because the control around
  it already carries the accessible name. Sizing is left to the .cgIcon
  class in design.css, never a hardcoded width/height attribute here.

  Only the icons the ported surfaces actually use are built here; this is
  not a general icon library, and nothing unused belongs in it.
*/

type IconProps = { className?: string };

function iconClass(className?: string) {
    return className ? `cgIcon ${className}` : "cgIcon";
}

const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: "false" as const,
};

export function SunIcon({ className }: IconProps) {
    return (
        <svg className={iconClass(className)} {...svgProps}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55M17.52 17.52l1.55 1.55M2 12h2.2M19.8 12H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55" />
        </svg>
    );
}

/* a page with an arrow into it: "put this document out as a file" */
export function FileDownIcon({ className }: IconProps) {
    return (
        <svg className={iconClass(className)} {...svgProps}>
            <path d="M14.5 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
            <path d="M14.5 2.5V7H19" />
            <path d="M12 11.5v5.5M9.75 14.75 12 17l2.25-2.25" />
        </svg>
    );
}

export function MoonIcon({ className }: IconProps) {
    return (
        <svg className={iconClass(className)} {...svgProps}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
    );
}
