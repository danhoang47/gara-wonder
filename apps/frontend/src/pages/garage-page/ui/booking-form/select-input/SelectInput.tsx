import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { DatePicker } from "@/core/ui";
import { useEffect, useMemo, useState } from "react";
import { useOrderContext } from "@/pages/garage-page/hooks";
import moment from "moment";

function SelectInput() {
    const [localOrderTime, setLocalOrderTime] = useState<number>();
    const [localInputTime, setLocalInputTime] = useState<string>();
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const {
        order: { orderTime },
        setOrderValue,
    } = useOrderContext();
    const isOrderTimeInvalid = useMemo(() => {
        if (!orderTime) return false;

        // TODO: need to set start of this date
        return new Date(orderTime).getDate() > new Date().getDate();
    }, [orderTime]);
    useEffect(() => {
        setLocalInputTime(
            moment(localOrderTime).format("YYYY/MM/DD").toString(),
        );
    }, [localOrderTime]);

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
                        <Input
                            label="Ngày đặt"
                            placeholder="YYYY/MM/dd"
                            variant="bordered"
                            value={localInputTime}
                            classNames={{
                                base: "max-w-44",
                                inputWrapper:
                                    "border data-[focus=true]:border-2",
                            }}
                            isInvalid={isOrderTimeInvalid}
                            onValueChange={(value) => {
                                const orderDate = moment(value, "YYYY MM DD");
                                setLocalInputTime(value);
                                if (
                                    value.length === 10 &&
                                    orderDate.isValid()
                                ) {
                                    setLocalOrderTime(
                                        orderDate.toDate().getTime(),
                                    );
                                }
                            }}
                            isClearable
                        />
                    </div>
                    <div className="pt-5">
                        <DatePicker
                            mode="single"
                            onSelectedChange={(date) => {
                                setLocalOrderTime(date?.getTime());
                            }}
                            defaultYear={2024}
                            defaultMonth={new Date().getMonth()}
                            selectedDate={
                                localOrderTime
                                    ? new Date(localOrderTime)
                                    : undefined
                            }
                            show="single"
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
                        >
                            <p className="text-background">Lưu</p>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SelectInput;
