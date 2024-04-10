import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AdditionalService } from "@/core/types";
import AdditonalSkeleton from "./additional-skeleton";

function AdditionalServices({
    additionalServices,
    isLoading,
}: {
    additionalServices?: AdditionalService[];
    isLoading: boolean;
}) {
    return (
        <div>
            <div className="pb-4">
                <p className="text-xl text-black font-semibold">
                    Dịch vụ đi kèm
                </p>
            </div>
            {isLoading ? (
                <AdditonalSkeleton />
            ) : (
                <div className="flex flex-col gap-4">
                    {additionalServices?.map(
                        (service: AdditionalService, index) => {
                            return (
                                <div
                                    className="flex items-center gap-4"
                                    key={index}
                                >
                                    <FontAwesomeIcon icon={icons["faCoffee"]} />
                                    <p>{service.name}</p>
                                </div>
                            );
                        },
                    )}
                </div>
            )}
        </div>
    );
}
export default AdditionalServices;
