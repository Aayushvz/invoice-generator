"use client";

import { useState } from "react";

// ShadCn
import { Skeleton } from "@/components/ui/skeleton";

// Components
import {
    PdfViewer,
    NewInvoiceAlert,
    InvoiceLoaderModal,
    InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Hooks
import { useIsDesktop } from "@/hooks/useMediaQuery";

// Icons
import {
    FolderUp,
    Import,
    Maximize2,
    Minimize2,
    Plus,
    RotateCcw,
} from "lucide-react";

const InvoiceActions = () => {
    const { invoicePdfLoading, newInvoice } = useInvoiceContext();

    const { _t } = useTranslationContext();

    /*
     * The preview is heavy (it renders the whole invoice template). Below xl it
     * lives in MobilePreviewSheet instead, so only mount it here once we know
     * we are actually on a desktop viewport — `hidden xl:block` alone would
     * still mount and re-render it on phones.
     */
    const isDesktop = useIsDesktop();

    /*
     * Fit the whole invoice into the pane, or show it at full size and scroll.
     *
     * Fit is the default because seeing the entire document at a glance is the
     * point of a preview — but an A4 page in a ~672px pane is about 60% scale,
     * which is fine for judging layout and too small for reading. Hence a
     * toggle rather than a single mode.
     */
    const [fitToPane, setFitToPane] = useState(true);

    /*
     * Direction A + B: on desktop this column is the invoice, not a control
     * panel. The five equal-weight buttons that used to sit on top are now one
     * primary action plus an overflow menu, so the preview is the thing your
     * eye lands on.
     */

    return (
        /* No background of its own. .cgCol--paper already draws the
           dotted ground the sheet sits on, and shell:bg-ground painted a
           second, lighter panel over it - so the invoice read as a card
           inside a card instead of paper on a desk. */
        <div className="min-w-0 shell:flex shell:min-h-0 shell:flex-col">
            {/*
             * Sticky is the fallback for tall-enough-but-short viewports; in
             * the shell the column is a flex child that fills the pinned
             * region instead.
             */}
            <div className="xl:sticky xl:top-24 shell:static shell:flex shell:min-h-0 shell:flex-1 shell:flex-col">
                {/*
                 * Toolbar above the preview — desktop only.
                 *
                 * Document controls on the left, actions on the right, as in
                 * option B. The heading this used to carry said "Invoice
                 * preview" above an invoice preview; the chips use that space
                 * to say something the user can act on.
                 */}
                {/*
                 * The options, as buttons.
                 *
                 * This was a heading that said "Invoice preview" above an
                 * invoice preview, with the four things you can actually do
                 * hidden behind a "..." menu. The heading named what was
                 * already obvious and the menu hid what was not, so the row
                 * now spends its space on the actions themselves - the
                 * arrangement /contract uses above its own sheet.
                 */}
                <div className="cgEditBar shell:px-5 shell:pt-5">
                    <div className="cgEditBar__actions">
                        <InvoiceLoaderModal>
                            <button
                                type="button"
                                className="cgGhostLabel"
                                disabled={invoicePdfLoading}
                            >
                                <FolderUp className="h-4 w-4" />
                                {_t("actions.loadInvoice")}
                            </button>
                        </InvoiceLoaderModal>

                        <InvoiceExportModal>
                            <button
                                type="button"
                                className="cgGhostLabel"
                                disabled={invoicePdfLoading}
                            >
                                <Import className="h-4 w-4" />
                                {_t("actions.exportInvoice")}
                            </button>
                        </InvoiceExportModal>

                        <NewInvoiceAlert>
                            <button
                                type="button"
                                className="cgGhostLabel"
                                disabled={invoicePdfLoading}
                            >
                                <Plus className="h-4 w-4" />
                                {_t("actions.newInvoice")}
                            </button>
                        </NewInvoiceAlert>
                    </div>

                    <div className="cgEditBar__actions">
                        {/* Fit / actual size - shell only, where the pane has
                            a fixed height to fit against */}
                        <button
                            type="button"
                            className="cgGhost hidden shell:inline-flex"
                            aria-pressed={fitToPane}
                            title={
                                fitToPane
                                    ? _t("actions.actualSize")
                                    : _t("actions.fitToScreen")
                            }
                            aria-label={
                                fitToPane
                                    ? _t("actions.actualSize")
                                    : _t("actions.fitToScreen")
                            }
                            onClick={() => setFitToPane((value) => !value)}
                        >
                            {fitToPane ? (
                                <Maximize2 className="h-4 w-4" />
                            ) : (
                                <Minimize2 className="h-4 w-4" />
                            )}
                        </button>

                        <NewInvoiceAlert
                            title={_t("actions.resetFormTitle")}
                            description={_t("actions.resetFormDescription")}
                            confirmLabel={_t("actions.resetFormConfirm")}
                            onConfirm={newInvoice}
                        >
                            <button
                                type="button"
                                className="cgGhostLabel cgEditBar__danger"
                                disabled={invoicePdfLoading}
                            >
                                <RotateCcw className="h-4 w-4" />
                                {_t("actions.resetForm")}
                            </button>
                        </NewInvoiceAlert>
                    </div>
                </div>

                {/*
                 * Live preview / final PDF — desktop only.
                 *
                 * In the shell this pane owns its own scrollbar. A long invoice
                 * is scrolled here rather than by moving the whole page, which
                 * is what keeps the form and the toolbar in place while you
                 * read down the document.
                 */}
                <div className="hidden xl:block shell:min-h-0 shell:flex-1 shell:overflow-y-auto shell:overscroll-contain shell:px-8 shell:pb-8">
                    {isDesktop ? (
                        <PdfViewer fit={fitToPane} />
                    ) : (
                        <Skeleton className="min-h-[30rem] w-full rounded-xl" />
                    )}
                </div>

                {/*
                 * Below xl the preview moves into a sheet, so this column only
                 * carries the secondary actions. Generate and Preview live in
                 * the sticky MobileActionBar.
                 */}
                {/* the phone duplicate of these four actions is gone: the
                    bar above renders at every width now, so there is one
                    list of actions instead of two that could drift. */}           </div>
        </div>
    );
};

export default InvoiceActions;
