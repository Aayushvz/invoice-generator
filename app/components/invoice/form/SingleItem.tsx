"use client";

import { useEffect } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn

// Components
import { BaseButton, FormInput, FormTextarea } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Utils

// Icons
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

// Types
import { ItemType, NameType } from "@/types";

type SingleItemProps = {
    name: NameType;
    index: number;
    fields: ItemType[];
    moveFieldUp: (index: number) => void;
    moveFieldDown: (index: number) => void;
    removeField: (index: number) => void;
};

const SingleItem = ({
    name,
    index,
    fields,
    moveFieldUp,
    moveFieldDown,
    removeField,
}: SingleItemProps) => {
    const { control, setValue } = useFormContext();

    const { _t } = useTranslationContext();

    // Items
    const itemName = useWatch({
        name: `${name}[${index}].name`,
        control,
    });

    const rate = useWatch({
        name: `${name}[${index}].unitPrice`,
        control,
    });

    const quantity = useWatch({
        name: `${name}[${index}].quantity`,
        control,
    });

    const total = useWatch({
        name: `${name}[${index}].total`,
        control,
    });

    // Currency
    const currency = useWatch({
        name: `details.currency`,
        control,
    });

    useEffect(() => {
        // Calculate total when rate or quantity changes
        if (rate != undefined && quantity != undefined) {
            const calculatedTotal = (rate * quantity).toFixed(2);
            setValue(`${name}[${index}].total`, calculatedTotal);
        }
    }, [rate, quantity]);

    

    return (
        <div className="cgItem group my-2 flex cursor-default flex-col gap-y-5 p-3 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="cgItem__title">
                    <span className="cgItem__ord">{index + 1}</span>
                    {itemName !== "" ? (
                        <span className="cgItem__name">{itemName}</span>
                    ) : (
                        <span className="cgItem__name cgItem__name--empty">
                            Untitled item
                        </span>
                    )}
                </p>

                <div className="cgItem__tools">
                    {/* Up Button. Ghost, not filled: reordering is
                        housekeeping, and two solid accent blocks at the top
                        of every line item were the loudest thing on the
                        step while being the least important. */}
                    <BaseButton
                        variant="ghost"
                        size={"icon"}
                        tooltipLabel="Move the item up"
                        onClick={() => moveFieldUp(index)}
                        disabled={index === 0}
                    >
                        <ChevronUp />
                    </BaseButton>

                    {/* Down Button */}
                    <BaseButton
                        variant="ghost"
                        size={"icon"}
                        tooltipLabel="Move the item down"
                        onClick={() => moveFieldDown(index)}
                        disabled={index === fields.length - 1}
                    >
                        <ChevronDown />
                    </BaseButton>
                </div>
            </div>
            {/*
             * Name spans the full row on phones; quantity and rate share a row
             * beneath it. From sm up all four sit on one 12-column line.
             */}
            <div
                // Container query: a 12-column grid cannot fit the ~420px desktop rail.
                className="grid grid-cols-2 gap-x-3 gap-y-4 @xl:grid-cols-12"
                key={index}
            >
                <div className="col-span-2 min-w-0 @xl:col-span-5">
                    <FormInput
                        name={`${name}[${index}].name`}
                        label={_t("form.steps.lineItems.name")}
                        placeholder="Item name"
                        vertical
                    />
                </div>

                <div className="min-w-0 @xl:col-span-2">
                    <FormInput
                        name={`${name}[${index}].quantity`}
                        type="number"
                        label={_t("form.steps.lineItems.quantity")}
                        placeholder={_t("form.steps.lineItems.quantity")}
                        vertical
                    />
                </div>

                <div className="min-w-0 @xl:col-span-2">
                    <FormInput
                        name={`${name}[${index}].unitPrice`}
                        type="number"
                        label={_t("form.steps.lineItems.rate")}
                        labelHelper={`(${currency})`}
                        placeholder={_t("form.steps.lineItems.rate")}
                        vertical
                    />
                </div>

                {/* a readout, so it is text. It was a readonly <input>,
                    which offers a caret and a focus ring for a value that
                    can never be edited. */}
                <div className="col-span-2 min-w-0 @xl:col-span-3">
                    <p className="cgItem__total">
                        <span className="cgItem__totalLabel">
                            {_t("form.steps.lineItems.total")}
                        </span>
                        <span className="cgItem__totalValue">
                            {total} {currency}
                        </span>
                    </p>
                </div>
            </div>
            <FormTextarea
                name={`${name}[${index}].description`}
                label={_t("form.steps.lineItems.description")}
                placeholder="Item description"
            />
            <div>
                {/* Not allowing deletion for first item when there is only 1 item */}
                {fields.length > 1 && (
                    <BaseButton
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeField(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                        {_t("form.steps.lineItems.removeItem")}
                    </BaseButton>
                )}
            </div>
        </div>
    );
};

export default SingleItem;
