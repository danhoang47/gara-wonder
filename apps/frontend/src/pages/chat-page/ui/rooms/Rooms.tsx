/* eslint-disable */

import { deleteRoom } from "@/api/chat";
import { Room } from "@/core/types";
import { RoomEntry } from "@/features/chat/rooms.slice";
import clsx from "clsx";

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

interface IListUserProps {
    rooms: RoomEntry[];
    onRoomSelected?: (room: RoomEntry) => void | undefined;
    selectedRoom?: RoomEntry;
}

const Rooms = ({ rooms, onRoomSelected, selectedRoom }: IListUserProps) => {
    return (
        <div className="col-span-2 border-r py-2 overflow-hidden h-full">
            <h1 className="font-semibold text-2xl mb-2 px-3">Đoạn chat</h1>
            <div className="flex flex-col h-[calc(100%-40px)] overflow-y-auto px-3">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div
                            key={room.garageId}
                            className={`flex items-center gap-2 px-3 py-2 rounded transition ease-linear  ${
                                selectedRoom?._id === room._id &&
                                "bg-[#8bc1ff] border-l-8 border-l-primary"
                            } ${
                                selectedRoom?._id !== room._id &&
                                "hover:bg-[rgba(0,0,0,0.1)]"
                            } cursor-pointer ${`border-l-8 border-l-transparent`}`}
                            onClick={() => {
                                onRoomSelected && onRoomSelected(room);
                            }}
                        >
                            <div className="shrink-0 w-[60px] h-[60px] relative">
                                <img
                                    src={room.photoURL}
                                    alt=""
                                    className="block rounded-full h-full w-full object-cover"
                                />
                            </div>
                            <div className="grow overflow-hidden">
                                <h2
                                    className={clsx(
                                        "font-semibold",
                                        ellipsisClassName,
                                    )}
                                >
                                    {room.displayName}
                                </h2>
                                <p
                                    className={clsx(
                                        "text-sm",
                                        ellipsisClassName,
                                    )}
                                >
                                    {room?.latestMessage?.content}
                                </p>
                            </div>
                            <button
                                onClick={async () => {
                                    await deleteRoom(room._id);
                                }}
                            >
                                delete room
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-default-400 italic">
                        Có vẻ bạn chưa có tin nhắn nào!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Rooms;
