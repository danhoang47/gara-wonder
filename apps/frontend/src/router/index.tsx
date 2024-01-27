import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "@/App";
import { DefaultLayout } from "@/layouts";
import { HomePage, GarageRegistrationPage, GaragePage,  } from "@/pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/garage/:garageId" element={<GaragePage />} />
                <Route
                    path="/garage-registration"
                    element={<GarageRegistrationPage />}
                />
                <Route path="/garage-registration" element={<GarageRegistrationPage />} />
                <Route path="/garage-registration" element={<GarageRegistrationPage />} />
            </Route>
        </Route>,
    ),
);

export default router;
