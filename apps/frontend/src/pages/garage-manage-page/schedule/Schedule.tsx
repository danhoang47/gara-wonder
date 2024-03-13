import { useState } from "react";
import { Button } from "@nextui-org/react";

import { Calendar } from "@/core/ui";
import moment from "moment";
import clsx from "clsx";
import { isTwoDateSame } from "@/utils";

function Schedule() {
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    // TODO: testing purpose only
    const checkIfDateSelected = (date: Date) => {
        return selectedDates.some((selectedDate: Date) =>
            isTwoDateSame(selectedDate, date),
        );
    };

    return (
        <div className="flex h-full">
            <div className="grow h-full overflow-auto flex flex-col">
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
                                if (checkIfDateSelected(date)) {
                                    setSelectedDates(
                                        selectedDates.filter(
                                            (selectedDate) =>
                                                !isTwoDateSame(
                                                    selectedDate,
                                                    date,
                                                ),
                                        ),
                                    );
                                } else {
                                    setSelectedDates((prev) => [...prev, date]);
                                }
                            }}
                        >
                            <div className="flex items-center">
                                <p>{date.getDate()}</p>
                            </div>
                            <div>
                                <p className="text-right text-large">
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
            </div>
            <div className="w-1/4 min-w-80 h-full flex flex-col relative border-l">
                <div className="px-4 py-6">
                    <p className="font-semibold text-xl">
                        Chỉnh sửa trạng thái
                    </p>
                    <span className="text-small text-default-500">
                        Chọn ngày mà bạn muốn chỉnh sửa
                    </span>
                </div>
                <div className="grow overflow-auto"></div>
                <div className="sticky bottom-0">
                    <div className="flex justify-end p-4 gap-2">
                        <Button variant="light" radius="full">
                            Hủy
                        </Button>
                        <Button
                            color="primary"
                            radius="full"
                            isDisabled={selectedDates.length === 0}
                        >
                            <span className="font-medium">Lưu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
