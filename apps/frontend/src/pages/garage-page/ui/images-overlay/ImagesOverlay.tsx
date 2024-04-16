import { Image } from "@/core/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect } from "react";
import "./imges-overlay.scss";

function ImagesOverlay({
    images,
    isOpen,
    imageRef,
    closeGallery,
}: {
    images?: Image[];
    isOpen: boolean;
    imageRef?: Image["_id"];
    closeGallery: () => void;
}) {
    useEffect(() => {
        if (imageRef != "") {
            const element = document.getElementById(imageRef as string);
            element?.scrollIntoView();
        }
    }, [imageRef, isOpen]);
    return (
        <div
            className={clsx(
                "absolute container z-50 bg-background min-w-full h-screen inset-0 overflow-y-scroll",
                isOpen ? "block" : "hidden",
            )}
        >
            <div className="container mx-auto sticky flex justify-between items-center bg-background top-0 py-4">
                <div
                    className="h-10 flex justify-center items-center  w-10 rounded-full hover:bg-gray-300 transition-background cursor-pointer"
                    onClick={closeGallery}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
            </div>
            <div className="grid-wraper mx-auto w-1/2 h-full">
                {images?.map((img: Image, index) => (
                    <div className="grid-element" key={index} id={img._id}>
                        <img src={img.url} alt="" className="w-full h-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImagesOverlay;
