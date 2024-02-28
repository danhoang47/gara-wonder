import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useLoadingContext } from ".";
import { onAuthStateChanged } from "firebase/auth";
import { getUserById, setEmptyUser, setUserToken } from "@/features/user/user.slice";
import { auth } from "@/components/firebase";
import { FetchStatus } from "../types";

export default function useAuth() {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.user.status);
    const { load, unload } = useLoadingContext();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then(token => {
                    dispatch(setUserToken(token))
                    dispatch(getUserById(user.uid))
                })
            } else {
                dispatch(setEmptyUser())
            }
        });
    }, []);

    useEffect(() => {
        if (status === FetchStatus.Fetching) {
            load("login");
        }
        if (
            status === FetchStatus.Fulfilled ||
            status === FetchStatus.Rejected
        ) {
            unload("login");
        }
    }, [load, status, unload]);
}