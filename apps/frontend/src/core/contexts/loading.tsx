import { createContext, useCallback, useMemo, useState } from "react";
import { ContainerProps } from "../types";
import { FullPageLoad } from "../ui";

export type LoadingContextType = {
    load: () => void;
    unload: () => void;
}

export const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);

export default function LoadingContextProvider({ children }: ContainerProps) {
    const [isLoading, setLoading] = useState<boolean>(false);

    const load = () => {
        setLoading(true)
    }

    const unload = () => {
        setLoading(false)
    }

    const loadingContextValue = {
        load,
        unload
    }

    return (
        <LoadingContext.Provider value={loadingContextValue}>
            {children}
            {isLoading && <FullPageLoad />}
        </LoadingContext.Provider>
    )
} 
