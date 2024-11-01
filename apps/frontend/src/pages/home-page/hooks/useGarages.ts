import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import equal from "deep-equal";

import { useFilterParams } from ".";
import { useAppDispatch, useAppSelector, usePrevious } from "@/core/hooks";

import { WithOwnerGarage } from "@/api/garages/getGarages";
import {
    getListGarages,
    reloadGarages,
    unloadGarages,
} from "@/features/garages/garages.slice";
import { FetchStatus, GarageQueryParams } from "@/core/types";
import { ViewMode } from "./useViewMode";

type AdditionalParams = {
    sortBy?: string;
    category?: string;
    lat?: string;
    lng?: string;
};

const keys: (keyof GarageQueryParams)[] = [
    "sortBy",
    "category",
    "lat",
    "lng",
    "priceRange",
    "ratings",
    "brands",
    "additional",
    "distance",
];

const useDeserializeGarageParams = (): GarageQueryParams => {
    const _id = useAppSelector((state) => state.user.value?._id);
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
    }, {} as AdditionalParams);
    const memoizedParams = useMemo(
        () => ({
            ...filterParams,
            ...params,
            _id,
        }),
        [filterParams, params, _id],
    );

    return memoizedParams;
};

export default function useGarages(viewMode: ViewMode) {
    const dispatch = useAppDispatch();
    const {
        isReload,
        fetchingStatus,
        garages: newGarages,
        nextCursor,
    } = useAppSelector((state) => state.garages);
    const status = useAppSelector((state) => state.user.status);

    const [garages, setGarages] = useState<WithOwnerGarage[]>([]);
    const [cursor, setCursor] = useState<string>();
    const queryParams = useDeserializeGarageParams();
    const prevQueryParams = usePrevious(queryParams);
    const isSameQueryParams = equal(queryParams, prevQueryParams);

    useEffect(() => {
        if (!isSameQueryParams) {
            dispatch(reloadGarages());
            setCursor(undefined);
        }
    }, [dispatch, isSameQueryParams]);

    useEffect(() => {
        if (fetchingStatus === FetchStatus.Fulfilled) {
            if (isReload) {
                setGarages(newGarages);
                dispatch(unloadGarages());
            } else {
                setGarages((garages) => garages.concat(newGarages));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchingStatus]);

    useEffect(() => {
        if (status === FetchStatus.Fulfilled) {
            dispatch(getListGarages({ ...queryParams, cursor }));
        }
    }, [status, JSON.stringify(queryParams), cursor]);

    const onNext = () => {
        if (!nextCursor) return;

        if (viewMode === "grid") {
            setCursor(nextCursor);
        }
    };

    const onUpdateGarage = (updatedGarage: WithOwnerGarage) => {
        setGarages((prev) =>
            prev.map((garage) => {
                if (garage._id === updatedGarage._id) {
                    return updatedGarage;
                }

                return garage;
            }),
        );
    };

    return { garages, fetchingStatus, isReload, onNext, onUpdateGarage };
}
