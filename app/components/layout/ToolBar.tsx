"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import LogoMark from "@/app/components/reusables/LogoMark";
import { MoonIcon, SunIcon } from "@/app/components/reusables/icons";

/*
  The tool's own top bar, replacing BaseNavbar on the builder.

  Same furniture and the same order as /contract's: the mark and the
  tool's name on the left, then the controls that act on the whole
  document on the right, with exactly one filled control among them.
  --cg-bar-h governs its height and both panel headers, so their labels
  sit on one line straight across the app.

  No back arrow. /contract's points at /playground, which is a real place
  to return to; here the builder IS the home page, so an arrow would
  either go nowhere or point at itself. The mark stays a link to "/" so
  the branding is still clickable.
*/
const ToolBar = () => {
    const { resolvedTheme, setTheme } = useTheme();

    /* next-themes cannot know the theme until it has read localStorage on
       the client, so resolvedTheme is undefined for the first render.
       Rendering the toggle's icon from it directly would either mismatch
       hydration or flip after paint; this holds a stable icon until the
       real value is known. */
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = !mounted || resolvedTheme === "dark";

    return (
        <header className="cgBar">
            <a href="/" className="cgBar__back" aria-label="aayush vz, home">
                <LogoMark className="cgBar__logo" />
            </a>
            <span className="cgBar__title">Invoice Generator</span>
            <span className="cgBar__spacer" />

            <button
                type="button"
                className="cgGhost cgBar__theme"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
                {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
        </header>
    );
};

export default ToolBar;
