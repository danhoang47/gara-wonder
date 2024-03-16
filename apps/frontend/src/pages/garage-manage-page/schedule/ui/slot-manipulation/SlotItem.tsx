import { Stepper } from "@/core/ui";
import { Switch } from "@nextui-org/react";

export type SlotItemProps = {};

function SlotItem() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <p>Số chỗ</p>
                <Stepper value={8} />
            </div>
            <div className="flex justify-between items-center">
                <p>Trạng thái</p>
                <Switch
                    isSelected={true}
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
