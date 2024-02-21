import { Outlet, useLocation } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";
import { BecomeGaraOwnerLink, UserProfileMenu, GaraSearch } from "./ui";
import { useAppSelector } from "@/core/hooks";
import { Role } from "@/core/types";
import { useMemo } from "react";

const DefaultLayout = () => {
    const location = useLocation()
    const shouldShowMiddleContent = location.pathname === '/'
    const user = useAppSelector(state => state.user.value)
    const shouldShowGarageRegistrationLink = useMemo(() => {
        if (!user) return true;
        
        const { role } = user;
        
        return role !== Role.GarageOwner
    }, [user])

    return (
        <div data-testid={DefaultLayout.name} className="h-full flex flex-col">
            <Header
                leftContent={<BrandLogo />}
                middleContent={shouldShowMiddleContent && <GaraSearch />}
                rightContent={
                    <>
                        {shouldShowGarageRegistrationLink && <BecomeGaraOwnerLink /> }
                        <UserProfileMenu />
                    </>
                }
            />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
