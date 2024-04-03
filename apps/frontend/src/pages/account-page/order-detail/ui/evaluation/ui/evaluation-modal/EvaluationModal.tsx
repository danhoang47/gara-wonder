import moment from "moment";
import { OrderDetailType, ServiceOrderType } from "@/api/order/getOrderById";
import { Evaluation, Image } from "@/core/types";

export type DateRangeType = {
    from?: number | null;
    to?: number | null;
};

const ServiceInput = ({
    servicePrice,
    service,
}: {
    servicePrice?: number;
    service: ServiceOrderType;
}) => {
    return (
        <div className="flex justify-between">
            <p className="text-lg">{service.category.name}</p>
            <div className="flex items-center gap-2">
                <p>{servicePrice}</p>
            </div>
        </div>
    );
};

function EvaluationModal({
    handOverTime,
    services,
    description,
    images,
    estimateTime,
}: {
    handOverTime?: number;
    services?: OrderDetailType["services"];
    description?: string;
    images?: Image[];
    estimateTime?: Evaluation["estimateDuration"];
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">Dịch vụ</p>
                {/* {services?.map((service, index) => (
                    <ServiceInput
                        key={index}
                        service={service}
                        servicePrice={
                            evaluation?.services?.filter(
                                (e) => e.serviceId === service._id,
                            )[0].price
                        }
                    />
                ))} */}
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
                {estimateTime && (
                    <div className="flex justify-between">
                        {estimateTime[0] == null ? (
                            <p>
                                {moment(estimateTime[1] || 0).format(
                                    "YYYY/MM/DD",
                                )}
                            </p>
                        ) : (
                            <p>
                                {moment(estimateTime[0]).format("YYYY/MM/DD")} -{" "}
                                {moment(estimateTime[1] || 0).format(
                                    "YYYY/MM/DD",
                                )}
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full h-1 border-t-2" />
            <div className="flex flex-col gap-3">
                <p className=" text-xl font-semibold">Miêu tả tổng quát</p>
                <p>{description}</p>
            </div>
            <div className="w-full h-1 border-t-2" />

            <div className="mb-2">
                <p className="text-xl font-semibold">Ảnh</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {images?.map((file, index) => (
                    <div className="relative" key={index}>
                        <img
                            src={file.url}
                            className="aspect-video object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default EvaluationModal;
