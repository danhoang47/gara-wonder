import { useEffect } from "react";
import useAppSelector from "./useAppSelector";
import { FetchStatus } from "../types";
import useLoadingContext from "./useLoadingContext";

function useAuthLoading(key: string) {
    const status = useAppSelector((state) => state.user.status);
    const { load, unload } = useLoadingContext();

    useEffect(() => {
        if (status === FetchStatus.Fetching || status === FetchStatus.None) {
            load(key);
        } else {
            unload(key);
        }
    }, [status, load, unload]);
}

export default useAuthLoading;
