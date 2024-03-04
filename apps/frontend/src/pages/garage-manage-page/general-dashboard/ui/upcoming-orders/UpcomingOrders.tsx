import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Tooltip } from "@nextui-org/react";

function UpcomingOrders() {
    return (
        <div className="pt-10 md:w-1/2">
            <div className="flex justify-between">
                <p className="font-semibold text-lg">Upcoming orders</p>
                <p className="font-semibold">See all(14)</p>
            </div>
            <div className="pt-5">
                <div className=" border-2 rounded-md p-5">
                    <div className="relative">
                        <div className="flex gap-5">
                            <p className="font-semibold text-lg">
                                Mazda 3 - 43A 12345
                            </p>
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
                                <p className="font-medium">
                                    29 Nov 2024, 03:30pm
                                </p>
                            </div>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="text-default-500"
                            />
                            <div>
                                <p className="font-medium text-default-500">
                                    End time
                                </p>
                                <p className="font-medium">
                                    29 Nov 2024, 03:30pm
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className=" border-2 rounded-md p-5">
                    <div className="relative">
                        <div className="flex gap-5">
                            <p className="font-semibold text-lg">
                                Mazda 3 - 43A 12345
                            </p>
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
                                <p className="font-medium">
                                    29 Nov 2024, 03:30pm
                                </p>
                            </div>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="text-default-500"
                            />
                            <div>
                                <p className="font-medium text-default-500">
                                    End time
                                </p>
                                <p className="font-medium">
                                    29 Nov 2024, 03:30pm
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className=" border-2 rounded-md p-5">
                    <div className="relative">
                        <div className="flex gap-5">
                            <p className="font-semibold text-lg">
                                Mazda 3 - 43A 12345
                            </p>
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
                                <p className="font-medium">
                                    29 Nov 2024, 03:30pm
                                </p>
                            </div>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="text-default-500"
                            />
                            <div>
                                <p className="font-medium text-default-500">
                                    End time
                                </p>
                                <p className="font-medium">
                                    29 Nov 2024, 03:30pm
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpcomingOrders;
