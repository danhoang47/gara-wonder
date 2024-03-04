import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import clsx from "clsx";

export type DateNavigationProps = {
    classNames?: string,
    onNextPress?: () => void,
    onBackPress?: () => void;
}

function DateNavigation({
    classNames,
    onBackPress,
    onNextPress
}: DateNavigationProps) {
    return (
        <>
            <Button
                isIconOnly
                radius="full"
                disableAnimation
                size="sm"
                className={clsx(
                    "absolute left-2 bg-background",
                    classNames,
                )}
                onPress={onBackPress}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button
                isIconOnly
                radius="full"
                disableAnimation
                size="sm"
                className={clsx(
                    "absolute right-2 bg-background",
                    classNames,
                )}
                onPress={onNextPress}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </Button>
        </>
    );
}

export default DateNavigation;
