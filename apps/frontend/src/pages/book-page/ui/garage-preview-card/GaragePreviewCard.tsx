import { getBasicGarageInfo, getGarageImages } from "@/api";
import { useOrderContext } from "../../hooks";
import useSWRImmutable from "swr/immutable";
import { Carousel } from "@/core/ui";

function GaragePreviewCard() {
    const { order } = useOrderContext();
    const { garageId } = order;
    const { data: images } = useSWRImmutable(
        `images/${garageId}`,
        getGarageImages,
    );
    const { data: basicInfo } = useSWRImmutable(
        garageId,
        getBasicGarageInfo,
    );
    const garage = basicInfo?.data[0]

    return (
        <div className="p-4 border-2 rounded-large">
            <div className="h-48">
                <Carousel
                    items={images?.data || []}
                    renderItem={({ _id, url }) => (
                        <div key={_id} className="w-full h-full">
                            <img src={url} className="w-full h-full object-cover object-center"/>
                        </div>
                    )}
                    classNames={{
                        item: "w-full"
                    }}
                />
            </div>
            <div className="mt-2">
                <h2 className="font-semibold">{garage?.name}</h2>
                <p className="text-small w-full overflow-hidden whitespace-nowrap text-ellipsis">{garage?.description}</p>
            </div>
        </div>
    );
}

export default GaragePreviewCard;
