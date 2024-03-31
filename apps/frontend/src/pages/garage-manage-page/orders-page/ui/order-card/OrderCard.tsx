import { OrderListType } from "@/api/order/getOrders";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Link } from "@nextui-org/react";
import moment from "moment";

function OrderCard({ order }: { order?: OrderListType }) {
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
                    <div className="flex gap-6 items-center">
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
                            <div className="pt-3 flex gap-2">
                                <Chip color="primary">
                                    <p className="font-medium">Accepted</p>
                                </Chip>
                                <Chip color="default" variant="bordered">
                                    <p className="font-medium text-default-500">
                                        No Evaluation
                                    </p>
                                </Chip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderCard;
