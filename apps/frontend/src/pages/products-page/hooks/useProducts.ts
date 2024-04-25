import { WithBrandProduct } from "@/api/supplier/getProducts";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { FetchStatus, ProductFilter } from "@/core/types";
import { getListProducts } from "@/features/products/products.slice";
import { useEffect, useMemo, useState } from "react";
import useFilterParams from "./useFilterParams";
import { useSearchParams } from "react-router-dom";

const keys: Array<keyof ProductFilter> = [
    "type",
    "brandId",
    "series",
    "models",
    "category",
];

const useDeserializeGarageParams = () => {
    const { filterParams } = useFilterParams();
    const [searchParams] = useSearchParams();
    const params = keys.reduce((acc, key) => {
        const value = searchParams.get(key);

        if (value) {
            return {
                ...acc,
                [key]: value,
            };
        }

        return acc;
    }, {});
    const memoizedParams = useMemo(
        () => ({
            ...filterParams,
            ...params,
        }),
        [filterParams, params],
    );

    return memoizedParams;
};

const useProducts = () => {
    const dispatch = useAppDispatch();
    const {
        products: newProducts,
        fetchingStatus,
        nextCursor,
    } = useAppSelector((state) => state.products);
    const status = useAppSelector((state) => state.user.status);

    const [products, setProduct] = useState<WithBrandProduct[]>([]);
    const [cursor, setCursor] = useState<string>();

    const queryParams = useDeserializeGarageParams();

    useEffect(() => {
        if (fetchingStatus === FetchStatus.Fulfilled) {
            setProduct((products) => [...products, ...newProducts]);
        }
    }, [fetchingStatus]);

    useEffect(() => {
        if (status === FetchStatus.Fulfilled) {
            dispatch(getListProducts({ ...queryParams }));
        }
    }, [status, cursor, JSON.stringify(queryParams)]);

    const onNext = () => {
        if (!nextCursor) return;

        setCursor(nextCursor);
    };

    return { products, onNext, fetchingStatus };
};

export default useProducts;
