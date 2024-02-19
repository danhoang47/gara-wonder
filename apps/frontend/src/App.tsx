import { NextUIProvider } from "@nextui-org/react";

import { Outlet, useNavigate } from "react-router-dom";

import { ModalContextProvider } from "./core/contexts";
import Toasts from "./features/toasts";

import "./components/firebase";
import { useAppSelector, useLoadingContext } from "./core/hooks";
import { FetchStatus } from "./core/types";

function App() {
    const navigate = useNavigate();
    const status = useAppSelector(state => state.user.status)
    const { load, unload } = useLoadingContext();


    if (status === FetchStatus.Fetching) {
        load()
    }

    if (status === FetchStatus.Fulfilled || status === FetchStatus.Rejected) {
        unload()

    }

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
