import { memo } from 'react'
import { Skeleton } from "@nextui-org/react";

// eslint-disable-next-line react-refresh/only-export-components
function NotificationSkeleton() {
    return (
        <div className="flex gap-2 px-6 py-4 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="grow">
                <Skeleton className="w-full h-2 rounded-large"/>
                <Skeleton className="mt-2 w-2/3 h-2 rounded-large"/>
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(NotificationSkeleton);
