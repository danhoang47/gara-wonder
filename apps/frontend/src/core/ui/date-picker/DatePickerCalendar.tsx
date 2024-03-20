import { isInRange, isTwoDateSame } from "@/utils";
import Calendar from "../calendar";
import CalendarCell from "../calendar/CalendarCell";
import { DatePickerMode } from "./DatePicker";
import clsx from "clsx";
import { DateRange } from "@/core/types";

export type DatePickerCalendarBaseProps = {
    month: number;
    year: number;
    onDateSelected: (date: Date) => void;
    mode: DatePickerMode;
};

export type SingleModeProps = DatePickerCalendarBaseProps & {
    mode: "single";
    selectedDate?: Date;
};

export type MultipleModeProps = DatePickerCalendarBaseProps & {
    mode: "range";
    selectedDate?: DateRange;
};

export type DatePickerCalendarProps = SingleModeProps | MultipleModeProps;

export default function DatePickerCalendar({
    mode,
    month,
    onDateSelected,
    selectedDate,
    year,
}: DatePickerCalendarProps) {
    const getSelectedClassName = (date: Date) => {
        if (mode === "single") {
            return isTwoDateSame(date, selectedDate) && "selected";
        } else {
            if (!selectedDate) return undefined

            const { from, to } = selectedDate

            if (isTwoDateSame(from, date)) {
                return "selected from"
            }  
            if (isTwoDateSame(to, date)) {
                return "selected to"
            }
            return undefined
        }
    };
    const checkIfDateBetween = (date: Date) => {
        if (mode === "range") {
            return isInRange(date, selectedDate?.from, selectedDate?.to);
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
                    mode === "single"
                        ? "snap-center w-full"
                        : "snap-start w-[calc(50%-6px)]",
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
                        base: "dateCellWrapper cursor-pointer",
                        wrapper: clsx(
                            "dateCell",
                            getSelectedClassName(date),
                            checkIfDateBetween(date) && "middle",
                            disabled &&
                                "text-default-400 hover:border-transparent cursor-not-allowed line-through",
                        ),
                        text: "relative z-10",
                    }}
                />
            )}
        />
    );
}
