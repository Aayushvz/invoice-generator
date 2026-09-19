"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

// Utils
import { cn } from "@/lib/utils";

type FormTextareaProps = {
    name: string;
    label?: string;
    labelHelper?: string;
    placeholder?: string;
} & TextareaProps;

const FormTextarea = ({
    name,
    label,
    labelHelper,
    placeholder,
    className,
    ...props
}: FormTextareaProps) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="cgField">
                    {/* the helper sits INSIDE the label, not beside it as
                        another flex child. .cgField is a column, so a
                        separate span put "(USD)" on its own line and pushed
                        the Rate input a row below Quantity, leaving two
                        fields on one row that no longer lined up. */}
                    {label && (
                        <label className="cgField__label">
                            {label}
                            {labelHelper && (
                                <span className="cgField__opt"> {labelHelper}</span>
                            )}
                        </label>
                    )}
                    <textarea
                        {...field}
                        rows={4}
                        placeholder={placeholder}
                        className={cn("cgInput cgInput--area", className)}
                        {...props as any}
                    />
                </div>
            )}
        />
    );
};

export default FormTextarea;
