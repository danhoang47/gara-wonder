import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import store from "@/store"

function App() {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <ReduxProvider store={store}>
                <div className="light text-foreground bg-background">
                    <Outlet />
                </div>
            </ReduxProvider>
        </NextUIProvider>
    );
}

export default App;
