import { isAfter, isBefore, isInRange, isTwoDateSame } from "@/utils";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import DateNavigation from "./DateNavigation";

import "./DatePicker.styles.scss";
import { usePrevious } from "@/core/hooks";
import DatePickerCalendar from "./DatePickerCalendar";
import { DateRange } from "@/core/types";
import { DisabledDate } from "../calendar/Calendar";

export type DatePickerMode = "single" | "range";

export type DatePickerBaseProps = {
    disabledDates?: DisabledDate[];
    defaultYear?: number;
    defaultMonth?: number;
    disallowEmptySelection?: boolean;
    mode: DatePickerMode;
    show?: "single" | "double";
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
    defaultYear = new Date().getFullYear(),
    defaultMonth = new Date().getMonth(),
    mode,
    show = "single",
    selectedDate,
    disallowEmptySelection = false,
    onSelectedChange,
    disabledDates = []
}: DatePickerProps) {
    const [year, setYear] = useState<number>(defaultYear);
    const [month, setMonth] = useState<number>(defaultMonth);
    const previousMonth = usePrevious(month);
    const renderedMonth = useMemo(() => {
        if (show === "single") {
            if (previousMonth === undefined) return [month];

            if (previousMonth < month) return [previousMonth, month];
            return [month, previousMonth];
        } else {
            if (previousMonth === undefined) return [month, month + 1];

            if (previousMonth < month) return [previousMonth, month, month + 1];
            return [month, previousMonth, previousMonth + 1];
        }
    }, [month]);
    const carouselRef = useRef<HTMLDivElement>(null);

    const onDateSelected = (date: Date) => {
        if (mode === "single") {
            if (selectedDate && isTwoDateSame(date, selectedDate)) {
                if (!disallowEmptySelection) onSelectedChange(undefined);
            } else {
                onSelectedChange(date);
            }
        } else {
            if (!selectedDate) {
                onSelectedChange({ from: date, to: undefined });
                return;
            }

            const { from, to } = selectedDate;

            if (!from) {
                onSelectedChange({ from: date, to: undefined });
            } else if (!to && isTwoDateSame(date, from)) {
                onSelectedChange({ from: undefined, to: undefined });
            } else if (isBefore(date, from)) {
                onSelectedChange({ from: date, to: from });
            } else if (!to) {
                onSelectedChange({ from, to: date });
            } else if (isTwoDateSame(date, from) || isTwoDateSame(date, to)) {
                onSelectedChange({ from: date, to: undefined });
            } else if (isInRange(date, from, to) || isAfter(date, to)) {
                onSelectedChange({ from, to: date });
            }
        }
    };

    useLayoutEffect(() => {
        if (!carouselRef.current || previousMonth === undefined) return;

        const { current } = carouselRef;
        const calendarElement = current.querySelector(".calendar");

        if (!calendarElement) return;

        const { width } = calendarElement.getBoundingClientRect();

        if (previousMonth > month) {
            current.scroll({
                behavior: "instant",
                left: width,
            });
            current.scroll({
                behavior: "smooth",
                left: 0,
            });
        } else {
            current.scroll({
                behavior: "instant",
                left: 0,
            });
            current.scroll({
                behavior: "smooth",
                left: width,
            });
        }

        return () => {};
    }, [carouselRef, month, mode]);

    return (
        <div className="relative">
            <DateNavigation
                onBackPress={() => {
                    setMonth(month - 1);
                }}
                onNextPress={() => {
                    setMonth(month + 1);
                }}
            />
            <div className="datePickerCarousel" ref={carouselRef}>
                {renderedMonth?.map((month) => (
                    <DatePickerCalendar
                        disabledDates={[{ from: undefined, to: new Date() }, ...disabledDates]}
                        key={month}
                        mode={mode}
                        month={month}
                        year={year}
                        onDateSelected={onDateSelected}
                        selectedDate={selectedDate}
                    />
                ))}
            </div>
        </div>
    );
}

export default DatePicker;
