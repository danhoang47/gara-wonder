import { VisuallyHidden, cn, useCheckbox } from "@nextui-org/react";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomSelect(props: any) {
    const { Component, children, isSelected, getBaseProps, getInputProps } =
        useCheckbox({
            ...props,
        });

    return (
        <Component className={cn("w-10")} {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                className={clsx(
                    "flex justify-between w-full items-center p-4 gap-5 border-2  rounded-xl transition-background",
                    isSelected
                        ? props.variant === "danger"
                            ? "border-red-400 "
                            : "border-primary-400 hover:bg-default-200"
                        : "border-default-200 hover:bg-default-200",
                )}
            >
                <div className="max-w-[25rem]">{children}</div>
                <div
                    className={clsx(
                        "flex justify-center  items-center w-6 h-6 rounded-full border-2 transition-colors shrink-0",
                        isSelected
                            ? props.variant === "danger"
                                ? "border-red-400 "
                                : "border-primary-400 hover:bg-default-200"
                            : "border-default-400 ",
                    )}
                >
                    <div
                        className={clsx(
                            "w-3 h-3 rounded-full shrink-0 grow-0 transition-background",
                            isSelected
                                ? props.variant === "danger"
                                    ? "bg-red-400"
                                    : "bg-primary-400"
                                : "",
                        )}
                    ></div>
                </div>
            </div>
        </Component>
    );
}
