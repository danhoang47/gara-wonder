import GarageSkeletonCard from "../garage-skeleton-card";
import GarageCard from "../garage-card";
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

    // return (
    //     <>
    //         {
    //             garages?.map(garage => (
    //                 <div key={garage._id}>
    //                     {garage.name}
    //                 </div>
    //             ))
    //         }
    //     </>
    // )
    return (
        <>
            {Array.from(new Array(20)).map((_, index) => (
                <GarageCard key={index} garage={{
                    _id: "1",
                    name: "Insert Garage Name Here",
                    description: "Insert Description Here",
                    address: "Address 16, Q1 District, HCM City",
                }}/>
            ))}
        </>
    )
}