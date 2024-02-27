import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import SkeletonServices from "./skeleton-services";
import { getGarageServices } from "@/api";
import { Service } from "@/core/types";
import CategoryDetail from "./category-detail";

function Services() {
    const { garageId } = useParams();
    const { isLoading: isServicesLoading, data: servicesList } =
        useSWRImmutable(`service/${garageId}`, getGarageServices);
    return (
        <div>
            <div className="pb-4">
                <p className="text-2xl text-black font-medium">Services</p>
                <p className="text-sm text-zinc-500">
                    All services this garage have
                </p>
            </div>
            {isServicesLoading ? (
                <SkeletonServices />
            ) : (
                <div className="flex flex-col gap-4">
                    {servicesList?.data.map((service: Service, index) => (
                        <div
                            key={index}
                            className="flex justify-between w-full items-center"
                        >
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faWrench} size="xl" />
                                <CategoryDetail service={service} />
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
