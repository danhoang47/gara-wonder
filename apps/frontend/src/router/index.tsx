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
import {
    ErrorPage,
    PaymentPage,
    ProductPage,
    ProductsPage,
    UserSettingsPage,
} from "@/pages";
import AccountPage from "@/pages/account-page";
import AdminLayout from "@/pages/admin/AdminPage";

const GarageRegistrationPage = lazy(
    () => import("@/pages/garage-registration-page"),
);
const SupplierRegistrationPage = lazy(
    () => import("@/pages/supplier-registration-page"),
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
const BillingHistory = lazy(
    () => import("@/pages/garage-manage-page/billing-history"),
);
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
const ProfileSettings = lazy(
    () => import("@/pages/account-page/profile-settings"),
);
const CarSettings = lazy(() => import("@/pages/account-page/car-settings"));
const PersonalBusiness = lazy(
    () => import("@/pages/account-page/personal-business"),
);
const AccountOrdersPage = lazy(
    () => import("@/pages/account-page/account-orders"),
);
const AccountOrderDetail = lazy(
    () => import("@/pages/account-page/order-detail"),
);
const DashBoard = lazy(() => import("@/pages/admin/GeneralDashboard"));
const GarageManagement = lazy(() => import("@/pages/admin/GarageManagement"));
const CustomerReport = lazy(() => import("@/pages/admin/CustomerReport"));
const GarageManageList = lazy(() => import("@/pages/admin/GarageManageList"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
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
                <Route
                    path="supplier-registration"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <SupplierRegistrationPage />
                        </Suspense>
                    }
                />
                <Route path="products" element={<ProductsPage />} />
                <Route path="user-settings" element={<UserSettingsPage />} />
                <Route path="account" element={<AccountPage />}>
                    <Route
                        path=""
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <AccountSettingsPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <ProfileSettings />
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
                        path="cars"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <CarSettings />
                            </Suspense>
                        }
                    />
                    <Route
                        path="business"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <PersonalBusiness />
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
                <Route path="payment" element={<PaymentPage />} />
                <Route path="products/:productId" element={<ProductPage />} />
            </Route>
            <Route
                path="garages/management"
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
                    <Route
                        path="billing-history"
                        element={
                            <Suspense fallback={<FullPageLoad />}>
                                <BillingHistory />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
            <Route path="admin" element={<AdminLayout />}>
                <Route
                    path="dashboard"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <DashBoard />
                        </Suspense>
                    }
                />
                <Route
                    path="garage-management"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <GarageManageList />
                        </Suspense>
                    }
                />
                <Route
                    path="garage-management/:garageId"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <GarageManagement />
                        </Suspense>
                    }
                />
                <Route
                    path="report"
                    element={
                        <Suspense fallback={<FullPageLoad />}>
                            <CustomerReport />
                        </Suspense>
                    }
                />
            </Route>
        </Route>,
    ),
);

export default router;
