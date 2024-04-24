import { useEffect, useMemo, useState } from "react";
import {
    Button,
    DateInput as DateInputField,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import moment from "moment";
import { CalendarDate } from "@internationalized/date";

import { DatePicker } from "@/core/ui";
import { useOrderContext } from "@/pages/garage-page/hooks";
import { DisabledDate, checkIfDateDisabled } from "@/core/ui/calendar/Calendar";

export type DateInputProps = {
    disabledDates?: DisabledDate[];
};

function DateInput({ disabledDates = [] }: DateInputProps) {
    const [localOrderTime, setLocalOrderTime] = useState<number>();
    const inputDate = useMemo(() => {
        if (!localOrderTime) return undefined;
        const date = moment(localOrderTime);

        return new CalendarDate(date.year(), date.month() + 1, date.date());
    }, [localOrderTime]);
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const {
        order: { orderTime },
        setOrderValue,
    } = useOrderContext();

    useEffect(() => {
        if (orderTime) {
            setLocalOrderTime(orderTime)
        }
    }, [])

    return (
        <Popover
            placement="bottom-end"
            triggerScaleOnOpen={false}
            offset={-2}
            triggerType="grid"
            isOpen={isDatePickerOpen}
            onClose={() => setDatePickerOpen(false)}
        >
            <PopoverTrigger onClick={() => setDatePickerOpen(true)}>
                <div className="h-[56px] border-2 rounded-xl hover:border-default-400 transition-colors px-3 py-2">
                    <p className="text-sm text-primary">Ngày đặt</p>
                    <p className="text-sm">
                        {localOrderTime
                            ? moment(localOrderTime).format("YYYY/MM/DD")
                            : "Chọn ngày đặt"}
                    </p>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-[400px] p-4">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="shrink-0 text-lg font-bold">
                                Chọn ngày
                            </p>
                            <span className="text-small text-default-400 font-normal">
                                Chọn ngày dịch vụ cho xe
                            </span>
                        </div>
                        <DateInputField
                            label="Ngày đặt"
                            variant="bordered"
                            value={inputDate}
                            classNames={{
                                base: "max-w-44",
                                inputWrapper:
                                    "border data-[focus=true]:border-2",
                            }}
                            onChange={(value) => {
                                if (!value) return;

                                const inputDate = moment(
                                    value.toDate("Asia/Ho_Chi_Minh"),
                                );

                                if (
                                    !checkIfDateDisabled(inputDate.toDate(), [
                                        { from: undefined, to: Date.now() },
                                        ...disabledDates,
                                    ]) &&
                                    inputDate.isValid()
                                ) {
                                    setLocalOrderTime(
                                        inputDate.toDate().getTime(),
                                    );
                                    setOrderValue(
                                        "orderTime",
                                        inputDate.toDate().getTime(),
                                    );
                                }
                            }}
                        />
                    </div>
                    <div className="pt-5">
                        <DatePicker
                            mode="single"
                            onSelectedChange={(date) => {
                                setLocalOrderTime(date?.getTime());
                                setOrderValue("orderTime", date?.getTime());
                            }}
                            defaultYear={2024}
                            defaultMonth={new Date().getMonth()}
                            selectedDate={
                                localOrderTime
                                    ? new Date(localOrderTime)
                                    : undefined
                            }
                            show="single"
                            disabledDates={disabledDates}
                        />
                    </div>
                    <div className="flex gap-2 py-2 justify-end px-4">
                        <Button
                            variant="light"
                            onPress={() => {
                                setDatePickerOpen(false);
                            }}
                        >
                            <p className="text-default-400">Hủy</p>
                        </Button>
                        <Button
                            className="bg-foreground"
                            onPress={() => {
                                setOrderValue("orderTime", localOrderTime);
                                setDatePickerOpen(false);
                            }}
                            isDisabled={!localOrderTime}
                        >
                            <p className="text-background">Lưu</p>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default DateInput;
