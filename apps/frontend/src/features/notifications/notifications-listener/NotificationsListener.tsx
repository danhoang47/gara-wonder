import { firestore } from "@/components";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { ContainerProps, Notification } from "@/core/types";
import { Unsubscribe, collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect } from "react";
import { notificationAdded } from "../notifications.slice";

function NotificationsListener({ children }: ContainerProps) {
    const user = useAppSelector(state => state.user.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let unsub: Unsubscribe;
        let isFirstTimeListened = true;

        if (user) {
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
    }, [user])

    return (  
        <>
            {children}
        </>
    );
}

export default NotificationsListener;