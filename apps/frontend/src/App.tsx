import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import store from "@/store";
import { ModalContextProvider } from "./core/contexts";
import Toasts from "./features/toasts";

import "./components/firebase";

function App() {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate} className="h-full">
            <ReduxProvider store={store}>
                <ModalContextProvider>
                    <div className="light text-foreground bg-background h-full">
                        <Outlet />
                    </div>
                    <Toasts />
                </ModalContextProvider>
            </ReduxProvider>
        </NextUIProvider>
    );
}

export default App;
