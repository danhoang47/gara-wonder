import { useAppSelector } from "@/core/hooks";
import { FetchStatus } from "@/core/types";
import { selectRooms } from "@/features/chat/rooms.slice";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Rooms } from "./ui";
import EmptySelectedRoom from "./ui/empty-selected-room";
import { FullPageLoad } from "@/core/ui";

const ChatPageWrapper = () => {
    const rooms = useAppSelector((state) => selectRooms(state));
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatus,
    );
    const navigate = useNavigate();
    const [isMounted, setMounted] = useState<boolean>(false);
    const { roomId } = useParams();

    useEffect(() => {
        if (roomId) return;

        if (
            fetchingStatus === FetchStatus.Fulfilled &&
            rooms.length !== 0 &&
            !isMounted
        ) {
            navigate(`${rooms[0]?._id}`);
        }
    }, [fetchingStatus, navigate, rooms, roomId, isMounted]);

    useEffect(() => {
        const onPopstate = () => {
            navigate(-1);
        };
        setMounted(true);

        addEventListener("popstate", onPopstate);

        return () => removeEventListener("popstate", onPopstate);
    }, [navigate]);

    if (fetchingStatus !== FetchStatus.Fulfilled) {
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
