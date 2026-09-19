"use client";

import { TemplateGallery } from "@/app/components";
import { PanelCollapseRightIcon } from "@/app/components/reusables/icons";
import { usePanels } from "@/contexts/PanelContext";

/*
  The DOCUMENT panel: everything that changes how the invoice LOOKS, as
  opposed to what it says.

  That split is the whole point of the two panels. The left one is the
  invoice's content, this one is its appearance, and a control belongs to
  whichever question it answers. Before this, appearance lived in a row of
  pills floating over the top of the preview, attached to nothing.

  The header is flush to the top of its column at --cg-bar-h, the same
  height as the toolbar and the form panel's header, so the three labels
  sit on one line straight across the app.
*/
const DocumentPanel = () => {
    const { sideCollapsed, setSideCollapsed } = usePanels();

    if (sideCollapsed) {
        return (
            <aside className="cgSide" id="invoice-side-panel">
                <div className="cgPanelRail">
                    <button
                        type="button"
                        className="cgGhost"
                        onClick={() => setSideCollapsed(false)}
                        aria-label="Expand the document panel"
                    >
                        <PanelCollapseRightIcon />
                    </button>
                    <p className="cgPanelRail__label">Document</p>
                </div>
            </aside>
        );
    }

    return (
        <aside className="cgSide" id="invoice-side-panel">
            <div className="cgSide__bar">
                <p className="cgSide__title">Document</p>
                <button
                    type="button"
                    className="cgGhost cgSide__close"
                    onClick={() => setSideCollapsed(true)}
                    aria-label="Collapse the document panel"
                >
                    <PanelCollapseRightIcon />
                </button>
            </div>

            {/* one instance, so the template dialog is mounted once: see the
                note in TemplateGallery on why two would fight */}
            <TemplateGallery variant="panel" />
        </aside>
    );
};

export default DocumentPanel;
