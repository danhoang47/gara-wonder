import { useState } from "react";
import { useFilterParams } from ".";
import { Garage } from "@/core/types";

export default function useGarages() {
    const { filterParams } = useFilterParams();
    const [garages, setGarages] = useState<Garage[]>();
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

    
}