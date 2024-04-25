import { DateRange } from "@/core/types";
import { DatePicker } from "@/core/ui";
import { Button, Input } from "@nextui-org/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { DateRangeType } from "../evaluation-modal/EvaluationModal";
import { EvaluationContext } from "@/pages/garage-manage-page/contexts/EvaluationContext";
import { DisabledDate } from "@/core/ui/calendar/Calendar";

function DatePopup({
    closeModal,
    setDate,
    pickDate,
    disabledDates
}: {
    closeModal: () => void;
    setDate: (date: DateRangeType) => void;
    pickDate: DateRangeType;
    disabledDates: DisabledDate[]
}) {
    const { evaluation, setEvaluationValue } = useContext(EvaluationContext);

    // TODO: testing purpose only
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
        evaluation?.estimateDuration
            ? {
                  from: moment(
                      Number(pickDate.from) || new Date().getTime(),
                  ).toDate(),
                  to: moment(
                      Number(pickDate.to) || new Date().getTime(),
                  ).toDate(),
              }
            : {},
    );
    useEffect(() => {
        setEvaluationValue("estimateDuration", [
            Number(pickDate?.from) || null,
            Number(pickDate?.to) || null,
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRange, pickDate]);

    return (
        <div className="w-full p-4">
            <div className="flex justify-between">
                <div className="">
                    <p className="shrink-0 text-lg font-bold">Chọn ngày đặt</p>
                    <span className="text-small text-default-400 font-normal">
                        Vui lòng chọn ngày đặt sửa xe
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
                        setDate({
                            from: date?.from?.getTime(),
                            to: date?.to?.getTime(),
                        });
                    }}
                    defaultYear={2024}
                    defaultMonth={new Date().getMonth()}
                    selectedDate={dateRange}
                    show="double"
                    disabledDates={disabledDates}
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
