import { useAppSelector, useInfiniteScroll } from "@/core/hooks";
import { selectNotifications } from "../notifications.slice";
import NotificationSkeleton from "../notification-skeleton";
import NotificationCard from "../notification-card";

export type CustomerNotificationsProps = {
    isLoading: boolean,
    isReload: boolean,
    onNext: () => void;
}

function CustomerNotifications({
    isLoading,
    isReload,
    onNext
}: CustomerNotificationsProps) {
    const notifications = useAppSelector(state => selectNotifications(state.notifications));
    const ref = useInfiniteScroll(onNext);

    const onRenderLoading = () => {
        return <>
            {Array.from(new Array(10)).map((_, index) => (
                <NotificationSkeleton key={index} />
            ))}
        </>
    }

    const onRenderNotifications = () => {
        if (isReload && isLoading) {
            return <>{onRenderLoading()}</>
        } 
        return (
            <>
                {notifications?.map(notification => (
                    <NotificationCard key={notification._id} notification={notification}/>
                ))}
                {isLoading && onRenderLoading()}
            </>
        )
    }

    return (
        <div className="max-h-[70vh] overflow-y-auto">
            <div>
                {onRenderNotifications()}
            </div>
            <div ref={ref} className="h-2"/>
        </div>
    )
}

export default CustomerNotifications;
