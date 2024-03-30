import { deleteRoom, muteRoom } from "@/api/chat";
import { RoomStatus } from "@/core/types";
import { RoomEntry } from "@/features/chat/rooms.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";

import {
    faBellSlash,
    faEllipsis,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const MessageHeader = ({ room }: { room: RoomEntry }) => {
    return (
        <div className="flex items-center gap-2 px-4 py-3 border-b">
            <div className="w-[45px] h-[45px] relative">
                <img
                    src={room?.photoURL}
                    alt=""
                    className="block rounded-full h-full w-full object-cover"
                />

                {room?.isOnline && (
                    <div className="bg-[#31a24c] border border-[black] rounded-full absolute w-[14px] h-[14px] bottom-0 right-0"></div>
                )}
            </div>
            <div className="leading-none">
                <h2 className="font-semibold">{room?.displayName}</h2>
                {room?.isOnline && <p className="text-sm">Đang hoạt động</p>}
            </div>
            <div className="ml-auto">
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <FontAwesomeIcon
                            className="mr-6 cursor-pointer"
                            icon={faEllipsis}
                            size="lg"
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <Button
                            variant="light"
                            className="px-2"
                            startContent={
                                <FontAwesomeIcon
                                    className="cursor-pointer"
                                    icon={faBellSlash}
                                    size="lg"
                                />
                            }
                            onPress={async () => {
                                await muteRoom(
                                    room._id,
                                    room.status === RoomStatus.Active
                                        ? true
                                        : false,
                                );
                            }}
                        >
                            Tắt thông báo
                        </Button>
                        <Button
                            variant="light"
                            className="px-2"
                            color="danger"
                            startContent={
                                <FontAwesomeIcon
                                    className="cursor-pointer"
                                    icon={faTrash}
                                    size="lg"
                                />
                            }
                            onPress={async () => {
                                await deleteRoom(room._id);
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
