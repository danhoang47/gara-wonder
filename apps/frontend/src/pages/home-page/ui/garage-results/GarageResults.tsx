import { useState } from "react";

import { Garage } from "@/core/types";
import { useFilterParams } from "../../hooks";
import GarageSkeletonCard from "../garage-skeleton-card";

function GarageResult() {
    const { filterParams } = useFilterParams();
    const [garages, setGarages] = useState<Garage[]>();
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

    return (
        <div className="grid grid-cols-4 gap-3 relative">
            {Array.from(new Array(8)).map((_, index) => (
                <GarageSkeletonCard key={index}/>
            ))}
        </div>
    );
}

export default GarageResult;
