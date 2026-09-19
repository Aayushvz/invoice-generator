/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            // Gutters must exist at every width. Previously a flat "2rem",
            // which was also gated behind `lg:` at the call sites.
            padding: {
                DEFAULT: "1rem",
                sm: "1.5rem",
                lg: "2rem",
            },
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            screens: {
                /*
                 * The desktop app-shell breakpoint.
                 *
                 * Width only. This also required min-height:800px, on the
                 * reasoning that a short window leaves the form pane too
                 * short to use. What it actually did was switch the whole
                 * layout off on any laptop under 800px tall, while .cgShell
                 * stayed height:100dvh regardless: the shell kept owning the
                 * viewport but lost every style that made it a shell. The
                 * page came back wrapped in container gutters, so the tool
                 * sat in a padded box with dead strips down both sides, and
                 * the form pane lost its own padding (shell:p-5) so the
                 * fields sat flat against the panel border.
                 *
                 * A short window is answered by the panes scrolling, which
                 * they already do, not by abandoning the layout.
                 */
                shell: { raw: "(min-width: 1280px)" },
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                // Tinted backdrop the invoice paper sits on. See globals.css
                ground: "hsl(var(--ground))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                },
                warning: {
                    DEFAULT: "hsl(var(--warning))",
                    foreground: "hsl(var(--warning-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                card: "0 1px 2px 0 hsl(224 44% 12% / 0.04), 0 1px 3px 0 hsl(224 44% 12% / 0.06)",
                "card-hover":
                    "0 4px 6px -1px hsl(224 44% 12% / 0.07), 0 2px 4px -2px hsl(224 44% 12% / 0.05)",
                elevated:
                    "0 10px 24px -6px hsl(224 44% 12% / 0.12), 0 4px 8px -4px hsl(224 44% 12% / 0.08)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                /*
                 * Indeterminate progress bar. Used while a locale change is in
                 * flight: switching language is a server navigation that
                 * refetches the whole tree, and until it lands nothing on
                 * screen moves. A quarter-width bar sliding the full track.
                 */
                indeterminate: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(400%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                indeterminate: "indeterminate 1.1s ease-in-out infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        /*
         * Container queries. The form column is a ~420px rail on a 1440px
         * desktop, so viewport breakpoints inside it describe the wrong box —
         * `sm:` fires while the column is narrower than a phone. See
         * app/components/invoice/InvoiceForm.tsx
         */
        require("@tailwindcss/container-queries"),
    ],
};
