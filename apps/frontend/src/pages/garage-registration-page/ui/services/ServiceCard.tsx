import { Service } from "@/core/types";
import { Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

export type ServiceCardProps = {
    service: Partial<Service>;
    categoryName?: string,
    supportedBrands?: string,
    onEditServiceButtonPress: (id: string | undefined) => void;
    onRemoveServiceButtonPress: (service: Partial<Service> | undefined) => void;
};

export default function ServiceCard({
    service,
    categoryName,
    supportedBrands,
    onEditServiceButtonPress,
    onRemoveServiceButtonPress,
}: ServiceCardProps) {
    return (
        <div
            className="flex items-center mb-3 border rounded-xl p-4"
            key={service._id}
        >
            <div>
                <h3 className="font-medium">
                    {categoryName}
                </h3>
                <p className="text-sm">
                    Hãng xe được hỗ trợ: {supportedBrands}
                </p>
            </div>
            <div className="ml-auto flex gap-2">
                <Tooltip content="Edit">
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        onPress={() => onEditServiceButtonPress(service?._id)}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                </Tooltip>
                <Tooltip content="Remove">
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        onPress={() => onRemoveServiceButtonPress(service)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}
