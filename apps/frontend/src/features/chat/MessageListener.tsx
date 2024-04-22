import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { ContainerProps, Message, Response, Room } from "@/core/types";
import { useEffect, useMemo, useState } from "react";
import {
    RoomEntry,
    getListRooms,
    markRoomAsRead,
    receivedMessage,
    receivedTyping,
    selectRooms,
} from "./rooms.slice";
import { socket } from "@/components/socket";
import { useMatch } from "react-router-dom";

function MessageListener({ children }: ContainerProps) {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const rooms = useAppSelector((state) => selectRooms(state));
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const match = useMatch("/chat/:roomId");
    const roomId = match?.params.roomId;
    const currentRoom = useMemo(() => {
        if (!roomId) return undefined;

        return rooms.find((room) => room.roomId === roomId);
    }, [rooms, roomId]);

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
            socket.emit(
                "room:read",
                {
                    _id: currentRoom?._id,
                    roomId: currentRoom?.roomId,
                } as Partial<Room>,
                (res: Response<RoomEntry>) => {
                    dispatch(markRoomAsRead(res.data));
                },
            );
        };

        const receivedMessageSocket = (message: Message) => {
            dispatch(receivedMessage(message));
            if (roomId && message.roomId === roomId) {
                markRoomAsReadSocket();
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
