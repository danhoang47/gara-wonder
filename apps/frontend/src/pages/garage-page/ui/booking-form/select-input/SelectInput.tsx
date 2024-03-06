import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { DatePicker } from "@/core/ui";
import { useState } from "react";
import { useOrderContext } from "@/pages/garage-page/hooks";


function SelectInput() {
    const { setOrderValue } = useOrderContext();
    const [localOrderTime, setLocalOrderTime] = useState<number>();
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);

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
                    <p className="text-sm text-primary">Date</p>
                    <p className="text-sm">
                        {localOrderTime
                            ? new Date(localOrderTime).toDateString()
                            : "Select your date"}
                    </p>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-[400px] pt-2">
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
                    />
                    <div className="flex gap-2 py-2 justify-end px-4">
                        <Button
                            variant="light"
                            onPress={() => {
                                setDatePickerOpen(false);
                            }}
                        >
                            <p className="text-default-400">Clear</p>
                        </Button>
                        <Button
                            className="bg-foreground"
                            onPress={() => {
                                setOrderValue("orderTime", localOrderTime);
                                setDatePickerOpen(false);
                            }}
                        >
                            <p className="text-background">Save</p>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SelectInput;
