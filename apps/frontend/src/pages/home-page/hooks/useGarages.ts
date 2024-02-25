import { useAppSelector, usePrevious } from "@/core/hooks";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export default function useGarages() {
    const filter = useAppSelector((state) => state.filter);
    const [searchParams] = useSearchParams();
    const [sortBy, categoryId, lng, lat] = useMemo(
        () => [
            searchParams.get("sortBy"),
            searchParams.get("category"),
            searchParams.get("lng"),
            searchParams.get("lat"),
        ],
        [searchParams],
    );
    const filterParams = usePrevious({
        ...filter,
        sortBy,
        categoryId,
        lng,
        lat,
    });

    console.log("PREV:", filterParams, "CURRENT:", {
        ...filter,
        sortBy,
        categoryId,
        lng,
        lat,
    });

    return { garages: [], isLoading: false, error: null };
}
