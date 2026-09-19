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
                    {label && <label className="cgField__label">{label}</label>}
                    {labelHelper && <span className="cgField__opt">{labelHelper}</span>}
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
