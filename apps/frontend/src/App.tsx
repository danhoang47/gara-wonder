import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { ModalContextProvider } from "./core/contexts";
import Toasts from "./features/toasts";
import { auth } from "./components/firebase";
import { FetchStatus } from "./core/types";
import {
    useAppDispatch,
    useAppSelector,
    useLoadingContext,
} from "./core/hooks";
import { getUserById } from "./features/user/user.slice";

function App() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.user.status);
    const { load, unload } = useLoadingContext();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(getUserById(user.uid));
            }
        });
    }, []);

    useEffect(() => {
        if (status === FetchStatus.Fetching) {
            load();
        }
        if (
            status === FetchStatus.Fulfilled ||
            status === FetchStatus.Rejected
        ) {
            unload();
        }
    }, [status]);

    return (
        <NextUIProvider navigate={navigate} className="h-full">
            <ModalContextProvider>
                <div className="light text-foreground bg-background h-full">
                    <Outlet />
                </div>
                <Toasts />
            </ModalContextProvider>
        </NextUIProvider>
    );
}

export default App;
