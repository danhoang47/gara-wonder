import { ContainerProps, StylableProps } from "@/core/types";
import clsx from "clsx";

export type RegistrationSectionProps = ContainerProps &
    StylableProps & {
        header?: React.ReactNode;
        description?: React.ReactNode;
    };

export default function RegistrationSection({
    children,
    header,
    description,
    className,
}: RegistrationSectionProps) {
    return (
        <div className={clsx("col-start-4 col-span-4", className)}>
            <div className="mb-7">
                <h1 className="text-3xl font-semibold">{header}</h1>
                <p className="text-sm">{description}</p>
            </div>
            <div>
                <div className="mb-5">{children}</div>
            </div>
        </div>
    );
}
