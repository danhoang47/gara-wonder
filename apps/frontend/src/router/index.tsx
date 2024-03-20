import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "@/App";
import { DefaultLayout, GarageLayout } from "@/layouts";
import {
    GarageRegistrationPage,
    GaragePage,
    BookPage,
    GarageManagePage,
    GeneralDashboard,
    CartPage,
} from "@/pages";
import { OrdersDetail, OrdersPage, Schedule, StaffManagement, IncomePage } from "@/pages/garage-manage-page";
import { lazy, Suspense } from "react";
import { FullPageLoad } from "@/core/ui";

const LandingPage = lazy(() => import("@/pages/landing-page"))
const HomePage = lazy(() => import("@/pages/home-page"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<DefaultLayout />}>
                <Route path="" element={(
                    <Suspense fallback={<FullPageLoad />}>
                        <LandingPage />    
                    </Suspense>
                )}/>
                <Route path="garages" element={(
                    <Suspense fallback={<FullPageLoad />}>
                        <HomePage />    
                    </Suspense>
                )}/>
                <Route path="garages/:garageId" element={<GaragePage />} />
                <Route path="book" element={<BookPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route
                    path="garage-registration"
                    element={<GarageRegistrationPage />}
                />
            </Route>
            <Route
                path="garages/:garageId/management"
                element={<GarageLayout />}
            >
                <Route element={<GarageManagePage />}>
                    <Route path="" element={<GeneralDashboard />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:orderId" element={<OrdersDetail />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="staff" element={<StaffManagement />} />
                    <Route path="income" element={<IncomePage />} />
                </Route>
            </Route>
        </Route>,
    ),
);

export default router;
