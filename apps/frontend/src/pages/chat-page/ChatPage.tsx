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
    const fetchingStatusActivity = useAppSelector(
        (state) => state.rooms.fetchingStatusActivity,
    );

    const { roomId } = useParams();

    const [selectedRoom, setSelectedRoom] = useState<RoomEntry>();

    useEffect(() => {
        if (fetchingStatus === FetchStatus.Fulfilled && !selectedRoom) {
            setSelectedRoom(rooms.find(({ _id }) => _id === roomId));
        }

        if (
            fetchingStatus === FetchStatus.Fulfilled &&
            fetchingStatusActivity === FetchStatus.Fulfilled
        ) {
            setSelectedRoom(rooms.find(({ _id }) => _id === roomId));
        }
    }, [roomId, fetchingStatus, fetchingStatusActivity, rooms]);

    useEffect(() => {
        if (!selectedRoom) return;

        if (selectedRoom._id !== roomId) {
            navigate(`/chat/${selectedRoom._id}`);
        }
    }, [selectedRoom]);

    return (
        <div className="grid grid-cols-6 h-[calc(100vh-81px)] max-[840px]:h-[calc(100vh-145px)]">
            <Rooms
                rooms={rooms}
                selectedRoom={selectedRoom}
                onRoomSelected={(room) => setSelectedRoom(room)}
            />
            {selectedRoom ? (
                <DetailMessage
                    room={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                />
            ) : (
                <EmptySelectedRoom />
            )}
        </div>
    );
};

export default ChatPage;
