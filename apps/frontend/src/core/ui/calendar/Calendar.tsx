import { useMemo } from "react";
import moment from "moment";
import CalendarCell from "./CalendarCell";
import clsx from "clsx";

const NUMBER_OF_CELL = 35;
const NUMBER_OF_COLUMN = 7;

const columns = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export type CalendarProps = {
    year: number;
    month: number;
    disabledDates?: Date[];
    renderDate?: (date: Date, disabled: boolean) => React.ReactNode;
    disablePastDates?: boolean;
    renderHeader?: (date: Date) => React.ReactNode;
    classNames?: Partial<
        Record<
            "wrapper" | "dateWrapper" | "dateCell" | "row" | "headerCell",
            string
        >
    >;
    onDateClick?: (dates: Date) => void;
};

const checkIfPastDate = (date: Date, month: number) => {
    return moment().month(month).isSame(date);
};

const Calendar = ({
    year,
    month,
    disabledDates = [],
    disablePastDates = true, // done
    renderDate,
    renderHeader,
    onDateClick,
    classNames
}: CalendarProps) => {
    const thisMonth = useMemo(
        () => moment().year(year).month(month),
        [year, month],
    );

    console.log(thisMonth.toDate())
    const rows = useMemo(() => {
        const firstSunday = thisMonth.clone().startOf("month").day(0);
        console.log(firstSunday.toDate())
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
                    <p className="text-center font-semibold">{thisMonth.format("MMMM YYYY")}</p>
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
                                    (disablePastDates &&
                                        checkIfPastDate(date, month)) ||
                                        disabledDates.some((disabledDate) =>
                                            moment(disabledDate).isSame(date),
                                        ),
                                )
                            ) : (
                                <CalendarCell
                                    key={date.getTime()}
                                    date={date}
                                    disabled={
                                        disablePastDates &&
                                        checkIfPastDate(date, month)
                                    }
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
