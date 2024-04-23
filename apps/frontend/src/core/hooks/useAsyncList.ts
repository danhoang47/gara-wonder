import { useEffect, useMemo, useState } from "react";
import { usePrevious } from ".";
import equal from "deep-equal";
import useSWR from "swr";
import { Paging, Response } from "../types";

export default function useAsyncList<T>(
    getKey: string | null | (() => string | null),
    onItemsLoaded: (data: T[], isReload: boolean) => void,
    dependencies: React.DependencyList,
    fetcher: (
        params: [string | null | (() => string | null), Paging],
    ) => Promise<Response<T[]>>,
    defaultPaging: Paging,
) {
    const previousDependencies = usePrevious(dependencies);
    const isReload = useMemo(() => {
        return !equal(previousDependencies, dependencies);
    }, [previousDependencies, dependencies]);
    const [paging, setPaging] = useState<Paging>(defaultPaging);
    const key = useMemo(() => {
        if (typeof getKey === "function") {
            return getKey();
        }
        return getKey;
    }, [getKey]);
    const { isLoading, data: response } = useSWR(
        key && [getKey, isReload ? defaultPaging : paging, dependencies],
        (params) => fetcher(params),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );
    useEffect(() => {
        if (!isLoading) {
            onItemsLoaded(response?.data || [], isReload);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response?.data, isLoading, isReload]);

    const onNext = () => {
        if (!response || !response.nextCursor) return;

        setPaging((prev) => ({
            ...prev,
            cursor: response?.cursor,
            nextCursor: response?.nextCursor,
            total: response?.total,
        }));
    };
    return { isReload, isLoading, onNext };
}
