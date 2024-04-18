import { Button } from "@nextui-org/react";
import clsx from "clsx";

const TAGS = [
    "Sản phẩm chất lượng",
    "Sản phẩm giá tốt",
    "Đúng hẹn",
    "Phản hồi tin nhắn nhanh",
    "Chăm sóc khách hàng tốt",
];

export type TagSelectProps = {
    selectedTags?: string[];
    onTagSelect: (tag: string) => void;
};

function TagSelect({ selectedTags, onTagSelect }: TagSelectProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
                <Button
                    key={tag}
                    radius="full"
                    variant="bordered"
                    size="sm"
                    disableRipple
                    onPress={() => onTagSelect(tag)}
                    className={clsx(
                        "border",
                        selectedTags?.includes(tag) && "border-foreground",
                    )}
                >
                    <span className="font-medium">{tag}</span>
                </Button>
            ))}
        </div>
    );
}

export default TagSelect;
