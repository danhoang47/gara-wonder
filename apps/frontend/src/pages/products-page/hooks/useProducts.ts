import { WithBrandProduct } from "@/api/supplier/getProducts";
import { useAppDispatch, useAppSelector, usePrevious } from "@/core/hooks";
import { FetchStatus, ProductFilter } from "@/core/types";
import {
    getListProducts,
    reloadProducts,
} from "@/features/products/products.slice";
import { useEffect, useMemo, useState } from "react";
import useFilterParams from "./useFilterParams";
import { useSearchParams } from "react-router-dom";
import deepEqual from "deep-equal";
import { unloadGarages } from "@/features/garages";

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
        isReload,
        fetchingStatus,
        nextCursor,
    } = useAppSelector((state) => state.products);
    const status = useAppSelector((state) => state.user.status);

    const [products, setProducts] = useState<WithBrandProduct[]>([]);
    const [cursor, setCursor] = useState<string>();
    const queryParams = useDeserializeGarageParams();
    const prevQueryParams = usePrevious(queryParams);
    const isSameQueryParams = deepEqual(queryParams, prevQueryParams);

    useEffect(() => {
        if (status === FetchStatus.Fulfilled) {
            dispatch(getListProducts({ ...queryParams, cursor }));
        }
    }, [status, cursor, JSON.stringify(queryParams)]);

    useEffect(() => {
        if (fetchingStatus === FetchStatus.Fulfilled) {
            if (isReload) {
                setProducts(newProducts);
                dispatch(unloadGarages());
            } else {
                setProducts((garages) => garages.concat(newProducts));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchingStatus]);

    useEffect(() => {
        if (!isSameQueryParams) {
            dispatch(reloadProducts());
            setCursor(undefined);
        }
    }, [dispatch, isSameQueryParams]);

    const onNext = () => {
        if (!nextCursor) return;

        setCursor(nextCursor);
    };

    return { products, onNext, fetchingStatus };
};

export default useProducts;
