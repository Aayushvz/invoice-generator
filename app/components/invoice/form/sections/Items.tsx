"use client";

import React from "react";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

// Components
import { BaseButton, SingleItem, Subheading, VoiceInput } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { Plus } from "lucide-react";

// Types
import { InvoiceType } from "@/types";

const Items = () => {
    const { control } = useFormContext<InvoiceType>();

    const { _t } = useTranslationContext();

    const ITEMS_NAME = "details.items";
    const { fields, append, remove, move } = useFieldArray({
        control: control,
        name: ITEMS_NAME,
    });

    const addNewField = () => {
        append({
            name: "",
            description: "",
            quantity: 0,
            unitPrice: 0,
            total: 0,
        });
    };

    const handleVoiceItemsParsed = (items: { name: string; quantity: number; unitPrice: number; description?: string }[]) => {
        items.forEach(item => {
            append({
                name: item.name,
                description: item.description || "",
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: 0,
            });
        });
    };

    const removeField = (index: number) => {
        remove(index);
    };

    const moveFieldUp = (index: number) => {
        if (index > 0) {
            move(index, index - 1);
        }
    };
    const moveFieldDown = (index: number) => {
        if (index < fields.length - 1) {
            move(index, index + 1);
        }
    };

    return (
        <section className="flex flex-col gap-2 w-full">
            <Subheading>{_t("form.steps.lineItems.heading")}</Subheading>
            {/* Reordering is the up/down pair on each row. Drag-and-drop
                was a third control for it, behind a grip that gave no hint
                of where a row could go and could not be operated from a
                keyboard at all. */}
            {fields.map((field, index) => (
                <SingleItem
                    key={field.id}
                    name={ITEMS_NAME}
                    index={index}
                    fields={fields}
                    moveFieldUp={moveFieldUp}
                    moveFieldDown={moveFieldDown}
                    removeField={removeField}
                />
            ))}
            <div className="flex flex-wrap gap-2">
                {/* outline, not filled: Next is this panel's primary and
                    adding a row is the step's own secondary action. Two
                    filled controls side by side make neither one read as
                    the thing to press. */}
                <BaseButton
                    variant="outline"
                    tooltipLabel="Add a new item to the list"
                    onClick={addNewField}
                >
                    <Plus />
                    {_t("form.steps.lineItems.addNewItem")}
                </BaseButton>
                <VoiceInput onItemsParsed={handleVoiceItemsParsed} />
            </div>
        </section>
    );
};

export default Items;
