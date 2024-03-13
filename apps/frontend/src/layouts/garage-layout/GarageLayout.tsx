import { Outlet } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";

import { UserProfileMenu } from "../default-layout/ui";
import { GarageNavbar } from "./ui";

const GarageLayout = () => {
    return (
        <div
            data-testid={GarageLayout.name}
            className="h-full w-full flex flex-col overflow-hidden"
        >
            <Header
                leftContent={<BrandLogo />}
                middleContent={<GarageNavbar />}
                rightContent={<UserProfileMenu />}
            />
            <Outlet />
        </div>
    );
};

export default GarageLayout;
