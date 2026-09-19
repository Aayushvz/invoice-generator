import localFont from "next/font/local";

/*
  General Sans, self-hosted, the same four weights the portfolio serves
  and from the same files. This is what --font-primary resolves to, which
  design.css asks for in seven places; until it existed here those rules
  silently fell through to whatever the page inherited, so the tool was
  wearing Outfit while claiming to match /contract.

  next/font inlines the @font-face, preloads the files and generates a
  size-adjusted fallback, so there is no layout shift and no third-party
  round-trip.
*/
export const generalSans = localFont({
    variable: "--font-general",
    display: "swap",
    fallback: ["system-ui", "sans-serif"],
    src: [
        { path: "../public/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
        { path: "../public/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
        { path: "../public/fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
    ],
});

// Next Google Fonts
import {
    Alex_Brush,
    Dancing_Script,
    Great_Vibes,
    Outfit,
    Parisienne,
} from "next/font/google";

// Default Fonts
export const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,
});

// Signature fonts
export const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-dancing-script",
    preload: true,
    display: "swap",
});

export const parisienne = Parisienne({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-parisienne",
    preload: true,
    display: "swap",
});

export const greatVibes = Great_Vibes({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-great-vibes",
    preload: true,
    display: "swap",
});

export const alexBrush = Alex_Brush({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-alex-brush",
    preload: true,
    display: "swap",
});
