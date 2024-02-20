import { Skeleton } from "@nextui-org/react";

function ImagesSkeleton() {
    return (
        <div className="flex h-[25rem] gap-1">
            <Skeleton
                disableAnimation
                className="w-1/2 h-full bg-default-300"
            />
            <div className="flex gap-1 w-1/2">
                <div className="flex flex-col gap-1 w-1/2">
                    <Skeleton
                        disableAnimation
                        className="w-full h-1/2 bg-default-300"
                    />
                    <Skeleton
                        disableAnimation
                        className="w-full h-1/2 bg-default-300"
                    />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                    <Skeleton
                        disableAnimation
                        className="w-full h-1/3 bg-default-300"
                    />
                    <Skeleton
                        disableAnimation
                        className="w-full h-1/3 bg-default-300"
                    />
                    <Skeleton
                        disableAnimation
                        className="w-full h-1/3 bg-default-300"
                    />
                </div>
            </div>
        </div>
    );
}

export default ImagesSkeleton;
