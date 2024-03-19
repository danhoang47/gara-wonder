import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";
import { DatePopup } from "..";
import ImagePreview from "./ImagePreview";
import { FileInput } from "@/core/ui";

type DateRangeType = {
    from?: number;
    to?: number;
};

function EvaluationModal() {
    const [localOrderTime, setLocalOrderTime] = useState<DateRangeType>();
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [repairPrice, setRepairPrice] = useState<number>(0);
    const [washPrice, setWashPrice] = useState<number>(0);
    const [images, setImages] = useState<File[]>();
    const setDate = (date: DateRangeType) => {
        setLocalOrderTime(date);
    };

    const onMultipleFileInputValueChange = (fs: File[]) => {
        if (!images) {
            setImages(fs);
            return;
        }

        setImages([
            ...images,
            ...fs.filter((file) => {
                return images.filter((imageFile) => {
                    return file !== imageFile;
                });
            }),
        ]);
    };

    const onImageRemove = (fileName: string) => {
        setImages(images?.filter(({ name }) => name !== fileName));
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">Dịch vụ</p>
                <div className="flex justify-between">
                    <p className="text-lg">Sửa chửa</p>
                    <input
                        type="number"
                        value={repairPrice}
                        onChange={(e) => setRepairPrice(Number(e.target.value))}
                        className="w-24 text-center text-lg bg-default font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Rửa xe</p>
                    <input
                        type="number"
                        value={washPrice}
                        onChange={(e) => setWashPrice(Number(e.target.value))}
                        className="w-24 text-center text-lg bg-default  font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Ngày lấy xe</p>
                    <p className="text-lg font-semibold">
                        Mon , 4 Feb 2024 -10:00
                    </p>
                </div>
            </div>

            <div className="w-full h-1 border-t-2" />
            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">
                    Ước tính thời gian hoàn thành
                </p>
                <div className="flex justify-between">
                    <p>
                        {moment(localOrderTime?.from).format("YYYY/MM/DD")} -{" "}
                        {moment(localOrderTime?.to).format("YYYY/MM/DD")}
                    </p>
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

            <div className="mb-2">
                <p className="text-xl font-semibold">Thêm ảnh</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {images?.map((file) => (
                    <ImagePreview
                        key={file.name}
                        file={file}
                        onImageRemove={onImageRemove}
                    />
                ))}
                <FileInput
                    selectionMode="multiple"
                    onValueChange={onMultipleFileInputValueChange}
                    showLabel={false}
                />
            </div>
        </div>
    );
}
export default EvaluationModal;
