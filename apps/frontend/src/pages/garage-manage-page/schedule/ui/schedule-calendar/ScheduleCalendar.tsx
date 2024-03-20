import moment from "moment";
import clsx from "clsx";

import { Calendar } from "@/core/ui";
import { isTwoDateSame } from "@/utils";

export type ScheduleCalendarProps = {
    selectedDates: Date[];
    month: number;
    year: number;
    onDateSelected: (date: Date) => void;
};

function ScheduleCalendar({
    selectedDates,
    month,
    year,
    onDateSelected,
}: ScheduleCalendarProps) {
    const checkIfDateSelected = (date: Date) => {
        return selectedDates.some((selectedDate: Date) =>
            isTwoDateSame(selectedDate, date),
        );
    };

    return (
        <Calendar
            disabledDates={[
                {
                    from: undefined,
                    to: moment().add(-1).toDate(),
                },
            ]}
            month={month}
            year={year}
            renderHeader={(date) => (
                <div className="sticky top-0 w-full px-4 py-6 bg-background flex gap-4">
                    <h2 className="font-semibold text-2xl z-10">
                        {moment(date).format("MMMM YYYY")}
                    </h2>
                </div>
            )}
            renderDate={(date, disabled) => (
                <div
                    className={clsx(
                        "basis-[calc(100%/7)] [&:not(:last-child)]:border-r border-t p-4 font-medium flex flex-col justify-between relative",
                        disabled &&
                            "bg-default-100 cursor-not-allowed font-normal text-default-400",
                        checkIfDateSelected(date) &&
                            "before:absolute before:inset-0 before:block before:w-full before:h-full before:border before:border-primary",
                    )}
                    onClick={() => {
                        if (disabled) return;
                        else {
                            onDateSelected(date);
                        }
                    }}
                >
                    <div className="flex items-center">
                        <p className="text-default-500">{date.getDate()}</p>
                    </div>
                    <div>
                        <p className="text-right text-medium font-semibold">
                            <span>6</span>/<span>8</span>
                        </p>
                    </div>
                </div>
            )}
            classNames={{
                wrapper: "flex flex-col h-full",
                weekDayWrapper: "text-left pl-4",
            }}
        />
    );
}

export default ScheduleCalendar;
