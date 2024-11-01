import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import {
    AdditionalServices,
    BookingForm,
    Description,
    GarageHeader,
    GarageImagesPreview,
    GarageOwnerAndStaffInfoPreview,
    MapWithLocation,
    Markup,
    Services,
} from "./ui";
import { LoadingContext } from "@/core/contexts/loading";
import { getBasicGarageInfo } from "@/api";
import OrderContextProvider from "./context/OrderContext";
import Review from "./ui/reviews/Review";

import "./GaragePage.styles.scss"
import { useAuthLoading } from "@/core/hooks";

const GaragePage = () => {
    const { garageId } = useParams();
    const { load, unload } = useContext(LoadingContext);
    const { isLoading: isInfoLoading, data: basicInfo } = useSWRImmutable(
        garageId,
        getBasicGarageInfo,
    );
    useEffect(() => {
        if (isInfoLoading) load("garage-detail");
        else unload("garage-detail");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInfoLoading]);

    useAuthLoading(GaragePage.name)

    return (
        <OrderContextProvider>
            <Markup garage={basicInfo?.data[0]} />
            <div id="garage" className="relative overflow-auto pb-10">
                <div className="w-full max-w-[1024px] mx-auto mt-4">
                    <div className="">
                        <GarageHeader
                            name={basicInfo?.data[0]?.name}
                            address={basicInfo?.data[0]?.address}
                        />
                    </div>
                    <div className="my-6">
                        <GarageImagesPreview
                            backgroundImage={
                                basicInfo?.data[0]?.backgroundImage
                            }
                        />
                    </div>
                    <div className="my-6">
                        <div className="w-full flex gap-4 justify-between garageContent">
                            <div className="flex flex-col gap-4 flex-1">
                                <div className="border-b-1 pb-8 border-zinc-300">
                                    <GarageOwnerAndStaffInfoPreview
                                        garageOwner={basicInfo?.data[0]?.userId}
                                        staff={basicInfo?.data[0]?.staff}
                                    />
                                </div>
                                <div className="border-b-1 pb-8 border-zinc-300">
                                    <Services />
                                </div>
                                <div className="border-b-1 pb-8 border-zinc-300">
                                    <AdditionalServices
                                        additionalServices={
                                            basicInfo?.data[0]
                                                ?.additionalServices
                                        }
                                        isLoading={isInfoLoading}
                                    />
                                </div>
                            </div>
                            <div className="w-full shrink-0 min-w-[25rem] md:w-2/5 md:order-2">
                                <BookingForm />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Description
                            description={basicInfo?.data[0]?.description}
                        />
                        <MapWithLocation
                            location={basicInfo?.data[0].location}
                        />
                        <Review />
                    </div>
                </div>
            </div>
        </OrderContextProvider>
    );
};

export default GaragePage;
