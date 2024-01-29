import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const fakeData = [
    {
        id: "1",
        additionalServicesName: "Serving drinks while waiting ",
        icon: faCoffee,
    },
    {
        id: "1",
        additionalServicesName: "Serving drinks while waiting ",
        icon: faCoffee,
    },
    {
        id: "1",
        additionalServicesName: "Serving drinks while waiting ",
        icon: faCoffee,
    },
    {
        id: "1",
        additionalServicesName: "Serving drinks while waiting ",
        icon: faCoffee,
    },
];
function AdditionalServices() {
    const [additionalServices, setAdditionalServices] = useState(fakeData);
    return (
        <div>
            <div className="pb-4">
                <p className="text-2xl text-black font-medium">
                    Additional Services
                </p>
            </div>
            <div className="flex flex-col gap-4">
                {additionalServices.map((service, index) => {
                    return (
                        <div className="flex items-center gap-4" key={index}>
                            <FontAwesomeIcon icon={service.icon} />
                            <p>{service.additionalServicesName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default AdditionalServices;
