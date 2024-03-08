import { DatePicker } from "@/core/ui";
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";

function EvaluationModal({ closeModal }: { closeModal: () => void }) {
    const [localOrderTime, setLocalOrderTime] = useState<number>();
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col   gap-4 p-5">
            <p className="text-center text-2xl font-bold">Đánh giá</p>
            <div className="w-full h-1 border-t-2" />
            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">Dịch vụ</p>
                <div className="flex justify-between">
                    <p className="text-lg">Sửa chửa</p>
                    <input
                        type="text"
                        value={"30"}
                        className="w-10 text-center text-lg outline-none"
                    />
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Rửa xe</p>
                    <input
                        type="text"
                        value={"30"}
                        className="w-10 text-center text-lg outline-none"
                    />
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Ngày lấy xe</p>
                    <p className="text-lg">Mon , 4 Feb 2024 -10:00</p>
                </div>
            </div>

            <div className="w-full h-1 border-t-2" />
            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">
                    Ước tính thời gian hoàn thành
                </p>
                <div className="flex justify-between">
                    <p>{moment(localOrderTime).format("YYYY/MM/DD")}</p>
                    <Popover
                        placement="left"
                        triggerScaleOnOpen={false}
                        offset={-2}
                        triggerType="grid"
                        isOpen={isDatePickerOpen}
                        onClose={() => setDatePickerOpen(false)}
                    >
                        <PopoverTrigger onClick={() => setDatePickerOpen(true)}>
                            <p className="cursor-pointer font-bold text-md underline">
                                Edit
                            </p>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="w-[400px] p-4">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className="shrink-0 text-lg font-bold">
                                            Pick Date
                                        </p>
                                        <span className="text-small text-default-400 font-normal">
                                            Select a date to fix your car
                                        </span>
                                    </div>
                                    <Input
                                        label="Order Date"
                                        placeholder="YYYY/MM/dd"
                                        variant="bordered"
                                        value={moment(localOrderTime).format(
                                            "YYYY/MM/DD",
                                        )}
                                        classNames={{
                                            base: "max-w-44",
                                            inputWrapper:
                                                "border data-[focus=true]:border-2",
                                        }}
                                        // isInvalid={isOrderTimeInvalid}
                                        onValueChange={(value) => {
                                            const orderDate = moment(
                                                value,
                                                "YYYY MM DD",
                                            );
                                            if (
                                                value.length === 10 &&
                                                orderDate.isValid()
                                            ) {
                                                setLocalOrderTime(
                                                    orderDate
                                                        .toDate()
                                                        .getTime(),
                                                );
                                            }
                                        }}
                                        isClearable
                                    />
                                </div>
                                <div className="pt-5">
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
                                </div>
                                <div className="flex gap-2 py-2 justify-end px-4">
                                    <Button
                                        variant="light"
                                        onPress={() => {
                                            setDatePickerOpen(false);
                                        }}
                                    >
                                        <p className="text-default-400">Xóa</p>
                                    </Button>
                                    <Button
                                        className="bg-foreground"
                                        onPress={() => {
                                            //TODO add Save function
                                            setDatePickerOpen(false);
                                        }}
                                    >
                                        <p className="text-background">Lưu</p>
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="w-full h-1 border-t-2" />

            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">Miêu tả tổng quát</p>
                <Textarea
                    variant="bordered"
                    placeholder="Nhập "
                    className="w-full"
                    maxRows={10}
                    minRows={6}
                    size="lg"
                />
            </div>
            <div className="w-full h-1 border-t-2" />
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <p>Tổng cộng:</p>
                    <p className="font-bold text-black text-2xl">USD 280</p>
                </div>
                <div className="flex gap-2 py-2 justify-end px-4">
                    <Button variant="light" onClick={() => closeModal()}>
                        <p className="text-black">Đóng</p>
                    </Button>
                    <Button color="primary">
                        <p className="text-background">Gửi tới khách hàng</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default EvaluationModal;
