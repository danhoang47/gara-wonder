import clsx from "clsx";

export type FilterSectionProps = {
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    classNames?: {
        title?: string,
        description?: string,
        contentWrapper?: string 
    }
};

export default function FilterSection({
    title,
    description,
    children,
    classNames
}: FilterSectionProps) {
    return (
        <div className="pb-8 border-b last:border-none">
            <div className="mb-5">
                <h3 className={clsx("text-xl font-bold", classNames?.title)}>{title}</h3>
                <p className={clsx("text-zinc text-sm", classNames?.description)}>{description}</p>
            </div>
            <div className={clsx("flex", classNames?.contentWrapper)}>
                {children}
            </div>
        </div>
    );
}
