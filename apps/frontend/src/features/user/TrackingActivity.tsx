import { useEffect } from "react";
import { useAppSelector } from "@/core/hooks";
import { ContainerProps } from "@/core/types";
import manager from "@/components/socket";

const socket = manager.socket("/user");

function TrackingActivity({ children }: ContainerProps) {
    const user = useAppSelector((state) => state.user.value);

    useEffect(() => {
        if (user) {
            socket.connect()
            socket.emit("user:ping", user._id);
        }

        return () => { socket.disconnect() }
    }, [user]);

    return <>{children}</>;
}

export default TrackingActivity;
