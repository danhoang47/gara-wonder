import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AdditonalSkeleton from "./additional-skeleton";

const fakeData = [
    {
        id: "1",
        name: "Serving drinks while waiting ",
        icon: "faCoffee",
    },
    {
        id: "1",
        name: "Serving drinks while waiting ",
        icon: "faCoffee",
    },
    {
        id: "1",
        name: "Serving drinks while waiting ",
        icon: "faCoffee",
    },
    {
        id: "1",
        name: "Serving drinks while waiting ",
        icon: "faCoffee",
    },
];
function AdditionalServices() {
    const [additionalServices, setAdditionalServices] = useState(fakeData);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            <div className="pb-4">
                <p className="text-2xl text-black font-medium">
                    Additional Services
                </p>
            </div>
            {isLoading ? (
                <AdditonalSkeleton />
            ) : (
                <div className="flex flex-col gap-4">
                    {additionalServices.map((service, index) => {
                        return (
                            <div
                                className="flex items-center gap-4"
                                key={index}
                            >
                                <FontAwesomeIcon
                                    icon={icons[service.icon as any]}
                                />
                                <p>{service.name}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default AdditionalServices;
