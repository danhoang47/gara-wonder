import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useLoadingContext } from ".";
import { onAuthStateChanged } from "firebase/auth";
import { getGarageByUserId, getUserById, setEmptyUser, setUserToken } from "@/features/user/user.slice";
import { auth } from "@/components/firebase";
import { FetchStatus, Role, User } from "../types";

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
                        .then(action => {
                            const user = action.payload as User
                            if (user.role === Role.GarageOwner) {
                                dispatch(getGarageByUserId(user._id))
                            }
                        })
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