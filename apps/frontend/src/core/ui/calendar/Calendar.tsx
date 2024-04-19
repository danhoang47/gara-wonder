import { useMemo } from "react";
import moment from "moment";
import CalendarCell from "./CalendarCell";
import clsx from "clsx";
import { isInRange, isTwoDateSame } from "@/utils";
import weekDays, { WeekDay } from "./weekDays";

const NUMBER_OF_CELL = 35;
const NUMBER_OF_COLUMN = 7;

const columns: Array<WeekDay> = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export type DateRange = {
    from?: Date | number;
    to?: Date | number;
};

export type DisabledDate = Date | number | string | DateRange;

export type CalendarProps = {
    year: number;
    month: number;
    disabledDates?: DisabledDate[];
    renderDate?: (date: Date, disabled: boolean) => React.ReactNode;
    renderHeader?: (date: Date) => React.ReactNode;
    classNames?: Partial<
        Record<
            | "wrapper"
            | "dateWrapper"
            | "dateCell"
            | "row"
            | "headerCell"
            | "weekDayWrapper"
            | "weekDay",
            string
        >
    >;
    onDateClick?: (dates: Date) => void;
    showWeekDays?: boolean;
    showHeader?: boolean;
    weekDayFormat?: "long" | "short";
};

const checkIfDateDisabled = (date: Date, disabledDates?: DisabledDate[]) => {
    if (!disabledDates) return true;

    for (const disabledDate of disabledDates) {
        const startOfDate = moment(new Date(date)).startOf("day");

        if (
            typeof disabledDate === "string" ||
            typeof disabledDate === "number" ||
            disabledDate instanceof Date
        ) {
            const startOfDisabledDate = moment(new Date(disabledDate)).startOf(
                "day",
            );

            if (isTwoDateSame(startOfDate, startOfDisabledDate)) {
                return true;
            }
        } else {
            const startOfDisabledFromDate =
                disabledDate?.from && moment(disabledDate?.from).startOf("day");
            const startOfDisabledToDate = moment(disabledDate?.to).startOf(
                "day",
            );

            if (
                startOfDisabledFromDate &&
                isInRange(
                    startOfDate,
                    startOfDisabledFromDate,
                    startOfDisabledToDate,
                )
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
    weekDayFormat = "short",
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
        <div className={clsx("max-w-full", classNames?.wrapper)}>
            {renderHeader ? (
                renderHeader(thisMonth.toDate())
            ) : (
                <div className="flex items-center justify-center h-8">
                    <p className="text-center font-semibold">
                        {thisMonth.format("MMMM YYYY")}
                    </p>
                </div>
            )}
            <div className="flex flex-row">
                {columns.map((column) => (
                    <div
                        key={column}
                        className={clsx(
                            "basis-[calc(100%/7)] py-2",
                            classNames?.weekDayWrapper,
                        )}
                    >
                        <p className="text-default-400">
                            {weekDays[column][weekDayFormat]}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col grow">
                {rows.map((row, index) => (
                    <div className="flex grow" key={index}>
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
                                    disabled={checkIfDateDisabled(
                                        date,
                                        disabledDates,
                                    )}
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
