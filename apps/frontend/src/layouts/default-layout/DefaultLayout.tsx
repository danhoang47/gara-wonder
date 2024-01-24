import { Outlet, useLocation } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";
import { BecomeGaraOwnerLink, UserProfileMenu, GaraSearch } from "./ui";

const DefaultLayout = () => {
    const location = useLocation()
    const shouldShowMiddleContent = location.pathname === '/'

    return (
        <div data-testid={DefaultLayout.name} >
            <Header
                leftContent={<BrandLogo />}
                middleContent={shouldShowMiddleContent && <GaraSearch />}
                rightContent={
                    <>
                        <BecomeGaraOwnerLink />
                        <UserProfileMenu />
                    </>
                }
            />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
