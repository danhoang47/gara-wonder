import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useMemo, useState } from "react";
import SlotItem from "./SlotItem";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export type SlotManipulationProps = {
    selectedDates: Date[];
    onRemoveDate: (date: Date) => void;
};

function SlotManipulation({
    selectedDates,
    onRemoveDate,
}: SlotManipulationProps) {
    const disabledSaveButton = useMemo(
        () => selectedDates.length === 0,
        [selectedDates],
    );
    const [modifiedSlots, setModifiedSlot] = useState<string[]>([]);

    return (
        <div className="w-1/4 min-w-80 h-full flex flex-col relative border-l">
            <div className="px-4 py-6">
                <p className="font-semibold text-xl">Chỉnh sửa trạng thái</p>
                <span className="text-small text-default-500">
                    Chọn ngày mà bạn muốn chỉnh sửa
                </span>
            </div>
            <div className="grow overflow-auto px-2 pb-2">
                <Accordion
                    showDivider
                    itemClasses={{
                        trigger: "gap-2",
                    }}
                    className="px-0"
                >
                    {selectedDates.map((selectedDate) => (
                        <AccordionItem
                            title={
                                <div className="flex justify-between items-center">
                                    <p className="text-base font-semibold">
                                        {moment(selectedDate).format(
                                            "DD/MM/YYYY",
                                        )}
                                    </p>
                                    <Button
                                        isIconOnly
                                        className="min-w-fit w-fit h-auto p-0 bg-background"
                                        disableAnimation
                                        onPress={() =>
                                            onRemoveDate(selectedDate)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className="text-default-400"
                                        />
                                    </Button>
                                </div>
                            }
                        >
                            <SlotItem />
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="sticky bottom-0">
                <div className="flex justify-end p-4 gap-2">
                    <Button variant="light" radius="full">
                        Hủy
                    </Button>
                    <Button
                        color="primary"
                        radius="full"
                        isDisabled={disabledSaveButton}
                    >
                        <span className="font-medium">Lưu</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SlotManipulation;
