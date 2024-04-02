/* eslint-disable react-refresh/only-export-components */
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import App from "@/App";
import { DefaultLayout, GarageLayout } from "@/layouts";
import { lazy, Suspense } from "react";
import { FullPageLoad } from "@/core/ui";
import { ProductsPage, UserSettingsPage } from "@/pages";
import AccountPage from "@/pages/account-page";

const GarageRegistrationPage = lazy(
    () => import("@/pages/garage-registration-page"),
);
const GaragePage = lazy(() => import("@/pages/garage-page"));
const BookPage = lazy(() => import("@/pages/book-page"));
const GarageManagePage = lazy(() => import("@/pages/garage-manage-page"));
const GeneralDashboard = lazy(
    () => import("@/pages/garage-manage-page/general-dashboard"),
);
const OrderAcceptModeSetting = lazy(
    () => import("@/pages/garage-manage-page/order-accept-mode-setting"),
);
const RefundRuleSetting = lazy(
    () => import("@/pages/garage-manage-page/refund-rule-setting"),
);
const ServicesSetting = lazy(
    () => import("@/pages/garage-manage-page/services-setting"),
);
const CertificateSetting = lazy(
    () => import("@/pages/garage-manage-page/certificate-settings"),
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
const ChatPage = lazy(() => import("@/pages/chat-page"));
const ChatPageWrapper = lazy(() => import("@/pages/chat-page/ChatPageWrapper"));
const AccountSettingsPage = lazy(
    () => import("@/pages/account-page/account-settings"),
);
const AccountOrdersPage = lazy(
    () => import("@/pages/account-page/account-orders"),
);
const AccountOrderDetail = lazy(
    () => import("@/pages/account-page/order-detail"),
);

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
                <Route path="products" element={<ProductsPage />} />
                <Route
                    path="garages/:garageId"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <GaragePage />
                        </Suspense>
                    }
                />
                <Route
                    path="book"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <BookPage />
                        </Suspense>
                    }
                />
                <Route
                    path="cart"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <CartPage />
                        </Suspense>
                    }
                />
                <Route
                    path="garage-registration"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <GarageRegistrationPage />
                        </Suspense>
                    }
                />
                <Route path="products" element={<ProductsPage />} />
                <Route path="user-settings" element={<UserSettingsPage />} />
                <Route path="account" element={<AccountPage />}>
                    <Route
                        path="settings"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <AccountSettingsPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <AccountOrdersPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="orders/:orderId"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <AccountOrderDetail />
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path="chat"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <ChatPageWrapper />
                        </Suspense>
                    }
                >
                    <Route path=":roomId" element={<ChatPage />}></Route>
                </Route>
            </Route>
            <Route
                path="garages/:garageId/management"
                element={<GarageLayout />}
            >
                <Route
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <GarageManagePage />
                        </Suspense>
                    }
                >
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <GeneralDashboard />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/order"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <OrderAcceptModeSetting />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/services"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <ServicesSetting />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/certificate"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <CertificateSetting />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting/refund"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <RefundRuleSetting />
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
