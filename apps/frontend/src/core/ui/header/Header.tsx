import { StylableProps } from "@/core/types";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

export type HeaderProps = StylableProps & {
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    middleContent?: React.ReactNode;
};

function Header({
    leftContent,
    rightContent,
    middleContent,
    className,
}: HeaderProps) {
    const location = useLocation();
    const isLandingPage = location.pathname === "/";
    const isGaragePage = location.pathname.includes("/garages/");
    const isGarageManagementPage = location.pathname.includes("/management")

    return (
        <div
            className={clsx(
                "sticky top-0 z-20 shrink-0 bg-white",
                isLandingPage || "border-b-1",
            )}
        >
            <div
                className={clsx(
                    "h-20 flex justify-between gap-2 relative px-10",
                    className,
                    isGaragePage && "w-full max-w-[1024px] mx-auto px-unit-0",
                    isGarageManagementPage && "max-w-full"
                )}
            >
                <div className="flex items-center justify-start h-full">
                    {leftContent}
                </div>
                <div className="flex items-center justify-center h-full absolute left-1/2 -translate-x-1/2">
                    {middleContent}
                </div>
                <div className="flex items-center justify-end h-full gap-1 ml-auto">
                    {rightContent}
                </div>
            </div>
        </div>
    );
}

export default Header;
