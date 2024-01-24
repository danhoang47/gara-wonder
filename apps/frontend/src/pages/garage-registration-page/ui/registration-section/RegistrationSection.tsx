
export type RegistrationSectionProps = {
    children?: React.ReactNode,
    header?: React.ReactNode,
    heading?: string,
    description?: string
}

export default function RegistrationSection({ children, header, heading, description }: RegistrationSectionProps) {


    return (
        <div className="col-start-4 col-span-4">
            <div className="mb-7">
                <h1 className="text-3xl font-semibold">{heading}</h1>
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