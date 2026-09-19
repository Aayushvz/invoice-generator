"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            /* the popover around this already draws the surface, so the
               calendar only owns its own padding */
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                /* the header is a row, not a centred caption with two
                   absolutely positioned arrows sitting on top of it: the
                   month and year dropdowns are wide enough that centring
                   them pushed the arrows onto the same pixels. */
                caption: "flex items-center justify-between gap-2 pb-1",
                caption_label: "text-[13px] font-medium tabular-nums",
                caption_dropdowns: "flex items-center gap-1.5",
                nav: "flex items-center gap-1",
                nav_button:
                    "inline-flex h-7 w-7 items-center justify-center rounded-[var(--cg-control-radius)] text-[var(--cg-fg-2)] transition-colors hover:bg-[var(--cg-line-2)] hover:text-[var(--cg-fg)] disabled:opacity-40",
                nav_button_previous: "",
                nav_button_next: "",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "cgCal__weekday w-9",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                /* .cgCal__day carries the shape, the hover and the
                   aria-selected accent already, so the day needs a size and
                   nothing else. Today is a hairline ring rather than a
                   filled wash, so it cannot be mistaken for the selected
                   day at a glance. */
                day: "cgCal__day h-9 w-9",
                day_selected: "",
                day_today:
                    "border-[var(--cg-line)] font-medium text-[var(--cg-fg)]",
                day_outside: "text-[var(--cg-fg-2)] opacity-50",
                day_disabled: "text-[var(--cg-fg-2)] opacity-40",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                Dropdown: ({
                    value,
                    onChange,
                    children,
                    ...props
                }: DropdownProps) => {
                    const options = React.Children.toArray(
                        children
                    ) as React.ReactElement<
                        React.HTMLProps<HTMLOptionElement>
                    >[];
                    const selected = options.find(
                        (child) => child.props.value === value
                    );
                    const handleChange = (value: string) => {
                        const changeEvent = {
                            target: { value },
                        } as React.ChangeEvent<HTMLSelectElement>;
                        onChange?.(changeEvent);
                    };
                    return (
                        <Select
                            value={value?.toString()}
                            onValueChange={(value) => {
                                handleChange(value);
                            }}
                        >
                            <SelectTrigger className="h-8 gap-1 border-[var(--cg-line)] bg-transparent px-2 text-[13px] focus:ring-0">
                                <SelectValue>
                                    {selected?.props?.children}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <ScrollArea className="h-80">
                                    {options.map((option, id: number) => (
                                        <SelectItem
                                            key={`${option.props.value}-${id}`}
                                            value={
                                                option.props.value?.toString() ??
                                                ""
                                            }
                                        >
                                            {option.props.children}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    );
                },
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => (
                    <ChevronRight className="h-4 w-4" />
                ),
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
