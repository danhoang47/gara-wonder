import { isTwoDateSame } from "@/utils";
import Calendar from "../calendar";
import CalendarCell from "../calendar/CalendarCell";
import Carousel from "../carousel";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
export type DateRange = {
    from?: Date;
    to?: Date;
};

const MAX_MONTH = 11;
const MIN_MONTH = 0;

export type DatePickerBaseProps = {
    disabledDates?: Date[];
    defaultYear?: number;
    defaultMonth?: number;
};

export type SingleModeProps = DatePickerBaseProps & {
    mode: "single";
    selectedDate?: Date;
    onSelectedChange: (date?: Date) => void;
};

export type MultipleModeProps = DatePickerBaseProps & {
    mode: "range";
    selectedDate?: DateRange;
    onSelectedChange: (range?: DateRange) => void;
};

export type DatePickerProps = SingleModeProps | MultipleModeProps;

function DatePicker({
    defaultYear,
    defaultMonth,
    mode,
    selectedDate,
    onSelectedChange,
}: DatePickerProps) {
    const [action, setAction] = useState<"next" | "back">();
    const [year, setYear] = useState<number>(
        defaultYear || new Date().getFullYear(),
    );
    const [month, setMonth] = useState<number>(
        defaultMonth || new Date().getMonth(),
    );
    const renderedCalendar = useMemo(() => {
        return [
            { year: 2024, month: 0 },
            { year: 2024, month: 1 },
            { year: 2024, month: 2 },
        ];
    }, [year, month]);

    const onDateSelected = (date: Date) => {
        if (mode === "single") {
            if (selectedDate && isTwoDateSame(date, selectedDate)) {
                onSelectedChange(undefined);
            } else {
                onSelectedChange(date);
            }
        } else {
            if (!selectedDate) {
                onSelectedChange({ from: date, to: undefined });
                return;
            }
        }
    };

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
        <Carousel
            items={renderedCalendar}
            classNames={{
                item: "w-full",
            }}
            startIndex={1}
            renderItem={({ year, month }) => (
                <Calendar
                    key={year + month}
                    year={year}
                    month={month}
                    disablePastDates
                    renderDate={(date, disabled) => (
                        <CalendarCell
                            key={date.getTime()}
                            date={date}
                            disabled={disabled}
                            onClick={onDateSelected}
                            classNames={{
                                base: "cursor-pointer",
                                wrapper: clsx(
                                    "rounded-full hover:bg-default",
                                    checkIfDateSelected(date)
                                        ? "bg-foreground text-background hover:bg-foreground"
                                        : undefined,
                                ),
                            }}
                        />
                    )}
                />
            )}
            onNavigate={(type) => setAction(type)}
        />
    );
}

export default DatePicker;
