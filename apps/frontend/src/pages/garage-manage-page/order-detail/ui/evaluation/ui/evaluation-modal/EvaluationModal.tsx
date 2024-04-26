import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
} from "@nextui-org/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { DatePopup } from "..";
import ImagePreview from "./ImagePreview";
import { FileInput, Stepper } from "@/core/ui";
import { OrderDetailType, ServiceOrderType } from "@/api/order/getOrderById";
import { EvaluationContext } from "@/pages/garage-manage-page/contexts/EvaluationContext";
import { formatCurrency } from "@/utils";

export type DateRangeType = {
    from?: number | null;
    to?: number | null;
};

export const ServiceInput = ({
    serviceState,
    service,
    setServicePrice,
}: {
    serviceState?: number;
    service: ServiceOrderType;
    setServicePrice: (price: number) => void;
}) => {
    const [servicePrice, setPrice] = useState<number>(serviceState || 0);
    const [isValid, setIsValid] = useState<boolean>(true);
    useEffect(() => {
        if (servicePrice < 0) {
            setPrice(0);
            setServicePrice(0);
        }
        if (
            servicePrice > Number(service?.highestPrice) ||
            (servicePrice < Number(service?.lowestPrice) && servicePrice !== 0)
        ) {
            setIsValid(false);
            return;
        }
        setIsValid(true);
    }, [servicePrice]);

    return (
        <div className="flex justify-between">
            <div>
                <p className="text-lg">{service.category.name} </p>
                <p className="font-medium">
                    ( min: {formatCurrency(service.lowestPrice as number)} -
                    max: {formatCurrency(service.highestPrice as number)})
                </p>
                {!isValid && (
                    <p className="text-red-600">
                        Xin vui lòng nhập đúng số giá
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Stepper
                    value={servicePrice}
                    onChange={(e) => {
                        setPrice(Number(e));
                        setServicePrice(Number(e));
                    }}
                    step={10000}
                    allowKeyboard={true}
                />
            </div>
        </div>
    );
};

function EvaluationModal({
    handOverTime,
    services,
}: {
    handOverTime?: number;
    services?: OrderDetailType["services"];
}) {
    const { evaluation, setEvaluationValue } = useContext(EvaluationContext);
    const [localOrderTime, setLocalOrderTime] = useState<DateRangeType>(
        evaluation?.estimateDuration
            ? {
                  from: evaluation?.estimateDuration[0],
                  to: evaluation?.estimateDuration[1],
              }
            : {
                  from: null,
                  to: null,
              },
    );
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>(
        evaluation?.evaluationImages || [],
    );

    useEffect(() => {
        setEvaluationValue("evaluationImages", images);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

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
                {services?.map((service, index) => (
                    <ServiceInput
                        key={index}
                        service={service}
                        serviceState={
                            evaluation?.services?.filter(
                                (e) => e.serviceId === service._id,
                            )[0]?.price
                        }
                        setServicePrice={(price: number) => {
                            setEvaluationValue(
                                "services",
                                evaluation?.services
                                    ? [
                                          ...evaluation["services"].filter(
                                              (e) =>
                                                  e.serviceId !== service._id,
                                          ),
                                          {
                                              serviceId: String(service._id),
                                              price: price,
                                          },
                                      ]
                                    : [
                                          {
                                              serviceId: String(service._id),
                                              price: price,
                                          },
                                      ],
                            );
                        }}
                    />
                ))}
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
                    {localOrderTime.from && localOrderTime.to ? (
                        <p>
                            {moment(localOrderTime?.from).format("YYYY/MM/DD")}{" "}
                            - {moment(localOrderTime?.to).format("YYYY/MM/DD")}
                        </p>
                    ) : (
                        <p>Chọn ngày ước tính </p>
                    )}
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
                                Chỉnh sửa
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
                    defaultValue={evaluation?.description}
                    onValueChange={(value) =>
                        setEvaluationValue("description", value)
                    }
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
