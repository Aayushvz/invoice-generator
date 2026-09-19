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
import { Input, InputProps } from "@/components/ui/input";

// Utils
import { cn } from "@/lib/utils";

// Styles
import { fieldControl, fieldLabel, fieldRow } from "./fieldStyles";


type FormInputProps = {
    name: string;
    label?: string;
    labelHelper?: string;
    placeholder?: string;
    vertical?: boolean;
} & InputProps;

const FormInput = ({
    name,
    label,
    labelHelper,
    placeholder,
    vertical = false,
    className,
    ...props
}: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="cgField">
                    {label && <label className="cgField__label">{label}</label>}
                    {labelHelper && <span className="cgField__opt">{labelHelper}</span>}
                    <input
                        {...field}
                        placeholder={placeholder}
                        className={cn("cgInput", className)}
                        {...props as any}
                    />
                </div>
            )}
        />
    );
};

export default FormInput;
