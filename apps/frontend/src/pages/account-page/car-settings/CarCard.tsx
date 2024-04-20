import { PersonalCar } from "@/core/types";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";

export type CarCardProps = {
    car: Partial<PersonalCar>;
    onRemove: () => void;
    onUpdate: () => void;
    isDisabled?: boolean;
};

function CarCard({
    car,
    onRemove,
    onUpdate,
    isDisabled = false,
}: CarCardProps) {
    return (
        <div
            className="flex items-center bg-background p-4 rounded-large border shadow focus:outline-2 outline-offset-1"
            tabIndex={0}
        >
            <p className="font-semibold text-small">{car.memo}</p>
            <div className="ml-auto flex gap-2">
                <Tooltip content="Chỉnh sửa">
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        className="border hover:border-black"
                        size="sm"
                        isDisabled={isDisabled}
                        disableRipple
                        onPress={onUpdate}
                    >
                        <FontAwesomeIcon
                            icon={faPen}
                            className="text-default-500 hover:text-foreground"
                        />
                    </Button>
                </Tooltip>
                <Tooltip content="Xóa">
                    <Button
                        isIconOnly
                        radius="full"
                        variant="bordered"
                        className="border hover:border-black"
                        size="sm"
                        isDisabled={isDisabled}
                        disableRipple
                        onPress={onRemove}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-default-500 hover:text-foreground"
                        />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

export default CarCard;
