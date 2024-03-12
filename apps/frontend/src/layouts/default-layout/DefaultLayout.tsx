import { useMemo } from "react";
import { Outlet } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";
import { BecomeGaraOwnerLink, UserProfileMenu } from "./ui";
import { useAppSelector } from "@/core/hooks";
import { Role } from "@/core/types";
import CartLinkButton from "./ui/cart-link-button";
import Notifications from "@/features/notifications";

const DefaultLayout = () => {
    const user = useAppSelector((state) => state.user.value);
    const shouldShowGarageRegistrationLink = useMemo(() => {
        if (!user) return true;

        const { role } = user;

        return role !== Role.GarageOwner;
    }, [user]);

    return (
        <div data-testid={DefaultLayout.name} className="h-full flex flex-col">
            <Header
                leftContent={<BrandLogo />}
                middleContent={<></>}
                rightContent={
                    <>
                        {shouldShowGarageRegistrationLink && (
                            <BecomeGaraOwnerLink />
                        )}
                        <Notifications />
                        <CartLinkButton />
                        <UserProfileMenu />
                    </>
                }
            />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
