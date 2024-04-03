import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";
import {
    BecomeGaraOwnerLink,
    ChatLinkButton,
    RegionTabs,
    UserProfileMenu,
    CartLinkButton,
} from "./ui";
import { useAppSelector } from "@/core/hooks";
import { Role } from "@/core/types";
import Notifications from "@/features/notifications";

const DefaultLayout = () => {
    const user = useAppSelector((state) => state.user.value);
    const location = useLocation();
    const shouldShowGarageRegistrationLink = useMemo(() => {
        if (!user) return true;

        const { role } = user;

        return role !== Role.GarageOwner;
    }, [user]);
    const shouldShowMiddleContent = useMemo(() => {
        return (
            location.pathname.includes("/garages") ||
            location.pathname.includes("/products")
        );
    }, [location]);

    return (
        <div data-testid={DefaultLayout.name} className="flex flex-col">
            <Header
                leftContent={<BrandLogo />}
                middleContent={shouldShowMiddleContent && <RegionTabs />}
                rightContent={
                    <>
                        {shouldShowGarageRegistrationLink && (
                            <BecomeGaraOwnerLink />
                        )}
                        <Notifications />
                        <ChatLinkButton />
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
