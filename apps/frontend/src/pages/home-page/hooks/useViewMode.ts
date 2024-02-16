import { useCallback, useState } from "react";

export type ViewMode = "grid" | "map"

export default function useViewMode(initialState: ViewMode = "grid") {
    const [viewMode, setViewMode] = useState<ViewMode>(initialState);

    const onViewModeChange = useCallback((vm: ViewMode) => {
        setViewMode(vm)
    }, [])

    return [ viewMode, onViewModeChange ] as const
}