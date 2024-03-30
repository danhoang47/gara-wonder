import { useAppDispatch, useAppSelector, useAsyncList } from "@/core/hooks";
import { 
    notificationAdded, 
    notificationReset, 
    notificationUpsert, 
    notificationsReceived 
} from "./garage-notifications.slice";
import { useCallback, useEffect, useState } from "react";
import { getGarageByOwnerId, getNotifications } from "@/api";
import { Notification, Paging, Role } from "@/core/types";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "@/components";

const DEFAULT_PAGING: Paging = {
    limit: 10
}

export default function useGarageNotifications() {
    const user = useAppSelector(state => state.user.value)
    const dispatch = useAppDispatch();
    const [garageId, setGarageId] = useState<string>()
    const getKey = useCallback(() => {
        if (!user || user.role !== Role.GarageOwner || !garageId) return null;
        
        return "notifications/garage/" + user._id
    }, [garageId, user]);
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
            const results = await getNotifications(garageId, paging.limit, paging?.nextCursor)
            return results
        },
        DEFAULT_PAGING
    )

    useEffect(() => {
        if (!user || user.role !== Role.GarageOwner) return;

        const fetchGarageByOwner = async () => {
            const garage = await getGarageByOwnerId(user._id)
            setGarageId(garage.data._id)
        }

        fetchGarageByOwner()
    }, [user])

    useEffect(() => {
        let unsub: Unsubscribe;
        let isFirstTimeListened = true;

        if (!user) {
            dispatch(notificationReset())
        }

        if (garageId) {
            const q = query(collection(
                firestore, 
                "rooms", 
                "notifications", 
                garageId
                
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
    }, [user])

    return { isReload, isLoading, onNext }
}