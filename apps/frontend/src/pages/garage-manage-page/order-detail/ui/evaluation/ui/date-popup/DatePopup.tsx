import { DateRange } from "@/core/types";
import { DatePicker } from "@/core/ui";
import { Button, Input } from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";

function DatePopup({
    closeModal,
    setDate,
    pickDate,
}: {
    closeModal: () => void;
    setDate: (date: { from?: number; to?: number }) => void;
    pickDate?: { from?: number; to?: number };
}) {
    // TODO: testing purpose only
    const [dateRange, setDateRange] = useState<DateRange>();

    return (
        <div className="w-full p-4">
            <div className="flex justify-between">
                <div className="">
                    <p className="shrink-0 text-lg font-bold">Pick Date</p>
                    <span className="text-small text-default-400 font-normal">
                        Select a date to fix your car
                    </span>
                </div>
                <div className="flex gap-2">
                    <Input
                        label="Order From"
                        placeholder="YYYY/MM/dd"
                        variant="bordered"
                        value={moment(pickDate?.from).format("YYYY/MM/DD")}
                        classNames={{
                            base: "max-w-44",
                            inputWrapper: "border data-[focus=true]:border-2",
                        }}
                        // isInvalid={isOrderTimeInvalid}
                        onValueChange={(value) => {
                            const orderDate = moment(value, "YYYY MM DD");
                            if (value.length === 10 && orderDate.isValid()) {
                                setDate({
                                    ...pickDate,
                                    from: orderDate.toDate().getTime(),
                                });
                            }
                        }}
                        isClearable
                    />
                    <Input
                        label="Order To"
                        placeholder="YYYY/MM/dd"
                        variant="bordered"
                        value={moment(pickDate?.to).format("YYYY/MM/DD")}
                        classNames={{
                            base: "max-w-44",
                            inputWrapper: "border data-[focus=true]:border-2",
                        }}
                        // isInvalid={isOrderTimeInvalid}
                        onValueChange={(value) => {
                            const orderDate = moment(value, "YYYY MM DD");
                            if (value.length === 10 && orderDate.isValid()) {
                                setDate({
                                    ...pickDate,
                                    to: orderDate.toDate().getTime(),
                                });
                            }
                        }}
                        isClearable
                    />
                </div>
            </div>
            <div className="pt-5">
                <DatePicker
                    mode="range"
                    onSelectedChange={(date) => {
                        setDateRange(date);
                    }}
                    defaultYear={2024}
                    defaultMonth={new Date().getMonth()}
                    selectedDate={dateRange}
                    show="double"
                />
            </div>
            <div className="flex gap-2 py-2 justify-end px-4">
                <Button variant="light" onPress={closeModal}>
                    <p className="text-default-400">Xóa</p>
                </Button>
                <Button
                    className="bg-foreground"
                    onPress={() => {
                        //TODO add Save function
                        closeModal();
                    }}
                >
                    <p className="text-background">Lưu</p>
                </Button>
            </div>
        </div>
    );
}

export default DatePopup;
