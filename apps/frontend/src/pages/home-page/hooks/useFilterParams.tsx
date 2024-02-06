import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { GarageFilter } from "@/core/types";

function useFilterParams() {
    const [urlSearchParams, setURLSearchParams] = useSearchParams();
    const filterParams = useMemo<GarageFilter>(() => {
        const keys: Array<keyof GarageFilter> = [
            "priceRange",
            "ratings",
            "brands",
            "additional",
            "distance",
        ];

        return keys.reduce<GarageFilter>((acc, key) => {
            const searchParam = urlSearchParams.get(key);

            if (searchParam) {
                return {
                    ...acc,
                    [key]: JSON.parse(searchParam),
                };
            }

            return acc;
        }, {});
    }, [urlSearchParams]);

    const setFilterParams = (filters: GarageFilter) => {
        setURLSearchParams((prev) => {
            Object.keys(filters).forEach((key) => {
                const filterValue = filters[key as keyof GarageFilter];

                if (filterValue) {
                    if (
                        Array.isArray(filterValue) &&
                        filterValue.length === 0
                    ) {
                        return;
                    }

                    prev.set(key, JSON.stringify(filterValue));
                }
            });

            return prev;
        });
    };

    return [filterParams, setFilterParams] as const;
}

export default useFilterParams;
