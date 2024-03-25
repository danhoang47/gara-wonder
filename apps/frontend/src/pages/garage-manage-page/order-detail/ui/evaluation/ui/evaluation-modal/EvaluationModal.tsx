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
import ImagePreview from "./ImagePreview";
import { FileInput } from "@/core/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export type DateRangeType = {
    from?: number;
    to?: number;
};

function EvaluationModal({ handOverTime }: { handOverTime?: number }) {
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
                    <div className="flex items-center gap-2">
                        <div
                            className="border-3 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-default-400 border-default-400 transition-colors hover:text-default-700 hover:border-default-700"
                            onClick={() => {
                                if (repairPrice > 1000)
                                    setRepairPrice(Number(repairPrice) - 1000);
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                        <input
                            type="number"
                            value={repairPrice}
                            min="0"
                            max="1000"
                            onChange={(e) =>
                                setRepairPrice(Number(e.target.value))
                            }
                            className="w-24 text-center text-lg bg-default font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <div
                            className="border-3 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-default-400 border-default-400 transition-colors hover:text-default-700 hover:border-default-700"
                            onClick={() =>
                                setRepairPrice(Number(repairPrice) + 1000)
                            }
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Rửa xe</p>
                    <div className="flex items-center gap-2">
                        <div
                            className="border-3 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-default-400 border-default-400 transition-colors hover:text-default-700 hover:border-default-700"
                            onClick={() => {
                                if (washPrice > 1000)
                                    setWashPrice(Number(washPrice) - 1000);
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                        <input
                            type="number"
                            value={washPrice}
                            min="0"
                            max="10"
                            onChange={(e) =>
                                setWashPrice(Number(e.target.value))
                            }
                            className="w-24 text-center text-lg bg-default  font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <div
                            className="border-3 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer text-default-400 border-default-400 transition-colors hover:text-default-700 hover:border-default-700"
                            onClick={() =>
                                setWashPrice(Number(washPrice) + 1000)
                            }
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="text-lg">Ngày lấy xe</p>
                    <p className="text-lg font-semibold">
                        {moment(handOverTime).format("LLLL")}
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
                        placement="bottom-end"
                        triggerScaleOnOpen={false}
                        offset={-2}
                        triggerType="grid"
                        isOpen={isDatePickerOpen}
                        onClose={() => setDatePickerOpen(false)}
                        classNames={{
                            base: "max-w-full w-[800px]",
                        }}
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
                                pickDate={localOrderTime as DateRangeType}
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
