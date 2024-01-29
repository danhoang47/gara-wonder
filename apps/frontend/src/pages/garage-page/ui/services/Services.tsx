import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SupportedChip } from "..";

const fakeData = [
    {
        service: "repair",
        isSupported: true,
        support: "2010",
        min: "10",
        max: "100",
    },
    {
        service: "repair",
        isSupported: false,
        support: "2010",
        min: "10",
        max: "100",
    },
    {
        service: "repair",
        isSupported: true,
        support: "2010",
        min: "10",
        max: "100",
    },
    {
        service: "repair",
        isSupported: true,
        support: "2010",
        min: "10",
        max: "100",
    },
];

function Services() {
    const [serviceList, setServiceList] = useState(fakeData);
    return (
        <div>
            <div className="pb-4">
                <p className="text-2xl text-black font-medium">Services</p>
                <p className="text-sm text-zinc-500">
                    All services this garage have
                </p>
            </div>
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
                                        isSupport={service.isSupported}
                                    />
                                </div>
                                <div className="text-sm text-zinc-500">
                                    <p>
                                        Support all available from{" "}
                                        {service.support} to now{" "}
                                        <span className="text-primary cursor-pointer hover:text-primary-700">
                                            See all supported cars
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">
                                {service.min}$ - {service.max}$
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Services;
