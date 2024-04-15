import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useLoadingContext } from ".";
import { onAuthStateChanged } from "firebase/auth";
import {
    Type,
    getGarageByUserId,
    getUserById,
    setEmptyUser,
    setUserToken,
} from "@/features/user/user.slice";
import { auth } from "@/components/firebase";
import { FetchStatus, Role, User } from "../types";

export default function useAuth() {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.user.status);
    const type = useAppSelector((state) => state.user.type);
    const { load, unload } = useLoadingContext();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(true).then(async (token) => {
                    dispatch(setUserToken(token));
                    dispatch(getUserById(user.uid)).then((action) => {
                        const user = action.payload as User;
                        if (user?.role && (user.role === Role.GarageOwner || user.role === Role.Staff)) {
                            dispatch(getGarageByUserId(user._id));
                        }
                    });
                });
            } else {
                dispatch(setEmptyUser());
            }
        });

        return () => unSubscribe();
    }, [dispatch]);

    useEffect(() => {
        if (status === FetchStatus.Fetching && type !== Type.SignUp) {
            load("login");
        }
        if (
            status === FetchStatus.Fulfilled ||
            status === FetchStatus.Rejected
        ) {
            unload("login");
        }
    }, [load, status, unload, type]);
}
