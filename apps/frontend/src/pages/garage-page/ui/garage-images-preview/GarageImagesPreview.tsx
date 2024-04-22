import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import { Image } from "@/core/types";
import { ImagesOverlay, OpenImagesButton } from "..";
import ImagesSkeleton from "./images-skeleton";
import { getGarageImages } from "@/api";

function GarageImagesPreview({ backgroundImage }: { backgroundImage?: Image }) {
    const { garageId } = useParams();

    const [refImage, setRefImage] = useState<Image["_id"] | undefined>("");
    const [previewImage, setPreviewImage] = useState<boolean>(false);

    const { isLoading: isImageLoading, data: images } = useSWRImmutable(
        `images/${garageId}`,
        getGarageImages,
    );

    useEffect(() => {
        const root = document.getElementById("root")!;

        if (previewImage) {
            root.classList.add("overflow-hidden");
        } else {
            root.classList.remove("overflow-hidden");
        }
    }, [previewImage]);

    if (isImageLoading) {
        return <ImagesSkeleton />;
    }

    return (
        <div className="md:max-lg:-mx-4">
            <div className="relative hidden md:flex h-[25rem] gap-1">
                <div
                    className="relative w-1/2 h-full cursor-pointer"
                    onClick={() => {
                        setPreviewImage(!previewImage);
                        setRefImage(backgroundImage?._id);
                    }}
                >
                    <img
                        src={backgroundImage?.url}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 w-full h-full mb-1 hover:bg-slate-700 opacity-30 transition-all" />
                </div>
                <div className="grid relative grid-cols-2 w-1/2 gap-1">
                    {images?.data.map((img: Image, index) => {
                        return (
                            <div
                                className="relative cursor-pointer min-h-0"
                                key={index}
                                onClick={() => {
                                    setPreviewImage(!previewImage);
                                    setRefImage(img._id);
                                }}
                            >
                                <img
                                    alt="garage images"
                                    src={img.url}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-0 w-full h-full hover:bg-slate-700 opacity-30 transition-all" />
                            </div>
                        );
                    })}
                </div>
                <OpenImagesButton
                    openGallery={() => setPreviewImage(!previewImage)}
                />
            </div>
            <ImagesOverlay
                images={images?.data}
                isOpen={previewImage}
                closeGallery={() => {
                    setPreviewImage(false);
                    setRefImage("");
                }}
                imageRef={refImage}
            />
        </div>
    );
}

export default GarageImagesPreview;
