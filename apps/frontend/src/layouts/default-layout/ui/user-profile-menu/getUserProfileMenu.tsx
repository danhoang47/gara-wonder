import { SignInTrigger, SignOutTrigger } from "@/features/user";
import { Link } from "react-router-dom";

type MenuItem = {
    key: string;
    component?: React.ReactNode;
    title: string;
};

const getUserProfileMenu = (
    isLogin: boolean,
    openMenu: () => void,
    garageId?: string,
    supplierId?: string,
    isAdmin?: boolean,
): Array<Record<"options", MenuItem[]>> => {
    const menuItems = [];

    if (!isLogin) {
        menuItems.push(
            {
                options: [
                    {
                        key: "k1",
                        component: (
                            <SignInTrigger className="py-2 px-3 w-full block" />
                        ),
                        title: "Sign in",
                    },
                ],
            },
            {
                options: [
                    {
                        key: "k4",
                        component: (
                            <Link
                                to={`supplier-registration`}
                                className="text-foreground text-small py-2 px-3 w-full block"
                                onClick={(e) => {
                                    if (!isLogin) {
                                        openMenu();
                                        e.preventDefault();
                                        return;
                                    }
                                }}
                            >
                                Trở thành nhà cung cấp
                            </Link>
                        ),
                        title: "Become Garage Owner",
                    },
                    {
                        key: "k3",
                        component: (
                            <Link
                                to="/garage-registration"
                                className="text-foreground text-small py-2 px-3 w-full block"
                                onClick={(e) => {
                                    if (!isLogin) {
                                        openMenu();
                                        e.preventDefault();
                                        return;
                                    }
                                }}
                            >
                                Trở thành chủ Garage
                            </Link>
                        ),
                        title: "Become Garage Owner",
                    },
                    {
                        key: "k5",
                        component: (
                            <p className="py-2 px-3 w-full block">Giúp đỡ</p>
                        ),
                        title: "Help Center",
                    },
                ],
            },
        );
    }
    if (isAdmin) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            to={`/admin/dashboard`}
                            className="text-foreground text-small py-2 px-3 w-full block"
                        >
                            Quản lý Admin
                        </Link>
                    ),
                    title: "Page Admin",
                },
            ],
        });
    }
    if (garageId) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            to={`/garages/management`}
                            className="text-foreground text-small py-2 px-3 w-full block"
                        >
                            Quản lý Garage
                        </Link>
                    ),
                    title: "Garage Management",
                },
            ],
        });
    }
    if (supplierId) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            to={`/products/${garageId}/management`}
                            className="text-foreground text-small py-2 px-3 w-full block"
                        >
                            Quản lý Kho hàng
                        </Link>
                    ),
                    title: "Supplier Management",
                },
            ],
        });
    }
    if (!garageId && isLogin) {
        menuItems.push({
            options: [
                {
                    key: "k3",
                    component: (
                        <Link
                            to={`garage-registration`}
                            className="text-foreground text-small py-2 px-3 w-full block"
                            onClick={(e) => {
                                if (!isLogin) {
                                    openMenu();
                                    e.preventDefault();
                                    return;
                                }
                            }}
                        >
                            Trở thành chủ Garage
                        </Link>
                    ),
                    title: "Become Garage Owner",
                },
            ],
        });
    }

    if (!supplierId && isLogin) {
        menuItems.push({
            options: [
                {
                    key: "k3",
                    component: (
                        <Link
                            to={`supplier-registration`}
                            className="text-foreground text-small py-2 px-3 w-full block"
                            onClick={(e) => {
                                if (!isLogin) {
                                    openMenu();
                                    e.preventDefault();
                                    return;
                                }
                            }}
                        >
                            Trở thành nhà cung cấp
                        </Link>
                    ),
                    title: "Become Garage Owner",
                },
            ],
        });
    }
    if (isLogin) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            to={`/account`}
                            className="text-foreground text-small py-2 px-3 w-full block"
                        >
                            Cài đặt tài khoản
                        </Link>
                    ),
                    title: "Accounnt settings",
                },
                {
                    key: "k2",
                    component: <SignOutTrigger className="py-2 px-3 w-full" />,
                    title: "Sign out",
                },
            ],
        });
    }

    return menuItems;
};

export default getUserProfileMenu;
