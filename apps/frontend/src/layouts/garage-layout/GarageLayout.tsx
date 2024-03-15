import { Outlet } from "react-router-dom";

import { BrandLogo, Header } from "@/core/ui";

import { UserProfileMenu } from "../default-layout/ui";
import { GarageNavbar } from "./ui";

const GarageLayout = () => {
    return (
        <div
            data-testid={GarageLayout.name}
            className="h-full w-full flex flex-col "
        >
            <Header
                leftContent={<BrandLogo />}
                middleContent={<></>}
                rightContent={
                    <div className="flex gap-6">
                        <GarageNavbar />
                        <UserProfileMenu />
                    </div>
                }
            />
            <Outlet />
        </div>
    );
};

export default GarageLayout;
