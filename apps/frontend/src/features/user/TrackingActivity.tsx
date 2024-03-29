import { useEffect, useState } from "react";
import { useAppSelector } from "@/core/hooks";
import { ContainerProps } from "@/core/types";
import manager from "@/components/socket";

const socket = manager.socket("/user");

function TrackingActivity({ children }: ContainerProps) {
    const user = useAppSelector((state) => state.user.value);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        function onConnect() {
            console.log("CONNECT");
            setIsConnected(true);
        }
        socket.on("connect", onConnect);

        if (user && isConnected) {
            socket.emit("user:ping", user._id);
        }

        return () => {
            socket.off("connect", onConnect);
        };
    }, [isConnected, user]);

    return <>{children}</>;
}

export default TrackingActivity;
