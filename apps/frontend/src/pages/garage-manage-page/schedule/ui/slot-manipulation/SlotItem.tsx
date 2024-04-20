import { Stepper } from "@/core/ui";
import { Switch } from "@nextui-org/react";

export type SlotItemProps = {
    extraFee: number;
    slotValue?: number;
    disabled?: boolean;
    changeSlotValue: (value: number) => void;
    changeFeeValue: (value: number) => void;
    changeDisabled: (value: boolean) => void;
};

function SlotItem({
    slotValue,
    extraFee,
    disabled,
    changeSlotValue,
    changeFeeValue,
    changeDisabled,
}: SlotItemProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <p>Số chỗ</p>
                <Stepper
                    value={slotValue}
                    min={0}
                    onChange={(value: number) => changeSlotValue(value)}
                />
            </div>
            <div className="flex justify-between items-center">
                <p>Phụ phí (%)</p>
                <Stepper
                    value={extraFee}
                    min={0}
                    onChange={(value: number) => changeFeeValue(value)}
                />
            </div>
            <div className="flex justify-between items-center">
                <p>Trạng thái</p>
                <Switch
                    isSelected={!disabled}
                    onValueChange={() => changeDisabled(!disabled as boolean)}
                    size="sm"
                    classNames={{
                        wrapper: "mr-0",
                    }}
                />
            </div>
        </div>
    );
}

export default SlotItem;
