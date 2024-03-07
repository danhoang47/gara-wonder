import { isTwoDateSame } from "@/utils";
import Calendar from "../calendar";
import CalendarCell from "../calendar/CalendarCell";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import DateNavigation from "./DateNavigation";

import "./DatePicker.styles.scss";
import { usePrevious } from "@/core/hooks";

export type DateRange = {
    from?: Date;
    to?: Date;
};

export type DatePickerBaseProps = {
    disabledDates?: Date[];
    defaultYear?: number;
    defaultMonth?: number;
    disallowEmptySelection?: boolean;
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
    selectedDate,
    disallowEmptySelection = false,
    onSelectedChange,
}: DatePickerProps) {
    const [index, setIndex] = useState<number>(0);
    const [year, setYear] = useState<number>(defaultYear);
    const [month, setMonth] = useState<number>(defaultMonth);
    const previousMonth = usePrevious(month);
    const renderedMonth = useMemo(() => {
        if (!previousMonth) return [month]

        if (previousMonth < month) return [previousMonth, month]
        else return [month, previousMonth]
    }, [month])
    const carouselRef = useRef<HTMLDivElement>(null)

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

    useLayoutEffect(() => {
        if (!carouselRef.current || !previousMonth) return;

        const { current } = carouselRef;
        const { width } = current.getBoundingClientRect();

        if (previousMonth > month) {
            current.scroll({
                behavior: "instant",
                left: width,
            })   
            current.scroll({
                behavior: "smooth",
                left: 0
            })
        } else {
            current.scroll({
                behavior: "smooth",
                left: width
            })
        }
    }, [carouselRef, month])

    useEffect(() => {
        if (!carouselRef.current) return;

        const onScrollend = () => {
            
        }

        const { current } = carouselRef
        current.addEventListener("scrollend", onScrollend)

        return () => current.removeEventListener("scrollend", onScrollend)
    }, [carouselRef])

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
                {renderedMonth?.map(month => (
                    <Calendar
                        key={month}
                        year={year}
                        month={month}
                        // disablePastDates
                        classNames={{
                            wrapper: "calendar shrink-0",
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
                ))}
            </div>
        </div>
    );
}

export default DatePicker;
