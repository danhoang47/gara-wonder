import { Skeleton } from "@nextui-org/react";

function AdditonalSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {new Array(4).fill("").map((_, index) => {
                return (
                    <div className="flex items-center gap-4" key={index}>
                        <Skeleton className="w-5 h-5" />
                        <Skeleton className="w-80 h-5" />
                    </div>
                );
            })}
        </div>
    );
}

export default AdditonalSkeleton;
