import { getRooms } from "@/api/chat";
import { useAppSelector } from "@/core/hooks";
import { Room } from "@/core/types";
import { useEffect, useState } from "react";

export default function useRooms() {
    const token = useAppSelector((state) => state.user.token);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        if (!token) return;

        const fetchRooms = async () => {
            const rooms = await getRooms();
            setRooms(rooms?.data || []);
        };

        fetchRooms();
    }, [token]);

    return rooms;
}
