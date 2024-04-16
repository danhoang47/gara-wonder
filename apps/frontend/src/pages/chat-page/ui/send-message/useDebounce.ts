import { useEffect } from "react";
import { socket } from "@/components/socket";
import { RoomEntry } from "@/features/chat/rooms.slice";

export default function useDebouncedValue(
    room: RoomEntry,
    value: string,
    delay: number = 500,
) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            socket.emit("room:send_idle", {
                roomId: room.roomId,
            });
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [delay, room.roomId, value]);

    const emitTyping = () => {
        socket.emit("room:send_typing", {
            roomId: room.roomId,
        });
    };

    return emitTyping;
}
