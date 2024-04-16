import { ProductFilter } from "@/core/types/model/product";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const keys: Array<keyof ProductFilter> = [
    "type",
    "brandId",
    "series",
    "models",
];

function useFilterParams() {
    const [urlSearchParams, setURLSearchParams] = useSearchParams();

    const filterParams = useMemo<ProductFilter>(() => {
        return keys.reduce<ProductFilter>((acc, key) => {
            const searchParam = urlSearchParams.get(key);

            if (searchParam) {
                return {
                    ...acc,
                    [key]: JSON.parse(searchParam),
                };
            }

            return { ...acc, [key]: "" };
        }, {});
    }, [urlSearchParams]);

    const setFilterParams = (filters: ProductFilter) => {
        const valuableKeys: string[] = [...keys];

        setURLSearchParams((prev) => {
            Object.keys(filters).forEach((key) => {
                const filterValue = filters[key as keyof ProductFilter];
                if (filterValue) {
                    valuableKeys.splice(valuableKeys.indexOf(key), 1);
                    prev.set(key, JSON.stringify(filterValue));
                }
            });

            valuableKeys.forEach((key) => prev.delete(key));

            return prev;
        });
    };

    return { filterParams, setFilterParams };
}

export default useFilterParams;
