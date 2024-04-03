import { RoomStatus } from "@/core/types";
import {
    RoomEntry,
    deleteCurrentRoom,
    muteCurrentRoom,
    selectRooms,
} from "@/features/chat/rooms.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Avatar,
    Button,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";

import {
    faBellSlash,
    faEllipsis,
    faTrash,
    faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

const MessageHeader = ({ room }: { room: RoomEntry }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const rooms = useAppSelector((state) => selectRooms(state));

    return (
        <div className="flex items-center gap-2 px-4 py-3 border-b">
            <div className="relative">
                <Avatar
                    src={room?.photoURL}
                    alt=""
                    name={room?.displayName}
                    size="md"
                />

                {room?.isOnline && (
                    <div className="bg-[#31a24c] border border-[black] rounded-full absolute w-[12px] h-[12px] bottom-0 right-0"></div>
                )}
            </div>
            <div className="leading-none">
                <Link href={`/garages/${room.garageId}`}>
                    <h2 className="font-semibold text-black">
                        {room?.displayName}
                    </h2>
                </Link>

                {room?.isOnline ? (
                    <p className="text-sm">Đang hoạt động</p>
                ) : (
                    <p className="text-sm">{`Hoạt động ${moment(
                        room.lastActiveAt,
                    ).fromNow()}`}</p>
                )}
            </div>
            <div className="ml-auto">
                <Popover placement="bottom" isOpen={isOpen}>
                    <PopoverTrigger>
                        <FontAwesomeIcon
                            className="mr-6 cursor-pointer"
                            icon={faEllipsis}
                            size="lg"
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        />
                    </PopoverTrigger>
                    <PopoverContent className="px-0 py-3">
                        <Button
                            variant="light"
                            className="w-full"
                            radius="none"
                            startContent={
                                <FontAwesomeIcon
                                    className="cursor-pointer"
                                    icon={
                                        room.status === RoomStatus.Active
                                            ? faBellSlash
                                            : faBell
                                    }
                                    size="lg"
                                />
                            }
                            onPress={async () => {
                                dispatch(
                                    muteCurrentRoom({
                                        roomId: room.roomId,
                                        room_id: room._id,
                                        isMute:
                                            room.status === RoomStatus.Active
                                                ? RoomStatus.Ignore
                                                : RoomStatus.Active,
                                    }),
                                );
                                setIsOpen(false);
                            }}
                        >
                            {room.status === RoomStatus.Active
                                ? "Tắt thông báo"
                                : "Bật thông báo"}
                        </Button>
                        <Button
                            variant="light"
                            className="w-full"
                            radius="none"
                            color="danger"
                            startContent={
                                <FontAwesomeIcon
                                    className="cursor-pointer"
                                    icon={faTrash}
                                    size="lg"
                                />
                            }
                            onPress={async () => {
                                dispatch(
                                    deleteCurrentRoom({
                                        roomId: room.roomId,
                                        room_id: room._id,
                                    }),
                                );
                                setIsOpen(false);
                                navigate(`/chat/${rooms[0]._id}`);
                            }}
                        >
                            Xóa đoạn chat
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default MessageHeader;
