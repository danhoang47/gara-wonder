import { isTwoDateSame } from "@/utils";
import Calendar from "../calendar";
import CalendarCell from "../calendar/CalendarCell";
import { DatePickerMode } from "./DatePicker";
import clsx from "clsx";
import { DateRange } from "@/core/types";

export type DatePickerCalendarBaseProps = {
    month: number,
    year: number,
    onDateSelected: (date: Date) => void;
    mode: DatePickerMode
}

export type SingleModeProps = DatePickerCalendarBaseProps & {
    mode: "single";
    selectedDate?: Date;
};

export type MultipleModeProps = DatePickerCalendarBaseProps & {
    mode: "range";
    selectedDate?: DateRange;
};

export type DatePickerCalendarProps = SingleModeProps | MultipleModeProps

export default function DatePickerCalendar({
    mode,
    month,
    onDateSelected,
    selectedDate,
    year
}: DatePickerCalendarProps) {

    const checkIfDateSelected = (date: Date) => {
        if (mode === "single") {
            return isTwoDateSame(date, selectedDate);
        } else {
            return selectedDate
                ? isTwoDateSame(selectedDate?.from, date) ||
                      isTwoDateSame(selectedDate?.to, date)
                : false;
        }
    };

    return (
        <Calendar
            key={month}
            year={year}
            month={month}
            classNames={{
                wrapper: clsx(
                    "calendar shrink-0",
                    mode === "single" ? "snap-center w-full" : "snap-start w-[calc(50%-6px)]"
                ),
            }}
            disabledDates={[{ from: undefined, to: new Date() }]}
            renderDate={(date, disabled) => (
                <CalendarCell
                    key={date.getTime()}
                    date={date}
                    disabled={disabled}
                    onClick={onDateSelected}
                    classNames={{
                        base: "cursor-pointer",
                        wrapper: clsx(
                            "rounded-full border border-transparent hover:border-foreground",
                            checkIfDateSelected(date)
                                ? "bg-foreground text-background hover:bg-foreground"
                                : undefined,
                            disabled &&
                                "text-default-400 hover:border-transparent cursor-not-allowed line-through",
                        ),
                    }}
                />
            )}
        />
    )
}