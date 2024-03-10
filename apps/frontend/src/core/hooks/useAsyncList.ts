import { useEffect, useMemo } from "react";
import { usePrevious } from ".";
import deepEqual from "deep-equal";
import useSWR from "swr";
import { Response } from "../types";

export default function useAsyncList<T>(
    getKey: string | (() => string),
    setter: (data: T[]) => void,
    dependencies: React.DependencyList,
    fetcher: () => Promise<Response<T[]>>,
) {
    const previousDependencies = usePrevious(dependencies);
    const isReload = useMemo(() => {
        return deepEqual(previousDependencies, dependencies);
    }, [dependencies, previousDependencies]);
    const { isLoading, data: response } = useSWR(getKey, fetcher);

    useEffect(() => {
        if (isLoading) {
            setter(response?.data || []);
        }
    }, [response?.data, isLoading, setter]);

    return { isReload, response };
}
