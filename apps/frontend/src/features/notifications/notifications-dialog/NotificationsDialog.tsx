import { useAppSelector, useInfiniteScroll } from "@/core/hooks";
import NotificationSkeleton from "../notification-skeleton";
import NotificationCard from "../notification-card";
import {  selectNotifications } from "../notifications.slice";

export type NotificationsDialogProps = {
    isLoading: boolean,
    isReload: boolean,
    onNext: () => void;
}

function NotificationsDialog({
    isLoading,
    isReload,
    onNext
}: NotificationsDialogProps) {
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
        <div className="w-full flex flex-col">
            <div className="flex py-4 px-6 justify-between items-center border-b">
                <p className="text-base font-semibold">Thông báo</p>
                <p className="hover:underline underline-offset-2 cursor-pointer text-primary">
                    Đánh dấu là đã đọc
                </p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
                <div>
                    {onRenderNotifications()}
                </div>
                <div ref={ref} className="h-2"/>
            </div>
        </div>
    );
}

export default NotificationsDialog;
