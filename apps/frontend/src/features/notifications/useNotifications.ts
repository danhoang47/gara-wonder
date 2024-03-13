import { useAppDispatch, useAppSelector, useAsyncList } from "@/core/hooks";
import { notificationUpsert, notificationsReceived } from "./notifications.slice";
import { useCallback } from "react";
import { getNotifications } from "@/api";
import { Notification, Paging } from "@/core/types";

const DEFAULT_PAGING: Paging = {
    limit: 10
}

export default function useNotifications() {
    const user = useAppSelector(state => state.user.value)
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
            const paging = params[1];
            const results = await getNotifications(user?._id, paging.limit, paging?.nextCursor)
            return results
        },
        DEFAULT_PAGING
    )

    return { isReload, isLoading, onNext }
}