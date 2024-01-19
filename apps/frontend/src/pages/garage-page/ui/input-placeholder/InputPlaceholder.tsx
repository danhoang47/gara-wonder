import { Input } from "@nextui-org/react";

type InputProps = {
    type: string;
    value?: string;
    placeholder: string;
    title: string;
    canEdit?: boolean;
    onClick: () => void;
};
function InputPlaceHolder({
    type,
    value,
    placeholder,
    title,
    canEdit = false,
    onClick,
}: InputProps) {
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
}

export default InputPlaceHolder;
