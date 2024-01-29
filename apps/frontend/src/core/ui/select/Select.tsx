import { Select as SelectField } from "@nextui-org/react";

export type SelectProps<T> = React.ComponentProps<typeof SelectField<T>> & {
    onValueChange: (keys: string | "all") => void;
    altOnValueChange?: (keys: string | "all") => void;
};

function Select<T>({
    errorMessage,
    children,
    onValueChange,
    altOnValueChange,
    items,
    ...props
}: SelectProps<T>) {
    return (
        <SelectField
            {...props}
            items={items}
            isInvalid={Boolean(errorMessage)}
            errorMessage={errorMessage}
            onSelectionChange={(keys) => {
                if (items) {
                    const selectedKeys =
                        keys === "all" ? "all" : Array.from(keys).join(",");
                    onValueChange(selectedKeys);
                    altOnValueChange && altOnValueChange(selectedKeys)
                }
            }}
        >
            {children}
        </SelectField>
    );
}

export default Select;
