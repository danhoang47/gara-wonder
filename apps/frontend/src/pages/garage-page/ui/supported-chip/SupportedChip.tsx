import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@nextui-org/react";
import clsx from "clsx";

function SupportedChip({ isSupport }: { isSupport: boolean }) {
    return (
        <Chip
            className={clsx(
                "w-6 h-6 flex justify-center items-center  rounded-full scale-75",
                isSupport ? "bg-primary" : "bg-red-500",
            )}
        >
            <FontAwesomeIcon
                icon={isSupport ? faCheck : faX}
                size="sm"
                className="text-white"
            />
        </Chip>
    );
}

export default SupportedChip;
