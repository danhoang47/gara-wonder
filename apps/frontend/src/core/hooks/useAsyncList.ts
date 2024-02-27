import { Fetcher, Key } from 'swr';
import equal from 'deep-equal'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { usePrevious } from '.';

export default function useAsyncList<K extends Key, T, D = unknown>(
    getKey: SWRInfiniteKeyLoader<K>,
    fetcher: Fetcher<T, K>,
    dependency: D
) {
    const previousDependency = usePrevious(dependency)
    const isReload = equal(dependency, previousDependency)
    const { isLoading, error, data } = useSWRInfinite(getKey, fetcher)

    return { isReload, isLoading, error, data }
}