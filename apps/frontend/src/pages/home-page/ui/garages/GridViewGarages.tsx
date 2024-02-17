import GarageSkeletonCard from "../garage-skeleton-card";
import { ViewModeGaragesProps } from "./Garages";

export default function GridViewGarages({
    garages,
    isLoading,
    error
}: ViewModeGaragesProps) {

    if (isLoading) {
        return (
            <>
                {Array.from(new Array(20)).map((_, index) => (
                    <GarageSkeletonCard key={index} />
                ))}
            </>
        )
    }

    return (
        <>
            {
                garages?.map(garage => (
                    <div key={garage._id}>
                        {garage.name}
                    </div>
                ))
            }
        </>
    )
}