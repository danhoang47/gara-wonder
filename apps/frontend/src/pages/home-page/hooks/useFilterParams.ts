import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { GarageFilter } from "@/core/types";
import { useAppDispatch } from "@/core/hooks";
import { setFilter } from "@/features/garage-filter/filter.slice";

const keys: Array<keyof GarageFilter> = [
    "priceRange",
    "ratings",
    "brands",
    "additional",
    "distance",
    "isFavorite",
];

function useFilterParams() {
    const [urlSearchParams, setURLSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const filterParams = useMemo<GarageFilter>(() => {
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
        const valuableKeys: string[] = [...keys];

        setURLSearchParams((prev) => {
            Object.keys(filters).forEach((key) => {
                const filterValue = filters[key as keyof GarageFilter];

                if (filterValue) {
                    if (
                        Array.isArray(filterValue) &&
                        filterValue.length === 0
                    ) {
                        prev.delete(key);
                    }
                    valuableKeys.splice(valuableKeys.indexOf(key), 1);
                    prev.set(key, JSON.stringify(filterValue));
                }
            });

            valuableKeys.forEach((key) => prev.delete(key));

            return prev;
        });
    };

    useEffect(() => {
        if (Object.keys(filterParams).length) {
            dispatch(setFilter(filterParams));
        }
    }, []);

    return { filterParams, setFilterParams };
}

export default useFilterParams;
