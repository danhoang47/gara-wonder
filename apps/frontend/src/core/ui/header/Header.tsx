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

    return (
        <div
            className={clsx(
                "sticky top-0 z-20 shrink-0 bg-white",
                isLandingPage || "border-b-1",
            )}
        >
            <div
                className={clsx(
                    "h-20 flex gap-4",
                    className,
                    location.pathname.includes("garage/") ||
                        location.pathname.includes("garage-management/")
                        ? "container mx-auto"
                        : " px-10",
                )}
            >
                <div className="flex items-center justify-start h-full">
                    {leftContent}
                </div>
                <div className="flex items-center justify-center h-full">
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
