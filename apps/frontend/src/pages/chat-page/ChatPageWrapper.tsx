import { useAppSelector } from "@/core/hooks";
import { FetchStatus } from "@/core/types";
import { selectRooms } from "@/features/chat/rooms.slice";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { DetailMessage, Rooms } from "./ui";
import EmptySelectedRoom from "./ui/empty-selected-room";

const ChatPageWrapper = () => {
    const rooms = useAppSelector((state) => selectRooms(state));
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatus,
    );
    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        if (roomId) return;

        if (fetchingStatus === FetchStatus.Fulfilled && rooms.length !== 0) {
            navigate(`${rooms[0]?._id}`);
        }
    }, [fetchingStatus, navigate, rooms, roomId]);

    useEffect(() => {
        const onPopstate = () => {
            navigate(-1);
        };

        addEventListener("popstate", onPopstate);

        return () => removeEventListener("popstate", onPopstate);
    }, [navigate]);

    if (fetchingStatus !== FetchStatus.Fulfilled) {
        return <h1>Loading...</h1>;
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
