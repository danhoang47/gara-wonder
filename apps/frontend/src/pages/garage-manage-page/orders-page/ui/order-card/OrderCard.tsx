import { Order } from "@/core/types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Link, Tooltip } from "@nextui-org/react";

function OrderCard({ order }: { order?: Order }) {
    return (
        <div className="">
            <div className=" border-2 rounded-md p-5 hover:border-default-600 hover:shadow-lg transition-colors">
                <div className="relative">
                    <div className="flex gap-5">
                        <Link
                            href={`orders/${order._id}`}
                            target="_blank"
                            className="font-semibold text-lg"
                        >
                            {order?.car.brand.name} {order?.car.model} -{" "}
                            {order?.car.plateNumber}
                        </Link>
                        <Tooltip
                            content="I am a tooltip"
                            disableAnimation
                            radius="sm"
                            classNames={{
                                content:
                                    "bg-default-800 text-white font-semibold",
                            }}
                        >
                            <Chip color="success" radius="sm">
                                <p className="font-semibold">Confirmed</p>
                            </Chip>
                        </Tooltip>
                    </div>
                    <div className="flex gap-2 pt-1">
                        <Chip
                            classNames={{
                                base: "bg-default-500 text-white min-w-[6rem] text-center",
                            }}
                        >
                            <p className="font-semibold">Car wash</p>
                        </Chip>
                        <Chip
                            classNames={{
                                base: "bg-default-500 text-white min-w-[6rem] text-center",
                            }}
                        >
                            <p className="font-semibold">Slot 7</p>
                        </Chip>
                    </div>
                    <div className=" pt-5 flex gap-6 items-center">
                        <div>
                            <p className="font-medium text-default-500">
                                Start time
                            </p>
                            <p className="font-medium">29 Nov 2024, 03:30pm</p>
                        </div>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-default-500"
                        />
                        <div>
                            <p className="font-medium text-default-500">
                                End time
                            </p>
                            <p className="font-medium">29 Nov 2024, 03:30pm</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderCard;
