import { useAppSelector } from "@/core/hooks";
import { selectNumberOfActiveFilterSection } from "@/features/garage-filter/filter.slice";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button } from "@nextui-org/react";

export type OpenFilterButtonProps = {
    onPress: () => void;
};

export default function OpenFilterButton({
    onPress,
}: OpenFilterButtonProps) {
    const numberOfActiveFilterSection = useAppSelector(
        (state) => selectNumberOfActiveFilterSection(state.filter)
    )

    return (
        <Badge
            content={numberOfActiveFilterSection || undefined}
            color="default"
            variant="faded"
            showOutline={false}
        >
            <Button
                variant="bordered"
                color="default"
                className="border"
                radius="full"
                onPress={onPress}
            >
                <FontAwesomeIcon icon={faSliders} />
                <span className="font-medium">Bộ lọc</span>
            </Button>
        </Badge>
    );
}
