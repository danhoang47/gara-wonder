// import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip } from "@nextui-org/react";
import { Evaluation, UserInfo } from "./ui";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { getOrderById } from "@/api";
import { useContext, useEffect } from "react";
import { LoadingContext } from "@/core/contexts/loading";
import moment from "moment";
import "moment/locale/vi";
import EvaluationContextProvider from "../contexts/EvaluationContext";
import { mutate } from "swr";
import { formatCurrency } from "@/utils";
import { useAppSelector } from "@/core/hooks";
moment.locale("vi");

function OrderDetail() {
    const { orderId, garageId } = useParams();
    const user = useAppSelector((state) => state.user);
    const { load, unload } = useContext(LoadingContext);

    const { isLoading: isOrderLoading, data: order } = useSWRImmutable(
        user.token ? `${garageId}/management/orders/${orderId}` : null,
        getOrderById,
    );
    const refetch = () => {
        mutate(`${garageId}/management/orders/${orderId}`);
    };
    useEffect(() => {
        if (!isOrderLoading) unload("order-detail");
        else load("order-detail");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOrderLoading]);

    if (!isOrderLoading)
        return (
            <EvaluationContextProvider>
                <div className="p-10 h-full overflow-auto ">
                    <div className="flex gap-2 items-center">
                        <p className="text-3xl font-bold">Chi tiết đơn hàng</p>
                        {(order?.status as number) <= -2 && (
                            <Chip color="danger" radius="sm" size="lg">
                                <p className="font-medium">Đã hủy</p>
                            </Chip>
                        )}
                    </div>

                    <div className="md:grid grid-cols-12 gap-4 pt-10">
                        <div className="col-span-9 flex flex-col gap-5">
                            {/* Evaluation */}
                            <Evaluation
                                status={order?.status}
                                evaluationProvided={Boolean(
                                    order?.evaluationId,
                                )}
                                handOverTime={order?.handOverTime}
                                services={order?.services}
                                refetch={refetch}
                            />
                            {/* User Information */}
                            <UserInfo user={order?.user} />
                            {/* Service Information */}
                            <div className="px-5 py-5 border-2 rounded-lg flex flex-col gap-3">
                                <p className="text-xl font-bold">
                                    Thông tin dịch vụ
                                </p>
                                <div className="w-full h-1 border-t-2" />
                                {order?.services.map((service, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-stretch">
                                            <div className="flex flex-col justify-between">
                                                <p className="uppercase text-lg text-primary font-semibold">
                                                    {service.category.name}
                                                </p>

                                                <p className="font-semibold">
                                                    Giá:{" "}
                                                    <span>
                                                        {formatCurrency(
                                                            service.lowestPrice as number,
                                                        )}
                                                        -{" "}
                                                        {formatCurrency(
                                                            service.highestPrice as number,
                                                        )}
                                                    </span>
                                                </p>
                                                <p className="font-semibold">
                                                    Thông tin:{" "}
                                                    <span>
                                                        {
                                                            service.category
                                                                .description
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full h-1 border-t-2" />
                                    </div>
                                ))}
                                <div className="flex gap-10 ">
                                    <div>
                                        <img
                                            src="data:image/jpeg;base64,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"
                                            alt=""
                                            className="w-[30rem] rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <p className="uppercase text-lg text-primary font-semibold">
                                            {order?.car.brand.name}{" "}
                                            {order?.car.model}
                                        </p>
                                        <p className="text-default-500">
                                            {order?.car.releaseYear}
                                        </p>
                                        <p className="font-semibold">
                                            {order?.car.plateNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full col-span-3 flex flex-col gap-4">
                            {/* Report button */}
                            <div className="p-5 border-2 rounded-lg ">
                                <p className="text-sm font-bold">
                                    If you have any issues with the correct
                                    booking, you can report it to the admin here
                                </p>
                                <Button
                                    className="mt-5 w-full"
                                    color="primary"
                                    size="lg"
                                    disableAnimation
                                    startContent={
                                        <FontAwesomeIcon
                                            icon={faFlag}
                                            size="lg"
                                        />
                                    }
                                >
                                    Report
                                </Button>
                            </div>
                            {/* Summary */}
                            <div className="px-5 py-10 border-2 rounded-lg flex flex-col gap-4">
                                <p className="text-xl font-bold">Tổng quát</p>
                                <div className="w-full h-1 border-t-2" />
                                <div className="flex justify-between">
                                    <p className="text-sm text-default-400">
                                        Ngày lấy xe
                                    </p>
                                    <p className="text-sm font-bold">
                                        {moment(order?.handOverTime).format(
                                            "dddd, L",
                                        )}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-default-400">
                                        Ngày trả xe
                                    </p>
                                    <p className="text-sm font-bold">
                                        {moment(
                                            order?.estimateHandOffTime,
                                        ).format("dddd, L")}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-default-400">
                                        Tổng số lượng xe
                                    </p>
                                    <p className="text-sm font-bold">1</p>
                                </div>
                                <div className="w-full h-1 border-t-2" />
                                <p className="text-lg font-bold">
                                    Giá chi tiết
                                </p>

                                <div className="flex justify-between">
                                    <p className="text-sm text-default-400">
                                        Giá dịch vụ
                                    </p>
                                    <p className="text-sm font-bold">USD 80</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-default-400">
                                        Thời gian kéo dài
                                    </p>
                                    <p className="text-sm font-bold">1 ngày</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-default-400">
                                        Thuế
                                    </p>
                                    <p className="text-sm font-bold">USD 0</p>
                                </div>
                                <div className="w-full h-1 border-t-2" />
                                <div className="flex justify-between">
                                    <p className="font-bold text-xl">
                                        Tổng cộng
                                    </p>
                                    <p className="font-bold text-lg">
                                        {order?.totalPrice}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </EvaluationContextProvider>
        );
}
export default OrderDetail;
