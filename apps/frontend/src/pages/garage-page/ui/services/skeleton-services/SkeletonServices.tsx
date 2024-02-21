import { Skeleton } from "@nextui-org/react";

function SkeletonServices() {
    return (
        <div className="flex flex-col gap-4">
            {Array(4)
                .fill("")
                .map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between w-full items-center"
                    >
                        <div className="relative flex items-center gap-2">
                            <Skeleton className="w-6 h-9 bg-default-300" />
                            <div className="flex min-w-80 flex-col gap-1">
                                <Skeleton className="w-40 h-4 bg-default-300" />
                                <Skeleton className="w-full h-4 bg-default-300" />
                            </div>
                        </div>
                        <div>
                            <Skeleton className="w-20 h-4 bg-default-300" />
                        </div>
                    </div>
                ))}
        </div>
    );
}
export default SkeletonServices;
