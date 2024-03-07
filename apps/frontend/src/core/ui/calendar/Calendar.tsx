import { useMemo } from "react";
import moment from "moment";
import CalendarCell from "./CalendarCell";
import clsx from "clsx";
import { isInRange, isTwoDateSame } from "@/utils";

const NUMBER_OF_CELL = 35;
const NUMBER_OF_COLUMN = 7;

const columns = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export type DateRange = {
    from?: Date | number,
    to: Date | number
}

export type DisabledDate = Date | number | string | DateRange

export type CalendarProps = {
    year: number;
    month: number;
    disabledDates?: DisabledDate[];
    renderDate?: (date: Date, disabled: boolean) => React.ReactNode;
    renderHeader?: (date: Date) => React.ReactNode;
    classNames?: Partial<
        Record<
            "wrapper" | "dateWrapper" | "dateCell" | "row" | "headerCell",
            string
        >
    >;
    onDateClick?: (dates: Date) => void;
};

const checkIfDateDisabled = (date: Date, disabledDates?: DisabledDate[]) => {
    if (!disabledDates) return true;

    for (const disabledDate of disabledDates) {
        const startOfDate = moment(new Date(date)).startOf("day")

        if (
            typeof disabledDate === "string" || 
            typeof disabledDate === "number" || 
            disabledDate instanceof Date
        ) {
            const startOfDisabledDate = moment(new Date(disabledDate)).startOf("day");

            if (isTwoDateSame(startOfDate, startOfDisabledDate)) {
                return true;
            }
        } else {
            let startOfDisabledFromDate = disabledDate?.from && moment(disabledDate?.from).startOf("day") 
            let startOfDisabledToDate = moment(disabledDate?.to).startOf("day")

            if (
                startOfDisabledFromDate && 
                isInRange(startOfDate, startOfDisabledFromDate, startOfDisabledToDate)
            ) {
                return true;
            } 
            if (startOfDate.isBefore(startOfDisabledToDate)) {
                return true;
            }
        }
    }

    return false;
};

const Calendar = ({
    year,
    month,
    disabledDates = [],
    renderDate,
    renderHeader,
    onDateClick,
    classNames,
}: CalendarProps) => {
    const thisMonth = useMemo(
        () => moment().year(year).month(month),
        [year, month],
    );

    const rows = useMemo(() => {
        const firstSunday = thisMonth.clone().startOf("month").day(0);
        const dateOfMonth = firstSunday.toDate().getDate();
        const datesInMonth: Date[] = Array.from(new Array(NUMBER_OF_CELL)).map(
            (_, index) => {
                const date = firstSunday.clone().toDate();
                date.setDate(index + dateOfMonth);
                return date;
            },
        );
        return datesInMonth.reduce<Date[][]>((acc, _, index) => {
            if ((index + 1) % NUMBER_OF_COLUMN === 0) {
                return [...acc, datesInMonth.slice(index - 6, index + 1)];
            }

            return acc;
        }, []);
    }, [thisMonth]);

    return (
        <div className={clsx("w-full", classNames?.wrapper)}>
            <div className="flex items-center justify-center  h-8">
                {renderHeader ? (
                    renderHeader(thisMonth.toDate())
                ) : (
                    <p className="text-center font-semibold">
                        {thisMonth.format("MMMM YYYY")}
                    </p>
                )}
            </div>
            <div className="flex flex-row">
                {columns.map((column) => (
                    <div key={column} className="basis-[calc(100%/7)] py-2">
                        <p className="text-center text-default-400">{column}</p>
                    </div>
                ))}
            </div>
            <div className="">
                {rows.map((row, index) => (
                    <div className="flex" key={index}>
                        {row.map((date) =>
                            renderDate ? (
                                renderDate(
                                    date,
                                    checkIfDateDisabled(date, disabledDates),
                                )
                            ) : (
                                <CalendarCell
                                    key={date.getTime()}
                                    date={date}
                                    disabled={checkIfDateDisabled(date, disabledDates)}
                                    onClick={onDateClick}
                                />
                            ),
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
