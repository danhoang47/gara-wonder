import moment from "moment";
import clsx from "clsx";

import { Calendar } from "@/core/ui";
import { isTwoDateSame } from "@/utils";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export type ScheduleCalendarProps = {
    selectedDates: Date[];
    onDateSelected: (date: Date) => void;
};

const DEFAULT_YEAR = new Date().getFullYear()

function ScheduleCalendar({
    selectedDates,
    onDateSelected,
}: ScheduleCalendarProps) {
    const [month, setMonth] = useState<number>(new Date().getMonth());

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
            year={DEFAULT_YEAR}
            renderHeader={(date) => (
                <div className="sticky top-0 w-full px-10 py-6 bg-background flex gap-4">
                    <Button
                        isIconOnly
                        radius="full"
                        disableAnimation
                        size="sm"
                        variant="bordered"
                        className={clsx("border cursor-pointer")}
                        onPress={() => setMonth(month - 1)}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                    <h2 className="font-semibold text-2xl z-10">
                        {moment(date).format("MMMM YYYY")}
                    </h2>
                    <Button
                        isIconOnly
                        radius="full"
                        disableAnimation
                        size="sm"
                        variant="bordered"
                        className={clsx("border cursor-pointer")}
                        onPress={() => setMonth(month + 1)}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
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
