/* eslint-disable */
import "./ChatPage.styles.scss";
import { useEffect, useState } from "react";

import { DetailMessage, Rooms } from "./ui";
import { useAppSelector } from "@/core/hooks";
import { RoomEntry, selectRooms } from "@/features/chat/rooms.slice";
import { FetchStatus } from "@/core/types";
import { useNavigate, useParams } from "react-router-dom";
import EmptySelectedRoom from "./ui/empty-selected-room";

const ChatPage = () => {
    const rooms = useAppSelector((state) => selectRooms(state));
    const navigate = useNavigate();
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatus,
    );
    const { roomId } = useParams();

    const [selectedRoom, setSelectedRoom] = useState<RoomEntry>();

    useEffect(() => {
        if (fetchingStatus === FetchStatus.Fulfilled) {
            setSelectedRoom(rooms.find(({ _id }) => _id === roomId));
        }
    }, [roomId, fetchingStatus]);

    useEffect(() => {
        if (!selectedRoom) return;

        if (selectedRoom._id !== roomId) {
            navigate(`/chat/${selectedRoom._id}`);
        }
    }, [selectedRoom]);

    return (
        <div className="grid grid-cols-6 h-[calc(100vh-81px)]">
            <Rooms
                rooms={rooms}
                selectedRoom={selectedRoom}
                onRoomSelected={(room) => setSelectedRoom(room)}
            />
            {selectedRoom ? (
                <DetailMessage room={selectedRoom} />
            ) : (
                <EmptySelectedRoom />
            )}
        </div>
    );
};

export default ChatPage;
