import { StylableProps } from "@/core/types";
import clsx from "clsx";

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
    return (
        <div
            className={clsx(
                "h-20 flex justify-between px-10 gap-2 border-b-1 sticky top-0 bg-white z-10",
                className,
            )}
        >
            <div className="flex items-center justify-start flex-1 h-full">
                {leftContent}
            </div>
            <div className="flex items-center justify-center flex-1 h-full">
                {middleContent}
            </div>
            <div className="flex items-center justify-end  flex-1 h-full gap-2">
                {rightContent}
            </div>
        </div>
    );
}

export default Header;
