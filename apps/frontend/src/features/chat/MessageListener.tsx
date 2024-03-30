import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { ContainerProps, Message } from "@/core/types";
import { useEffect, useState } from "react";
import { getListRooms, receivedMessage, selectRooms } from "./rooms.slice";
import { socket } from "@/components/socket";

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

        const receivedMessageSocket = (message: Message) => {
            dispatch(receivedMessage(message));
        };

        if (isConnected && rooms.length !== 0) {
            joinRooms();
            socket.on("room:receive_message", receivedMessageSocket);
            socket.on("room:receive_update_message", receivedMessageSocket);
            // socket.on("room:receive_typing", receivedTypingSocket);
            // socket.on("room:receive_idle", receivedTyping);
        }

        return () => {
            socket.off("room:receive_message", receivedMessageSocket);
            socket.off("room:receive_update_message", receivedMessageSocket);
            // socket.off("room:receive_typing", receivedTypingSocket);
        };
    }, [rooms, isConnected, dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(getListRooms());
        }
    }, [dispatch, user]);

    return <>{children}</>;
}

export default MessageListener;
