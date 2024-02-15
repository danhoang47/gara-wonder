import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import "./components";

import store from "@/store";
import { ModalContextProvider } from "./core/contexts";

function App() {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <ReduxProvider store={store}>
                <ModalContextProvider>
                    <div className="light text-foreground bg-background">
                        <Outlet />
                    </div>
                </ModalContextProvider>
            </ReduxProvider>
        </NextUIProvider>
    );
}

export default App;
