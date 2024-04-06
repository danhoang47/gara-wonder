import { SignInTrigger, SignOutTrigger } from "@/features/user";
import { Link } from "@nextui-org/react";

type MenuItem = {
    key: string;
    component?: React.ReactNode;
    title: string;
};

const getUserProfileMenu = (
    isLogin: boolean,
    isGarageOwner: boolean,
    isSupplier: boolean,
    garageId?: string,
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
                    {
                        key: "k2",
                        component: <p>Đăng kí</p>,
                        title: "Register",
                    },
                ],
            },
            {
                options: [
                    {
                        key: "k4",
                        component: <p>Giúp đỡ</p>,
                        title: "Help Center",
                    },
                ],
            },
        );
    }

    if (isGarageOwner) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            href={`/garages/${garageId}/management`}
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
    if (isSupplier) {
        menuItems.push({
            options: [
                {
                    key: "k1",
                    component: (
                        <Link
                            href={`/products/${garageId}/management`}
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
    if (!isGarageOwner) {
        menuItems.push({
            options: [
                {
                    key: "k3",
                    component: <p>Trở thành chủ khách sạn</p>,
                    title: "Become Garage Owner",
                },
            ],
        });
    }

    if (!isSupplier) {
        menuItems.push({
            options: [
                {
                    key: "k3",
                    component: <p>Trở thành nhà cung cấp</p>,
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
                            href={`/account/settings`}
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
