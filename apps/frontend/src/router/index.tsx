import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "@/App";
import { DefaultLayout, GarageLayout } from "@/layouts";
import { lazy, Suspense } from "react";
import { FullPageLoad } from "@/core/ui";

const GarageRegistrationPage = lazy(
    () => import("@/pages/garage-registration-page"),
);
const GaragePage = lazy(() => import("@/pages/garage-page"));

const BookPage = lazy(() => import("@/pages/book-page"));

const GarageManagePage = lazy(() => import("@/pages/garage-manage-page"));

const GeneralDashboard = lazy(
    () => import("@/pages/garage-manage-page/general-dashboard"),
);

const CartPage = lazy(() => import("@/pages/cart-page"));

const OrdersDetail = lazy(
    () => import("@/pages/garage-manage-page/order-detail"),
);
const Schedule = lazy(() => import("@/pages/garage-manage-page/schedule"));
const OrdersPage = lazy(() => import("@/pages/garage-manage-page/orders-page"));
const StaffManagement = lazy(
    () => import("@/pages/garage-manage-page/staff-management"),
);
const IncomePage = lazy(() => import("@/pages/garage-manage-page/income"));
const LandingPage = lazy(() => import("@/pages/landing-page"));
const HomePage = lazy(() => import("@/pages/home-page"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route element={<DefaultLayout />}>
                <Route
                    path=""
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <LandingPage />
                        </Suspense>
                    }
                />
                <Route
                    path="garages"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <HomePage />
                        </Suspense>
                    }
                />
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
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <GeneralDashboard />
                            </Suspense>
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <OrdersPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="orders/:orderId"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <OrdersDetail />
                            </Suspense>
                        }
                    />
                    <Route
                        path="schedule"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <Schedule />
                            </Suspense>
                        }
                    />
                    <Route
                        path="staff"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <StaffManagement />
                            </Suspense>
                        }
                    />
                    <Route
                        path="income"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <IncomePage />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Route>,
    ),
);

export default router;
