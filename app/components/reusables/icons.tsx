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

/* ---------------------------------------------------------------
   Brand marks for the credit line. Filled, not stroked, and lifted
   verbatim from the portfolio's set rather than redrawn: Behance's is
   a real wordmark with no honest outline form, and one filled mark
   beside two hairlines reads as two different families. Whatever a row
   chooses, every mark in it shares.
   --------------------------------------------------------------- */

export function BehanceIcon({ className }: IconProps) {
    /* The official Behance mark. This one is a real brand logo, not a
       geometric stand-in like Instagram/LinkedIn here, so it is filled and
       it is never redrawn by hand - an approximated wordmark stops reading
       as the brand. The transform only insets it to match icon size. */
    return (
      <svg className={iconClass(className)} {...svgProps} fill="currentColor" stroke="none">
        {/* The official Behance mark, used as-is. Only transform here is an
            inset so it optically matches the other icons' size - the path
            itself is the real wordmark and must not be redrawn by hand. */}
        <g transform="scale(0.86) translate(1.95 2.01)">
          <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
        </g>
      </svg>
    );
}

export function InstagramIcon({ className }: IconProps) {
    /* Filled, not stroked. The same geometry this glyph always had (rounded
       body, lens, corner dot), inverted: the body is filled and the lens
       and dot are knocked out of it with evenodd. Filled because Behance
       below is a real wordmark that cannot be expressed as an outline, and
       one filled mark beside two 1.5px outlines makes the footer row read
       as three different families. At 18px a fill also survives better
       than a hairline. */
    return (
      <svg className={iconClass(className)} {...svgProps} fill="currentColor" stroke="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 3.25h7A5.25 5.25 0 0 1 20.75 8.5v7a5.25 5.25 0 0 1-5.25 5.25h-7A5.25 5.25 0 0 1 3.25 15.5v-7A5.25 5.25 0 0 1 8.5 3.25Zm3.5 4.9a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm5-1.25a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z"
        />
      </svg>
    );
}

export function LinkedInIcon({ className }: IconProps) {
    /* Filled for the same reason as Instagram above: same geometry as the
       stroked version it replaces, with the "in" knocked out of the body
       rather than drawn on top of it. */
    return (
      <svg className={iconClass(className)} {...svgProps} fill="currentColor" stroke="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 3.25h9a4.25 4.25 0 0 1 4.25 4.25v9a4.25 4.25 0 0 1-4.25 4.25h-9A4.25 4.25 0 0 1 3.25 16.5v-9A4.25 4.25 0 0 1 7.5 3.25ZM6.9 10.2h2.2v6.6H6.9v-6.6Zm1.1-3.3a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm3 3.3h2.1v.9a2.9 2.9 0 0 1 2.3-1.05c1.7 0 2.8 1.1 2.8 3.15v3.6h-2.2v-3.3c0-1-.4-1.55-1.25-1.55-.8 0-1.35.55-1.35 1.55v3.3H11v-6.6Z"
        />
      </svg>
    );
}
