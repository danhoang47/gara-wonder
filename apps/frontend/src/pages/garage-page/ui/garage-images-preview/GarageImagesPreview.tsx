import { useState } from "react";
import { OpenImagesButton } from "..";
import ImagesSkeleton from "./images-skeleton";
const staticImages = [
    {
        url: "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/w_320,h_320/v1708345750/kkshvo6s7dm5nd2f8gdd.webp",
        garageId: "65d349870e28d1edd1d133d6",
        width: 320,
        height: 320,
    },
    {
        url: "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/w_320,h_320/v1708345750/kkshvo6s7dm5nd2f8gdd.webp",
        garageId: "65d349870e28d1edd1d133d6",
        width: 320,
        height: 320,
    },
    {
        url: "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/w_320,h_320/v1708345750/kkshvo6s7dm5nd2f8gdd.webp",
        garageId: "65d349870e28d1edd1d133d6",
        width: 320,
        height: 320,
    },
    {
        url: "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/w_320,h_320/v1708345750/kkshvo6s7dm5nd2f8gdd.webp",
        garageId: "65d349870e28d1edd1d133d6",
        width: 320,
        height: 320,
    },
    {
        url: "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/w_320,h_320/v1708345750/kkshvo6s7dm5nd2f8gdd.webp",
        garageId: "65d349870e28d1edd1d133d6",
        width: 320,
        height: 320,
    },
    {
        url: "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/w_320,h_320/v1708345750/kkshvo6s7dm5nd2f8gdd.webp",
        garageId: "65d349870e28d1edd1d133d6",
        width: 320,
        height: 320,
    },
];

function GarageImagesPreview() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<boolean>(false);
    if (isLoading) {
        return <ImagesSkeleton />;
    }
    return (
        <div className="relative">
            <div className=" hidden md:flex h-[25rem] gap-1">
                <div className="relative w-1/2 h-full cursor-pointer">
                    <img
                        src={staticImages[0].url}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 w-full h-full mb-1 hover:bg-slate-700 opacity-30 transition-all" />
                </div>

                <div className="flex gap-1 w-1/2">
                    <div className="flex flex-col w-1/2 gap-1 overflow-hidden">
                        <div className="relative w-full h-1/2 cursor-pointer">
                            <img
                                src={staticImages[0].url}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 w-full h-full hover:bg-slate-700 opacity-30 transition-all" />
                        </div>
                        <div className="relative w-full h-1/2 cursor-pointer">
                            <img
                                src={staticImages[0].url}
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute top-0 w-full h-full hover:bg-slate-700 opacity-30 transition-all" />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 gap-1 overflow-hidden">
                        <div className="relative w-full h-1/2 cursor-pointer">
                            <img
                                src={staticImages[0].url}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 w-full h-full hover:bg-slate-700 opacity-30 transition-all" />
                        </div>
                        <div className="relative w-full h-1/2 cursor-pointer">
                            <img
                                src={staticImages[0].url}
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute top-0 w-full h-full hover:bg-slate-700 opacity-30 transition-all" />
                        </div>
                    </div>
                </div>
            </div>
            <OpenImagesButton onClick={() => setPreviewImage(!previewImage)} />
        </div>
    );
}

export default GarageImagesPreview;
