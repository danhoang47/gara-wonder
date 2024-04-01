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
                        component: <p>Register</p>,
                        title: "Register",
                    },
                ],
            },
            {
                options: [
                    {
                        key: "k3",
                        component: <p>Become Garage Owner</p>,
                        title: "Become Garage Owner",
                    },
                    {
                        key: "k4",
                        component: <p>Help Center</p>,
                        title: "Help Center",
                    },
                ],
            },
        );
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

    return menuItems;
};

export default getUserProfileMenu;
