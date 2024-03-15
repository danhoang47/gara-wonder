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
    CartPage,
    LandingPage,
} from "@/pages";
import { OrdersDetail, OrdersPage, Schedule } from "@/pages/garage-manage-page";
import IncomePage from "@/pages/garage-manage-page/income/IncomePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<DefaultLayout />}>
                <Route path="" element={<LandingPage />} />
                <Route path="garage" element={<HomePage />} />
                <Route path="garage/:garageId" element={<GaragePage />} />
                <Route path="book" element={<BookPage />} />
                <Route path="cart" element={<CartPage />} />
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
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:orderId" element={<OrdersDetail />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="income" element={<IncomePage />} />
                </Route>
            </Route>
        </Route>,
    ),
);

export default router;
