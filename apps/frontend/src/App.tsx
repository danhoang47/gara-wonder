import { NextUIProvider } from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";

import { ModalContextProvider } from "./core/contexts";
import Toasts from "./features/toasts";
import { useAuth } from "./core/hooks";
import { NotificationsListener } from "./features/notifications";

function App() {
    const navigate = useNavigate();
    useAuth();

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <NotificationsListener>
                <NextUIProvider navigate={navigate} className="h-full">
                    <ModalContextProvider>
                        <div className=" relative light text-foreground bg-background h-full">
                            <Outlet />
                        </div>
                        <Toasts />
                    </ModalContextProvider>
                </NextUIProvider>
            </NotificationsListener>
        </APIProvider>
    );
}

export default App;
