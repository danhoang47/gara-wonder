import { Input, Select, SelectItem } from "@nextui-org/react";

export const datas = [
    {
        label: "Cat",
        value: "cat",
        description: "The second most popular pet in the world",
    },
    {
        label: "Dog",
        value: "dog",
        description: "The most popular pet in the world",
    },
    {
        label: "Elephant",
        value: "elephant",
        description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
        label: "Giraffe",
        value: "giraffe",
        description: "The tallest land animal",
    },
];
type InputProps = {
    type: string;
    value?: string;
    placeholder: string;
    title: string;
    canEdit?: boolean;
    onClick: () => void;
};
function SelectInput({
    type,
    value,
    placeholder,
    title,
    canEdit = false,
    onClick,
}: InputProps) {
    if (type == "date")
        return (
            <Input
                isReadOnly={!canEdit}
                type={type}
                label={title}
                variant="bordered"
                value={value}
                placeholder={placeholder}
                onClick={onClick}
                classNames={{
                    inputWrapper: "cursor-pointer",
                    input: "cursor-pointer",
                }}
                color="primary"
            />
        );

    return (
        <Select
            items={datas}
            label={title}
            placeholder={placeholder}
            className=""
            variant="bordered"
            color="primary"
            classNames={{
                label: "text-primary",
            }}
        >
            {(data) => (
                <SelectItem key={data.value} value={data.value}>
                    {data.label}
                </SelectItem>
            )}
        </Select>
    );
}

export default SelectInput;
