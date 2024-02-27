import { useAppSelector, usePrevious } from "@/core/hooks";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import useSWR from "swr";
import { getGarages } from "@/api";

export default function useGarages() {
    const filter = useAppSelector((state) => state.filter);
    const user = useAppSelector((state) => state.user.value);
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

    // same params (filter, user, categoryId, lng, lat) => append
    // diff params => reload

    // useSWR("/garages", () => getGarages(categoryId, filter, sortBy, undefined, lat, lng))

    return { garages: [], isLoading: false, error: null, isReload: false };
}
