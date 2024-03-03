import { memo } from "react" 
import clsx from "clsx";
import { ContainerProps } from "@/core/types";

export type CalendarCellProps = ContainerProps & {
    date: Date;
    disabled?: boolean;
    onClick?: (date: Date) => void;
    classNames?: Partial<Record<"base" | "wrapper" | "text", string>>;
};

function CalendarCell({
    date,
    disabled,
    onClick,
    children,
    classNames,
}: CalendarCellProps) {
    return (
        <div
            key={date.getTime()}
            className={clsx(
                "basis-[calc(100%/7)] square w-full after:pb-[100%] after:block",
                classNames?.base,
            )}
            onClick={() => {
                if (disabled) {
                    return;
                }

                onClick && onClick(date);
            }}
        >
            <div
                className={clsx(
                    "absolute inset-0 text-center flex items-center justify-center",
                    classNames?.wrapper,
                )}
            >
                {children || (
                    <p className={clsx(classNames?.text)}>{date.getDate()}</p>
                )}
            </div>
        </div>
    );
}

export default memo(CalendarCell);
