import { Skeleton } from "@nextui-org/react";

export default function CardSkeleton() {
    return (
        <div className="pt-2 flex flex-col gap-2">
            {Array(5)
                .fill("")
                .map((_, key) => (
                    <div
                        key={key}
                        className="max-w-[480px] h-[11rem] border-2 rounded-md  flex items-center gap-3 p-5"
                    >
                        <Skeleton className="rounded-lg w-full h-full "></Skeleton>
                    </div>
                ))}
        </div>
    );
}
