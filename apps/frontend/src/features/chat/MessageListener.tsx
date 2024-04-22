import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { ContainerProps, Message } from "@/core/types";
import { useEffect, useState } from "react";
import {
    getListRooms,
    receivedMessage,
    receivedTyping,
    selectRoomById,
    selectRooms,
} from "./rooms.slice";
import { socket } from "@/components/socket";
import { useLocation } from "react-router-dom";

function MessageListener({ children }: ContainerProps) {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const rooms = useAppSelector((state) => selectRooms(state));
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const location = useLocation();
    // TODO: need to implement
    // const currentRoom = useAppSelector((state) =>
    //     selectRoomById(state.rooms.rooms, roomId || ""),
    // );

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        socket.on("connect", onConnect);
    }, [user?._id]);

    useEffect(() => {
        const joinRooms = () => {
            rooms.forEach((room) => {
                socket.emit("room:join", room);
            });
        };

        const markRoomAsReadSocket = () => {
            socket.emit("room:read", {});
        };

        const receivedMessageSocket = (message: Message) => {
            // TODO: need to implement
            dispatch(receivedMessage(message));
            if (roomId && message.roomId === roomId) {
            }
        };

        const receivedTypingSocket = (response: {
            isTyping: boolean;
            roomId: string;
        }) => {
            dispatch(receivedTyping(response));
        };

        if (isConnected && rooms.length !== 0) {
            joinRooms();
            socket.on("room:receive_message", receivedMessageSocket);
            socket.on("room:receive_update_message", receivedMessageSocket);
            socket.on("room:receive_typing", receivedTypingSocket);
            socket.on("room:receive_idle", receivedTypingSocket);
        }

        return () => {
            socket.off("room:receive_message", receivedMessageSocket);
            socket.off("room:receive_update_message", receivedMessageSocket);
            socket.off("room:receive_typing", receivedTypingSocket);
            socket.off("room:receive_idle", receivedTypingSocket);
        };
    }, [rooms, isConnected, dispatch]);

    useEffect(() => {
        if (user) {
            const getRooms = async () => {
                const roomIds = rooms.map((room) => room.roomId);
                dispatch(getListRooms(roomIds));
            };

            getRooms();

            const id = setInterval(getRooms, 10000);

            return () => clearInterval(id);
        }
    }, [dispatch, user, rooms.length]);

    return <>{children}</>;
}

export default MessageListener;
