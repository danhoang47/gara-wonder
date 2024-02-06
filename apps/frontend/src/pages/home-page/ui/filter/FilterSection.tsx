export type FilterSectionProps = {
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
};

export default function FilterSection({
    title,
    description,
    children,
}: FilterSectionProps) {
    return (
        <div className="pb-8 border-b">
            <div className="mb-5">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-zinc text-sm">{description}</p>
            </div>
            {children}
        </div>
    );
}
