import { firestore } from "@/components";
import { useAppSelector } from "@/core/hooks";
import { ContainerProps } from "@/core/types";
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from "react";

function NotificationsListener({ children }: ContainerProps) {
    const user = useAppSelector(state => state.user.value)

    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(firestore, "rooms", "notifications"), (doc) => {
                console.log(doc)
            })
        }
    }, [user])

    return (  
        <>
            {children}
        </>
    );
}

export default NotificationsListener;