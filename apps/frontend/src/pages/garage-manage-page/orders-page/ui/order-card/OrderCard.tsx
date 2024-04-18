import { acceptOrder } from "@/api";
import { OrderListType } from "@/api/order/getOrders";
import { useAppDispatch } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Link } from "@nextui-org/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function OrderCard({
    order,
    garageId,
}: {
    order?: OrderListType;
    garageId: string;
}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onAccept = async (str: string) => {
        try {
            const result = await acceptOrder(str, garageId, order?._id);
            if (result.statusCode === 200) {
                if (str === "accept") {
                    dispatch(
                        notify({
                            type: "success",
                            title: "Chấp nhận đơn hàng",
                            description: "Chấp nhận đơn hàng",
                            delay: 2000,
                        }),
                    );
                    navigate(`./${order?._id}`);
                } else
                    dispatch(
                        notify({
                            type: "success",
                            title: "Từ chối đơn hàng",
                            description: "Từ chối đơn hàng",
                            delay: 2000,
                        }),
                    );
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Xử lý thất bại",
                    description: "Một số lỗi xảy ra khi gửi xử lý",
                    delay: 2000,
                }),
            );
        }
    };
    return (
        <div className="max-w-[480px]">
            <div className="border-1 rounded-2xl p-5 shadow-sm">
                <div className="relative flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <div>
                                <img
                                    src={order?.userId.photoURL}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                            <div>
                                <div className="flex gap-5">
                                    <Link
                                        href={`orders/${order?._id}`}
                                        className="text-sm font-medium text-black"
                                    >
                                        {order?.car.brand.name}{" "}
                                        {order?.car.model} -{" "}
                                        {order?.car.plateNumber}
                                    </Link>
                                </div>
                                <div className="flex gap-2 ">
                                    <p className="text-sm">
                                        {moment(order?.handOverTime).format(
                                            "DD/MM/YYYY",
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-lg">
                                VND {order?.totalPrice}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <p className="font-semibold">
                                {order?.services.map((e, index) => {
                                    if (index === 0)
                                        return (
                                            <span key={index}>
                                                {e.category.name}
                                            </span>
                                        );

                                    return (
                                        <span key={index}>
                                            , {e.category.name}
                                        </span>
                                    );
                                })}
                            </p>
                            <div className="flex gap-2 items-center text-sm text-default-600">
                                <p>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className="mr-2"
                                    />
                                    Order Date:{" "}
                                    {moment(order?.handOverTime).format(
                                        "DD/MM/YYYY",
                                    )}
                                </p>

                                {order?.estimateHandOffTime !== undefined && (
                                    <>
                                        <p>-</p>
                                        <p>
                                            Return Date:{" "}
                                            {moment(
                                                order?.estimateHandOffTime,
                                            ).format("DD/MM/YYYY")}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="pt-3 flex gap-2 justify-between items-center">
                                <div>
                                    {order?.status < 0 && (
                                        <Chip color="primary">
                                            <p className="font-medium">
                                                Cần chấp nhận
                                            </p>
                                        </Chip>
                                    )}
                                    {order?.status == 0 && (
                                        <Chip color="primary">
                                            <p className="font-medium">
                                                Cần đánh giá
                                            </p>
                                        </Chip>
                                    )}
                                    {order?.status > 0 && (
                                        <Chip color="primary">
                                            <p className="font-medium">
                                                Đã chấp nhận
                                            </p>
                                        </Chip>
                                    )}
                                    {order?.evaluationRequired ? (
                                        ""
                                    ) : (
                                        <Chip
                                            color="default"
                                            variant="bordered"
                                        >
                                            <p className="font-medium text-default-500">
                                                Không có đánh giá
                                            </p>
                                        </Chip>
                                    )}
                                </div>
                                {order?.status === -1 && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => {
                                                onAccept("reject");
                                            }}
                                            size="sm"
                                        >
                                            Từ chối
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                onAccept("accept");
                                            }}
                                            color="primary"
                                            size="sm"
                                        >
                                            Chấp nhận
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderCard;
