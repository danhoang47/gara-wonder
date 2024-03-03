import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "@/App";
import { DefaultLayout, GarageLayout } from "@/layouts";
import {
    HomePage,
    GarageRegistrationPage,
    GaragePage,
    BookPage,
    GarageManagePage,
    GeneralDashboard,
} from "@/pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<DefaultLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="garage/:garageId" element={<GaragePage />} />
                <Route path="book" element={<BookPage />} />
                <Route
                    path="garage-registration"
                    element={<GarageRegistrationPage />}
                />
            </Route>
            <Route
                path="garage-management/:garageId"
                element={<GarageLayout />}
            >
                <Route element={<GarageManagePage />}>
                    <Route path="" element={<GeneralDashboard />} />
                </Route>
            </Route>
        </Route>,
    ),
);

export default router;
