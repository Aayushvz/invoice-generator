"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import {
    InvoiceActions,
    InvoiceForm,
} from "@/app/components";
import ToolBar from "@/app/components/layout/ToolBar";
import DocumentPanel from "@/app/components/layout/DocumentPanel";
import { usePanels } from "@/contexts/PanelContext";
import MobileTabBar from "@/app/components/layout/MobileTabBar";

// Context
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Hooks
import useToasts from "@/hooks/useToasts";

// Types
import { InvoiceType } from "@/types";

const InvoiceMain = () => {
    const formContext = useFormContext<InvoiceType>();
    const { handleSubmit } = formContext;

    // Get the needed values from invoice context
    const { onFormSubmit } = useInvoiceContext();

    const { formValidationError } = useToasts();
    const { tab, formCollapsed, sideCollapsed } = usePanels();

    return (
        <Form {...formContext}>
            <form onSubmit={handleSubmit(onFormSubmit, formValidationError)}>
                {/* no data-cg-theme: the tokens follow next-themes'
                    .dark class on <html>, see app/design.css */}
                <div
                    className="cgShell"
                    data-cg-panel-form={formCollapsed ? "collapsed" : "expanded"}
                    data-cg-panel-side={sideCollapsed ? "collapsed" : "expanded"}
                    data-cg-tab={tab}
                >
                    <ToolBar />
                    <div className="cgGrid">
                        <div className="cgCol cgCol--form">
                            <InvoiceForm />
                        </div>
                        <div className="cgCol cgCol--paper">
                            <InvoiceActions />
                        </div>
                        <DocumentPanel />
                    </div>

                    {/* inside the shell, so it is a row of the 100dvh flex
                        column rather than something overlapping the content.
                        CSS hides it above 1099px. */}
                    <MobileTabBar />
                </div>

            </form>
        </Form>
    );
};

export default InvoiceMain;
