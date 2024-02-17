import { Card, Skeleton } from "@nextui-org/react";

import "./GarageSkeletonCard.styles.scss";

function GarageSkeletonCard() {
    return (
        <Card className="gap-2 rounded-none shadow-none">
            <div className="square">
                <Skeleton className="rounded-lg">
                    <div className="bg-default-300" />
                </Skeleton>
            </div>
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-3 w-2/3 rounded-full" />
        </Card>
    );
}

export default GarageSkeletonCard;
