import { useAppDispatch, useAppSelector, useAsyncList, useInfiniteScroll } from "@/core/hooks";
import NotificationSkeleton from "../notification-skeleton";
import { useCallback } from "react";
import { Notification, Paging } from "@/core/types";
import { getNotifications } from "@/api";
import NotificationCard from "../notification-card";
import { notificationUpsert, notificationsReceived, selectNotifications } from "../notifications.slice";

const DEFAULT_PAGING: Paging = {
    limit: 1
}

function NotificationsDialog() {
    const user = useAppSelector(state => state.user.value)
    const notifications = useAppSelector(state => selectNotifications(state.notifications));
    const dispatch = useAppDispatch()
    const getKey = useCallback(() => {
        if (!user) return null;
        
        return "notifications/" + user._id
    }, [user?._id])
    const onNotificationLoaded = (notifications: Notification[], isReload: boolean) => {
        if (isReload) {
            dispatch(notificationsReceived(notifications))
        } else {
            dispatch(notificationUpsert(notifications))
        }
    }
    const { isReload, isLoading, onNext } = useAsyncList<Notification>(
        getKey, 
        onNotificationLoaded, 
        [user], 
        async (params: [string | null, Paging]) => {
            const [_, paging] = params;
            const results = await getNotifications(user?._id, paging.limit, paging?.nextCursor)
            return results
        },
        DEFAULT_PAGING
    )
    const ref = useInfiniteScroll(onNext);

    const onRenderLoading = () => {
        return <>
            {Array.from(new Array(10)).map((_, index) => (
                <NotificationSkeleton key={index} />
            ))}
        </>
    }

    const onRenderNotifications = () => {
        // TODO: need backend enhanced logic
        // if (isReload) {
        //     return <>{onRenderLoading()}</>
        // } 
        return (
            <>
                {notifications?.map(notification => (
                    <NotificationCard key={notification._id} notification={notification}/>
                ))}
                {isLoading && onRenderLoading()}
            </>
        )
    }

    console.log(notifications)
    return (
        <div className="w-full flex flex-col">
            <div className="flex py-4 px-6 justify-between items-center border-b">
                <p className="text-base font-semibold">Thông báo</p>
                <p className="hover:underline underline-offset-2 cursor-pointer text-primary">
                    Đánh dấu là đã đọc
                </p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
                {onRenderNotifications()}
                <div className="h-1"/>
            </div>
        </div>
    );
}

export default NotificationsDialog;
