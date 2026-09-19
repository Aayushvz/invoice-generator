"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import { Form } from "@/components/ui/form";

// Components
import {
    InvoiceActions,
    InvoiceForm,
    MobileActionBar,
} from "@/app/components";
import ToolBar from "@/app/components/layout/ToolBar";
import DocumentPanel from "@/app/components/layout/DocumentPanel";

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

    return (
        <Form {...formContext}>
            <form onSubmit={handleSubmit(onFormSubmit, formValidationError)}>
                {/* no data-cg-theme: the tokens follow next-themes'
                    .dark class on <html>, see app/design.css */}
                <div className="cgShell">
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
                </div>

                {/* Sticky Preview / Generate bar, below xl only */}
                <MobileActionBar />
            </form>
        </Form>
    );
};

export default InvoiceMain;
