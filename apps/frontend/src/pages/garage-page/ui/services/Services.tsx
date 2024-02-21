import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SupportedChip } from "..";
import SkeletonServices from "./skeleton-services";

const fakeData = [
    {
        name: "service 1",
        status: true,
        support: "2010",
        lowestPrice: "10",
        highestPrice: "100",
        brand: "Mercedes",
        description: "This is a detail of service 1",
    },
    {
        name: "service 1",
        status: false,
        support: "2010",
        lowestPrice: "10",
        highestPrice: "100",
        brand: "Mercedes",
        description: "This is a detail of service 1",
    },
    {
        name: "service 1",
        status: true,
        support: "2010",
        lowestPrice: "10",
        highestPrice: "100",
        brand: "Mercedes",
        description: "This is a detail of service 1",
    },
    {
        name: "service 1",
        status: true,
        support: "2010",
        lowestPrice: "10",
        highestPrice: "100",
        brand: "Mercedes",
        description: "This is a detail of service 1",
    },
];

function Services() {
    const [serviceList, setServiceList] = useState(fakeData);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            <div className="pb-4">
                <p className="text-2xl text-black font-medium">Services</p>
                <p className="text-sm text-zinc-500">
                    All services this garage have
                </p>
            </div>
            {isLoading ? (
                <SkeletonServices />
            ) : (
                <div className="flex flex-col gap-4">
                    {serviceList.map((service, index) => (
                        <div
                            key={index}
                            className="flex justify-between w-full items-center"
                        >
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faWrench} size="xl" />
                                <div>
                                    <div className="flex items-center">
                                        <p className="font-medium">
                                            Repairing services.
                                        </p>
                                        <SupportedChip
                                            isSupport={service.status}
                                        />
                                    </div>
                                    <div className="text-sm text-zinc-500">
                                        <p>
                                            {service.description}{" "}
                                            <span className="text-primary cursor-pointer hover:text-primary-700">
                                                See all supported cars
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold">
                                    {service.lowestPrice}$ -{" "}
                                    {service.highestPrice}$
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Services;
