import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { ContainerProps, Message } from "@/core/types";
import { useEffect, useState } from "react";
import { getListRooms, selectRooms } from "./rooms.slice";
import manager from "@/components/socket";

export const socket = manager.socket("/room");

function MessageListener({ children }: ContainerProps) {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const rooms = useAppSelector((state) => selectRooms(state));
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        socket.on("connect", onConnect);
    }, [user]);

    useEffect(() => {
        const joinRooms = () => {
            rooms.forEach((room) => {
                socket.emit("room:join", room);
            });
        };
        const receivedMessage = (message: Message) => {};

        if (isConnected && rooms.length !== 0) {
            joinRooms();
            socket.on("room:receive_message", receivedMessage);
            socket.on("room:receive_update_message", receivedMessage);
            // socket.on("room:receive_typing", receivedTyping);
            // socket.on("room:receive_idle", receivedTyping);
        }

        return () => {
            socket.off("room:receive_message", receivedMessage);
            socket.off("room:receive_update_message", receivedMessage);
        };
    }, [rooms, isConnected]);

    useEffect(() => {
        if (user) {
            dispatch(getListRooms());
        }
    }, [dispatch, user]);

    return <>{children}</>;
}

export default MessageListener;
