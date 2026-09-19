"use client";

import { useMemo } from "react";

// RHF
import { useFormContext, useWatch, type FieldErrors } from "react-hook-form";

// Contexts
import { useWizard } from "@/contexts/WizardContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Steps
import {
    WIZARD_STEPS,
    WIZARD_WATCHED_FIELDS,
    isItemsStep,
} from "@/lib/wizardSteps";

// Types
import { InvoiceType, ItemType } from "@/types";

/**
 * `partial` is the important one: a step the user has passed through but not
 * actually filled in. Previously any step behind the cursor rendered a green
 * check, because RHF validates on submit so `errors` is empty until then —
 * skipping ahead marked the whole form complete, which is a lie.
 */
type StepState = "invalid" | "active" | "complete" | "partial" | "upcoming";

const filled = (value: unknown) =>
    typeof value === "string"
        ? value.trim().length > 0
        : value !== undefined && value !== null && value !== "";

/** Walks a dotted path into the errors object. */
function hasError(errors: FieldErrors<InvoiceType>, path: string): boolean {
    let node: unknown = errors;
    for (const key of path.split(".")) {
        if (!node || typeof node !== "object") return false;
        node = (node as Record<string, unknown>)[key];
        if (node === undefined) return false;
    }
    return Boolean(node);
}

const WizardProgress = () => {
    const { activeStep, stepCount, goToStep } = useWizard();

    const {
        control,
        formState: { errors },
    } = useFormContext<InvoiceType>();

    const { _t } = useTranslationContext();

    /*
     * Narrow subscription driven by the step definitions, so adding a field to
     * a step's completeness automatically widens the watch. This was a
     * full-form `useWatch({ control })`, which re-rendered on every keystroke
     * anywhere in the invoice — including the base64 logo.
     */
    const watched = useWatch({
        control,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: WIZARD_WATCHED_FIELDS as any,
    }) as unknown[];

    const values = useMemo(() => {
        const map: Record<string, unknown> = {};
        WIZARD_WATCHED_FIELDS.forEach((field, index) => {
            map[field] = watched[index];
        });
        return map;
    }, [watched]);

    const steps = useMemo(() => {
        const items = (values["details.items"] as ItemType[] | undefined) ?? [];

        return WIZARD_STEPS.map((step) => {
            const isValid = !step.errorPaths.some((path) =>
                hasError(errors, path)
            );
            const label = _t(`form.wizard.${step.labelKey}`);

            if (isItemsStep(step.id)) {
                return {
                    ...step,
                    label,
                    isValid,
                    isComplete:
                        items.length > 0 &&
                        items.every(
                            (item) =>
                                filled(item?.name) &&
                                Number(item?.quantity) > 0 &&
                                Number(item?.unitPrice) > 0
                        ),
                    isStarted: items.some((item) => filled(item?.name)),
                };
            }

            const fieldValues = step.requiredFields.map(
                (field) => values[field]
            );

            return {
                ...step,
                label,
                isValid,
                isComplete: fieldValues.every(filled),
                isStarted: fieldValues.some(filled),
            };
        });
    }, [values, errors, _t]);

    type Step = (typeof steps)[number];

    /**
     * Resolves the visual state of a step. Invalid always wins so a step with
     * errors stays flagged even while it is the active one.
     */
    const getStepState = (step: Step): StepState => {
        if (!step.isValid) return "invalid";
        if (step.isComplete) return "complete";
        if (step.id === activeStep) return "active";
        if (step.isStarted) return "partial";
        return "upcoming";
    };

    const activeStepData = steps[activeStep];

    const stepAriaLabel = (step: Step, state: StepState) =>
        `${_t("form.wizard.stepLabel")} ${step.id + 1}: ${step.label}${
            state === "invalid"
                ? ` — ${_t("form.wizard.hasErrors")}`
                : state === "complete"
                  ? ` — ${_t("form.wizard.stateComplete")}`
                  : state === "partial"
                    ? ` — ${_t("form.wizard.stateIncomplete")}`
                    : ""
        }`;

    /*
     * One shape at every width, and one control instead of three.
     *
     * This was a name and a count, then a progress bar, then a row of five
     * numbered circles carrying their own labels: three elements reporting
     * the same fact. In the 360px panel the five labels truncated to
     * "Fro...", "Invoi...", "Line ...", which is a label that has stopped
     * being one, and the numbers were only ever ordinals the order already
     * gave you.
     *
     * A segmented track carries all of it: five segments are the five steps,
     * how many are filled is the progress, and the one label worth spelling
     * out is the step you are on, named above it. Every segment is still the
     * same button, so nothing about navigation changed.
     *
     * Branching on isShell is gone with it. That existed to pick between two
     * shapes, and rendering both while hiding one put two <ol>s of steps in
     * the DOM, which announced ten steps for a five-step form. One shape
     * cannot have that problem.
     */
    return (
        <nav aria-label={_t("form.wizard.progressLabel")} className="cgWizard">
            <div className="cgWizard__head">
                <span className="cgWizard__name">{activeStepData?.label}</span>
                <span className="cgWizard__count">
                    {activeStep + 1}/{stepCount}
                </span>
            </div>

            <ol className="cgWizard__track">
                {steps.map((step) => {
                    const state = getStepState(step);

                    return (
                        <li key={step.id} className="cgWizard__seg">
                            <button
                                type="button"
                                onClick={() => goToStep(step.id)}
                                aria-label={stepAriaLabel(step, state)}
                                aria-current={
                                    step.id === activeStep ? "step" : undefined
                                }
                                title={step.label}
                                data-state={state}
                                className="cgWizard__segBtn"
                            />
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default WizardProgress;
