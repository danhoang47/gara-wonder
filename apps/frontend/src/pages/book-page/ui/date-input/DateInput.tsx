import { useMemo, useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

import { DatePicker } from "@/core/ui";
import { useOrderContext } from "../../hooks";

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
            >
                <ModalContent>
                    <ModalHeader className="flex-col">
                        <p>Pick Date</p>
                        <span className="text-sm text-default-400 font-normal">
                            Select a date to fix your car
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        <DatePicker
                            mode="single"
                            onSelectedChange={(date) => {
                                setLocalOrderTime(date?.getTime());
                            }}
                            selectedDate={selectedDate}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <Button
                                className="bg-foreground"
                                onPress={() =>{
                                    setOrderValue("orderTime", localOrderTime)
                                    setDatePickerModalOpen(false)
                                }}
                            >
                                <p className="text-background">Save</p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
