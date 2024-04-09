import { createContext, useCallback, useMemo, useState } from "react";
import { ContainerProps } from "../types";
import { FullPageLoad } from "../ui";

export type LoadingContextType = {
    load: (id: string) => void;
    unload: (id: string) => void;
}

export const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);

export default function LoadingContextProvider({ children }: ContainerProps) {
    const [loadMap, setLoadMap] = useState<Record<string, boolean>>({});
    const isLoading = useMemo(() => Object.values(loadMap).some(isLoading => isLoading), [loadMap])

    const load = useCallback((id: string) => {
        setLoadMap(prev => ({
            ...prev,
            [id]: true
        }))
    }, [])

    const unload = useCallback((id: string) => {
        setLoadMap(prev => {
            const newLoadMap = {...prev}
            delete newLoadMap[id]
            return newLoadMap
        })
    }, [])

    const loadingContextValue = useMemo(() => ({
        load,
        unload
    }), [load, unload])

    console.log(loadMap)
    return (
        <LoadingContext.Provider value={loadingContextValue}>
            {children}
            {isLoading && <FullPageLoad />}
        </LoadingContext.Provider>
    )
} 
