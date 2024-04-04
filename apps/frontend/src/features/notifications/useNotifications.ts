import { useAppDispatch, useAppSelector, useAsyncList } from "@/core/hooks";
import {
    notificationAdded,
    notificationReset,
    notificationUpsert,
    notificationsReceived,
} from "./notifications.slice";
import { useCallback, useEffect } from "react";
import { getNotifications } from "@/api";
import { Notification, Paging } from "@/core/types";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "@/components";

const DEFAULT_PAGING: Paging = {
    limit: 10,
};

export default function useNotifications() {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const getKey = useCallback(() => {
        if (!user) return null;

        return "notifications/" + user._id;
    }, [user]);
    const onNotificationLoaded = (
        notifications: Notification[],
        isReload: boolean,
    ) => {
        if (isReload) {
            dispatch(notificationsReceived(notifications));
        } else {
            dispatch(notificationUpsert(notifications));
        }
    };
    const { isReload, isLoading, onNext } = useAsyncList<Notification>(
        getKey,
        onNotificationLoaded,
        [user],
        async (params) => {
            const paging = params[1];
            const results = await getNotifications(
                user?._id,
                paging.limit,
                paging?.nextCursor,
            );
            return results;
        },
        DEFAULT_PAGING,
    );

    useEffect(() => {
        let unsub: Unsubscribe;
        let isFirstTimeListened = true;

        if (!user) {
            dispatch(notificationReset())
        }

        if (user && user._id) {
            const q = query(collection(
                firestore, 
                "rooms", 
                "notifications", 
                user._id
                
            ))
            unsub = onSnapshot(q, (docs) => {
                docs.docChanges().forEach(doc => {
                    if (doc.type === "added" && !isFirstTimeListened) {
                        const notification = doc.doc.data() as Notification
                        dispatch(notificationAdded(notification))
                    }
                })
                isFirstTimeListened = false
            }) 
        }

        return () => unsub && unsub()
    }, [dispatch, user])

    return { isReload, isLoading, onNext };
}
