import { useMemo, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { DatePicker } from "@/core/ui";
import { useOrderContext } from "../../hooks";
import moment from "moment";

export default function DateInput() {
    const [isDatePickerModalOpen, setDatePickerModalOpen] =
        useState<boolean>(false);
    const {
        order: { orderTime },
        setOrderValue,
    } = useOrderContext();
    const [localOrderTime, setLocalOrderTime] = useState<number | undefined>(
        orderTime,
    );
    const selectedDate = useMemo(() => {
        return localOrderTime ? new Date(localOrderTime) : undefined;
    }, [localOrderTime]);
    const isOrderTimeInvalid = useMemo(() => {
        if (!orderTime) return false;

        // TODO: need to set start of this date
        return new Date(orderTime).getDate() > new Date().getDate();
    }, [orderTime]);

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-default-600 after:content-['*'] after:text-danger after:ml-0.5">
                        Date
                    </p>
                    <p className="">{new Date(orderTime!)?.toDateString()}</p>
                </div>
                <button
                    className="text-medium underline font-medium"
                    onClick={() => setDatePickerModalOpen(true)}
                >
                    Edit
                </button>
            </div>
            <Modal
                isOpen={isDatePickerModalOpen}
                onOpenChange={() => setDatePickerModalOpen(false)}
                hideCloseButton
            >
                <ModalContent>
                    <ModalHeader className="justify-between">
                        <div className="">
                            <p className="shrink-0">Chọn ngày đặt</p>
                            <span className="text-small text-default-400 font-normal">
                                Vui lòng chọn ngày đặt sửa xe
                            </span>
                        </div>
                        <Input
                            label="Order Date"
                            placeholder="YYYY/MM/dd"
                            variant="bordered"
                            value={moment(localOrderTime).format("YYYY/MM/DD")}
                            classNames={{
                                base: "max-w-44",
                                inputWrapper:
                                    "border data-[focus=true]:border-2",
                            }}
                            isInvalid={isOrderTimeInvalid}
                            onValueChange={(value) => {
                                const orderDate = moment(value, "YYYY MM DD");
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
                    </ModalHeader>
                    <ModalBody>
                        <DatePicker
                            mode="single"
                            onSelectedChange={(date) => {
                                setLocalOrderTime(date?.getTime());
                            }}
                            selectedDate={selectedDate}
                            defaultYear={2024}
                            defaultMonth={new Date().getMonth()}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex gap-2">
                            <Button
                                variant="light"
                                onPress={() => setDatePickerModalOpen(false)}
                            >
                                <p className="text-default-400">Hủy</p>
                            </Button>
                            <Button
                                className="bg-foreground"
                                onPress={() => {
                                    setOrderValue("orderTime", localOrderTime!);
                                    setDatePickerModalOpen(false);
                                }}
                                disabled={Boolean(!localOrderTime)}
                            >
                                <p className="text-background">Lưu</p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
