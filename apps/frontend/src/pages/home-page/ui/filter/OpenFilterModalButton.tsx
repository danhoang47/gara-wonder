import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button } from "@nextui-org/react";

export type OpenFilterButtonProps = {
    numberOfActiveFilters?: number;
    onPress: () => void;
};

export default function OpenFilterButton({
    numberOfActiveFilters,
    onPress,
}: OpenFilterButtonProps) {
    return (
        <Badge
            content={numberOfActiveFilters}
            color="default"
            variant="faded"
            showOutline={false}
        >
            <Button
                variant="bordered"
                color="default"
                className="border-black border"
                onPress={onPress}
            >
                <FontAwesomeIcon icon={faSliders} />
                <span>Filter</span>
            </Button>
        </Badge>
    );
}
