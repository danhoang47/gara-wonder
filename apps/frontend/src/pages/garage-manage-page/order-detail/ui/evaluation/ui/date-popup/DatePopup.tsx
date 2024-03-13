import { DatePicker } from "@/core/ui";
import { Button, Input } from "@nextui-org/react";
import moment from "moment";

function DatePopup({
    closeModal,
    setDate,
    pickDate,
}: {
    closeModal: () => void;
    setDate: (date?: number) => void;
    pickDate?: number;
}) {
    return (
        <div className="w-[400px] p-4">
            <div className="flex justify-between">
                <div className="">
                    <p className="shrink-0 text-lg font-bold">Pick Date</p>
                    <span className="text-small text-default-400 font-normal">
                        Select a date to fix your car
                    </span>
                </div>
                <Input
                    label="Order Date"
                    placeholder="YYYY/MM/dd"
                    variant="bordered"
                    value={moment(pickDate).format("YYYY/MM/DD")}
                    classNames={{
                        base: "max-w-44",
                        inputWrapper: "border data-[focus=true]:border-2",
                    }}
                    // isInvalid={isOrderTimeInvalid}
                    onValueChange={(value) => {
                        const orderDate = moment(value, "YYYY MM DD");
                        if (value.length === 10 && orderDate.isValid()) {
                            setDate(orderDate.toDate().getTime());
                        }
                    }}
                    isClearable
                />
            </div>
            <div className="pt-5">
                <DatePicker
                    mode="single"
                    onSelectedChange={(date) => {
                        setDate(date?.getTime());
                    }}
                    defaultYear={2024}
                    defaultMonth={new Date().getMonth()}
                    selectedDate={pickDate ? new Date(pickDate) : undefined}
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
