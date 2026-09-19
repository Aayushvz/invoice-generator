// Components
import { InvoiceMain } from "@/app/components";
import LandingContent from "@/app/components/layout/LandingContent";

// Contexts
import { WizardProvider } from "@/contexts/WizardContext";
import { PanelProvider } from "@/contexts/PanelContext";

export default async function Home(props: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await props.params;

    return (
        <>
            {/*
             * No container, no padding: the builder is an app shell, not a
             * page. .cgShell is height:100dvh and owns the window, the way
             * /contract does.
             *
             * This was gated on a `shell:` variant that required
             * min-height:800px as well as min-width:1280px. On any window
             * shorter than that the container came back and wrapped the
             * shell in gutters, so a 100dvh layout sat inside a padded box
             * with dead strips down both sides and along the top. Viewport
             * HEIGHT has no business deciding whether a full-bleed layout
             * is full-bleed; the narrow-width case is already handled by
             * the tool's own breakpoints in design.css.
             */}
            <main>
                {/*
                 * No Suspense boundary: WizardProvider reads the step from
                 * window.location rather than useSearchParams, so this page
                 * stays statically prerendered. See contexts/WizardContext.tsx
                 */}
                <WizardProvider>
                    <PanelProvider>
                        <InvoiceMain />
                    </PanelProvider>
                </WizardProvider>
            </main>

        </>
    );
}
