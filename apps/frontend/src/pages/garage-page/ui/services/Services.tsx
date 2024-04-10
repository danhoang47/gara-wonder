import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import { getBrands, getGarageServices } from "@/api";

import ServiceDetail from "./service-detail";
import SkeletonServices from "./skeleton-services";

function Services() {
    const { garageId } = useParams();
    const { isLoading: isServicesLoading, data: servicesList } =
        useSWRImmutable(`service/${garageId}`, getGarageServices);
    const { isLoading: isBrandsLoading, data: brands } = useSWRImmutable(
        "brands",
        getBrands,
    );
    console.log(brands);

    return (
        <div>
            <div className="pb-4">
                <p className="text-xl text-black font-semibold">Dịch vụ</p>
                <p className="text-sm text-zinc-500">
                    Tất cả dịch vụ Garage này có
                </p>
            </div>
            {isBrandsLoading && isServicesLoading ? (
                <SkeletonServices />
            ) : (
                <div className="flex flex-col gap-4">
                    {servicesList?.data.map((service, index) => (
                        <ServiceDetail key={index} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Services;
