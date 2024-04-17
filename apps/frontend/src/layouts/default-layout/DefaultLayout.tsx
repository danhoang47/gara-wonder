import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";
import {
    BecomeGaraOwnerLink,
    ChatLinkButton,
    RegionTabs,
    UserProfileMenu,
    CartLinkButton,
    MobileNavigation
} from "./ui";
import { useAppSelector } from "@/core/hooks";
import { Role } from "@/core/types";
import Notifications from "@/features/notifications";
import clsx from "clsx";

const registrationRegex = new RegExp(/^\/[\w]+-registration$/)

const DefaultLayout = () => {
    const user = useAppSelector((state) => state.user.value);
    const location = useLocation();
    console.log(location)
    const isRegistrationPage = useMemo(() => registrationRegex.test(location.pathname), [location])
    const shouldShowGarageRegistrationLink = useMemo(() => {
        if (!user) return true;

        const { role } = user;

        return role !== Role.GarageOwner;
    }, [user]);
    const shouldShowSupplierRegistrationLink = useMemo(() => {
        if (!user) return true;

        const { role } = user;

        return role !== Role.Supplier;
    }, [user]);
    const shouldShowMiddleContent = useMemo(() => {
        return (
            location.pathname.includes("/garages") ||
            location.pathname.includes("/products")
        );
    }, [location]);

    return (
        <div data-testid={DefaultLayout.name} className="flex flex-col min-h-full">
            <Header
                leftContent={<BrandLogo />}
                middleContent={shouldShowMiddleContent && <RegionTabs />}
                rightContent={
                    <>
                        {shouldShowGarageRegistrationLink &&
                            location.pathname.includes("/garages") && (
                                <BecomeGaraOwnerLink />
                            )}
                        {shouldShowSupplierRegistrationLink &&
                            location.pathname.includes("/products") && (
                                <BecomeGaraOwnerLink />
                            )}
                        <Notifications />
                        <ChatLinkButton />
                        <CartLinkButton />
                        <UserProfileMenu />
                    </>
                }
            />
            <div className={clsx("flex-grow", isRegistrationPage && "z-30")}>
                <Outlet />
            </div>
            <MobileNavigation />
        </div>
    );
};

export default DefaultLayout;
