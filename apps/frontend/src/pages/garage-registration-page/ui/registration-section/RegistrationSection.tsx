import { ContainerProps, StylableProps } from "@/core/types"
import clsx from "clsx"
import "./RegistrationSection.styles.scss"

export type RegistrationSectionProps = ContainerProps & StylableProps & {
    header?: React.ReactNode,
    description?: React.ReactNode
}

export default function RegistrationSection({ children, header, description, className }: RegistrationSectionProps) {


    return (
        <div className={clsx("registrationSection", className)}>
            <div className="mb-7">
                <h1 className="text-[28px] font-bold">{header}</h1>
                <p className="text-sm">
                    {description}
                </p>
            </div>
            <div >
                <div className="mb-5">
                    {children}
                </div>
            </div>
        </div>
    )
}