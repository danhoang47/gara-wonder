import { faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { RoomEntry } from "@/features/chat/rooms.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { RoomStatus } from "@/core/types";
import "./Rooms.styles.scss";
import { Avatar } from "@nextui-org/react";

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
                            className={`rounded-lg flex items-center gap-2 px-3 py-2 rounded transition ease-linear  ${
                                selectedRoom?._id === room._id &&
                                "bg-[#e8f3ff] border-l-8 border-l-primary"
                            } ${
                                selectedRoom?._id !== room._id &&
                                "hover:bg-default-200"
                            } cursor-pointer ${`border-l-8 border-l-transparent`}`}
                            onClick={() => {
                                onRoomSelected && onRoomSelected(room);
                            }}
                        >
                            <Avatar
                                src={room?.photoURL}
                                name={room?.displayName}
                                alt=""
                                size="lg"
                                className="shrink-0"
                            />
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
                                    {room.isTyping ? (
                                        <div className="typing flex gap-0.5 bg-default-200 w-fit px-2.5 py-2 rounded-full">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    ) : (
                                        room?.latestMessage?.content
                                    )}
                                </p>
                            </div>

                            {room?.status === RoomStatus.Ignore && (
                                <FontAwesomeIcon icon={faBellSlash} size="sm" />
                            )}
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
