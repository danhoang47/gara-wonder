import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip } from "@nextui-org/react";
import { Evaluation, UserInfo } from "./ui";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import {
    createGarageReport,
    getBasicGarageInfo,
    getReportStatus,
    getUserOrderById,
} from "@/api";
import { useContext, useEffect, useMemo, useState } from "react";
import { LoadingContext } from "@/core/contexts/loading";
import moment from "moment";
import "moment/locale/vi";
import { useAppSelector } from "@/core/hooks";
import { mutate } from "swr";
import { formatCurrency } from "@/utils";
import { ReportModal } from "@/core/ui";
import { Report } from "@/core/types";
moment.locale("vi");

function OrderDetail() {
    const { orderId } = useParams();
    const token = useAppSelector((state) => state.user.token);
    const { load, unload } = useContext(LoadingContext);

    const { isLoading: isOrderLoading, data: order } = useSWRImmutable(
        token ? `${orderId}` : null,
        () => getUserOrderById(orderId, token),
    );
    const { data: garageData } = useSWRImmutable(
        order?.garageId ? "garage" : null,
        () => getBasicGarageInfo(order?.garageId as string),
    );
    const refetch = () => {
        mutate(`${orderId}`);
    };
    const user = useAppSelector((state) => state.user.value);
    const shouldHideReportButton = useMemo(() => {
        return !user || Boolean(user.garageId);
    }, [user]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isReported, setReported] = useState<boolean>(false);
    const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);

    const onReportModalSubmit = async (report: Partial<Report>) => {
        setLoading(true);
        await createGarageReport(report);
        setLoading(false);
        setReportModalOpen(false);
    };

    useEffect(() => {
        const checkReportStatus = async () => {
            if (user && order?.garageId) {
                const response = (await getReportStatus(
                    order?.garageId,
                )) as boolean;
                setReported(response);
            }
        };

        checkReportStatus();
    }, [user, order?.garageId]);

    useEffect(() => {
        if (isOrderLoading) load("order-detail");
        else unload("order-detail");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOrderLoading]);
    return (
        <div className="p-10 h-full overflow-auto">
            <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">Chi tiết đơn hàng</p>
                {(order?.status as number) <= -2 && (
                    <Chip color="danger" radius="sm" size="lg">
                        <p className="font-medium">Đã bị hủy</p>
                    </Chip>
                )}
                {(order?.status as number) === 4 && (
                    <Chip color="primary" radius="sm" size="lg">
                        <p className="font-medium">Đã hoàn thành</p>
                    </Chip>
                )}
                {Number(order?.status) == 5 && (
                    <Chip color="danger">
                        <p className="font-medium">Buộc hủy bởi hệ thống</p>
                    </Chip>
                )}
            </div>
            <div className="md:grid grid-cols-12 gap-4 pt-10">
                <div className="col-span-9 flex flex-col gap-5">
                    {/* Evaluation */}
                    <Evaluation
                        status={order?.status}
                        handOverTime={order?.orderTime}
                        refetch={refetch}
                        garageId={order?.garageId}
                        evaluationId={order?.evaluationId}
                        reviewId={!!order?.reviewId}
                    />
                    {/* User Information */}
                    <UserInfo garageId={order?.garageId} />
                    {/* Service Information */}
                    <div className="px-5 py-5 border-2 rounded-lg flex flex-col gap-3">
                        <p className="text-xl font-bold">Thông tin dịch vụ</p>
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
                                                {service.category.description}
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
                                    src={
                                        garageData?.data[0].backgroundImage.url
                                    }
                                    alt=""
                                    className="w-[30rem] rounded-xl"
                                />
                            </div>
                            <div>
                                <p className="uppercase text-lg text-primary font-semibold">
                                    {order?.car.brand.name} {order?.car.model}
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
                            Nếu bạn có vấn đề về quá trình sửa chữa xe của mình
                            tại garage, hãy báo cáo với chúng tôi
                        </p>
                        <Button
                            className="mt-5 w-full"
                            color="primary"
                            size="lg"
                            disableAnimation
                            startContent={
                                <FontAwesomeIcon icon={faFlag} size="lg" />
                            }
                            onPress={() => setReportModalOpen(true)}
                            isDisabled={shouldHideReportButton || isReported}
                        >
                            <span>Báo cáo</span>
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
                                {moment(order?.orderTime).format("dddd, L")}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Ngày trả xe
                            </p>
                            <p className="text-sm font-bold">
                                {moment(order?.estimateHandOffTime).format(
                                    "dddd, L",
                                )}
                            </p>
                        </div>

                        <div className="w-full h-1 border-t-2" />
                        <p className="text-lg font-bold">Giá chi tiết</p>

                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Giá dịch vụ
                            </p>
                            <p className="text-sm font-bold">
                                {formatCurrency(order?.totalPrice as number)}
                            </p>
                        </div>
                        <div className="w-full h-1 border-t-2" />
                        <div className="flex justify-between">
                            <p className="font-bold text-xl">Tổng cộng</p>
                            <p className="font-bold text-lg">
                                {order?.totalPrice}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ReportModal
                isOpen={isReportModalOpen}
                entityId={order?.garageId || ""}
                entityName={order?._id || ""}
                isLoading={isLoading}
                onClose={() => setReportModalOpen(false)}
                onSave={(report) => onReportModalSubmit(report)}
            />
        </div>
    );
}
export default OrderDetail;
