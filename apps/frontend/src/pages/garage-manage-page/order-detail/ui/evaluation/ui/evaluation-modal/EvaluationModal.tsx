import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";
import { DatePopup } from "..";

function EvaluationModal({ closeModal }: { closeModal: () => void }) {
    const [localOrderTime, setLocalOrderTime] = useState<number>();
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    const setDate = (date: number) => {
        setLocalOrderTime(date);
    };

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
                            <DatePopup
                                closeModal={() => {
                                    setDatePickerOpen(false);
                                }}
                                pickDate={localOrderTime}
                                setDate={setDate}
                            />
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
