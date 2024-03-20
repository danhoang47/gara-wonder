import { useInfiniteScroll } from "@/core/hooks";
import { ViewModeGaragesProps } from "./Garages";
import GarageSkeletonCard from "../garage-skeleton-card";
import GarageCard from "../garage-card";

export default function GridViewGarages({
    isLoading,
    isReload,
    garages,
    onNext
}: ViewModeGaragesProps) {
    const ref = useInfiniteScroll(onNext)

    const renderLoadingGarages = () => {
        return (
            <>
                {
                    Array.from(new Array(10)).map((_, index) => (
                        <GarageSkeletonCard key={index} />
                    ))
                }
            </>
        )
    }

    return (
        <div className="gridViewGaragesWrapper px-10">
            <div className="gridViewGarages">
                {isReload && renderLoadingGarages()}
                {garages?.map((garage) => (
                    <GarageCard key={garage._id} garage={garage} />
                ))}
                {isLoading && renderLoadingGarages()}
            </div>
            <div ref={ref} className="h-10" />
        </div>
    )
}