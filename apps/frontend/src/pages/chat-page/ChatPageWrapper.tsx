import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { useAppSelector, useAuthLoading } from "@/core/hooks";
import { FetchStatus } from "@/core/types";
import { selectRooms } from "@/features/chat/rooms.slice";
import { Rooms } from "./ui";
import EmptySelectedRoom from "./ui/empty-selected-room";
import { FullPageLoad } from "@/core/ui";

const ChatPageWrapper = () => {
    const rooms = useAppSelector((state) => selectRooms(state));
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatus,
    );
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [isPop, setPop] = useState<boolean>(false);

    useAuthLoading(ChatPageWrapper.name);

    useEffect(() => {
        document.title = "Tin nhắn";
    }, []);

    useEffect(() => {
        if (isPop) {
            return;
        }

        if (
            fetchingStatus === FetchStatus.Fulfilled &&
            rooms.length !== 0 &&
            !roomId
        ) {
            navigate(`${rooms[0]?.roomId}`);
        }
    }, [fetchingStatus, navigate, rooms, roomId, isPop]);

    useEffect(() => {
        const onPopstate = () => {
            setPop(true);
            if (rooms.length !== 0) {
                navigate(-1);
            }
        };

        addEventListener("popstate", onPopstate);

        return () => removeEventListener("popstate", onPopstate);
    }, [navigate, rooms.length]);

    if (fetchingStatus === FetchStatus.Fetching && !isPop && !roomId) {
        return <FullPageLoad />;
    }

    if (rooms.length === 0) {
        return (
            <div className="grid grid-cols-6 h-[calc(100vh-81px)]">
                <Rooms rooms={rooms} />
                <EmptySelectedRoom />
            </div>
        );
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default ChatPageWrapper;
