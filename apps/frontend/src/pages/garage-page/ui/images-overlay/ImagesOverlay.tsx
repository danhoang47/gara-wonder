import { Image } from "@/core/types";
import clsx from "clsx";

function ImagesOverlay({
    isOpen,
    imageRef,
    closeGallery,
}: {
    isOpen: boolean;
    imageRef?: Image["_id"];
    closeGallery: () => void;
}) {
    return (
        <div
            className={clsx(
                "absolute z-50 bg-gray-400 min-w-full min-h-full inset-0",
                isOpen ? "block" : "hidden",
            )}
        >
            heloo
        </div>
    );
}

export default ImagesOverlay;
