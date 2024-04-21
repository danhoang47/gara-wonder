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
): Array<Record<"options", MenuItem[]>> => {
    const menuItems = [];

    if (!isLogin) {
        menuItems.push(
            {
                options: [
                    {
                        key: "k1",
                        component: <SignInTrigger />,
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
                                className="text-foreground text-small"
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
                                className="text-foreground text-small"
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
                        component: <p>Giúp đỡ</p>,
                        title: "Help Center",
                    },
                ],
            },
        );
    }

    if (garageId) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            to={`/garages/${garageId}/management`}
                            className="text-foreground text-small"
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
                            className="text-foreground text-small"
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
                            className="text-foreground text-small"
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
                            className="text-foreground text-small"
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
                            className="text-foreground text-small"
                        >
                            Cài đặt tài khoản
                        </Link>
                    ),
                    title: "Accounnt settings",
                },
                {
                    key: "k2",
                    component: <SignOutTrigger />,
                    title: "Sign out",
                },
            ],
        });
    }

    return menuItems;
};

export default getUserProfileMenu;
