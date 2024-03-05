import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { DatePicker } from "@/core/ui";
import { useState } from "react";
import { useOrderContext } from "@/pages/garage-page/hooks";
import clsx from "clsx";

type InputProps = {
    type: string;
    value?: string;
    placeholder: string;
    title: string;
    canEdit?: boolean;
    onClick: () => void;
};
function SelectInput({ placeholder, title }: InputProps) {
    const { setOrderValue } = useOrderContext();
    const [localOrderTime, setLocalOrderTime] = useState<number | undefined>();
    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    return (
        <div className="relative">
            <Input
                isReadOnly
                label={title}
                placeholder={placeholder}
                className=""
                variant="bordered"
                color="primary"
                value={
                    String(new Date(localOrderTime as number).toDateString()) ||
                    ""
                }
                onClick={() => setPickerOpen(!pickerOpen)}
                classNames={{
                    label: "text-primary cursor-pointer",
                    input: "select-none cursor-pointer",
                    innerWrapper: "cursor-pointer select-none",
                    inputWrapper: clsx(
                        "hover:border-inherit",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        pickerOpen
                            ? "rounded-b-none border-b-0 border-default-600"
                            : "",
                    ),
                }}
            />
            <div
                className={clsx(
                    "absolute w-full bg-background z-50 border-2 border-t-0 rounded-b-lg  border-default-600 p-5",
                    pickerOpen ? "block" : "hidden",
                )}
            >
                <DatePicker
                    mode="single"
                    onSelectedChange={(date) => {
                        setLocalOrderTime(date?.getTime());
                    }}
                    defaultYear={2024}
                    selectedDate={new Date(localOrderTime)}
                    defaultMonth={0}
                />
                <div className="flex gap-2 py-4 justify-end px-4">
                    <Button
                        variant="light"
                        onPress={() => setLocalOrderTime(0)}
                    >
                        <p className="text-default-400">Clear</p>
                    </Button>
                    <Button
                        className="bg-foreground"
                        onPress={() => {
                            setOrderValue("orderTime", localOrderTime);
                            setPickerOpen(false);
                        }}
                    >
                        <p className="text-background">Save</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SelectInput;
