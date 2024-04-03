import {
    useAppDispatch,
    useAppSelector,
    useInfiniteScroll,
} from "@/core/hooks";
import { Message } from "@/core/types";
import {
    RoomEntry,
    selectMessages,
    trackingActivityStatus,
} from "@/features/chat/rooms.slice";
import {
    faEllipsis,
    faHeart,
    faReply,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Spinner, Tooltip } from "@nextui-org/react";
import { ObjectId } from "bson";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import MessageHeader from "../message-header";
import SendMessage from "../send-message";
import useMessages from "./useMessages";

interface IDetailMessageProps {
    room: RoomEntry;
}

export type PayloadMessage = Omit<
    Message,
    "images" | "_id" | "updatedAt" | "replyFrom"
> & {
    _id: ObjectId;
    images: File[];
    replyFrom?: Message;
};

const DetailMessage = ({ room }: IDetailMessageProps) => {
    const userId = useAppSelector((state) => state.user.value?._id);
    const dispatch = useAppDispatch();
    const { onNext } = useMessages(room.roomId);
    const messages = useAppSelector((state) =>
        selectMessages(state.rooms.rooms.entities[room.roomId]),
    );

    const group = (data: Message[]) => {
        let previousId: string | undefined = undefined;
        const newList: Message[][] = [];

        data.forEach(({ authorId }: { authorId: string }, index: number) => {
            if (previousId !== authorId) {
                previousId = authorId;
                const grp = [];
                for (let i = index; i < data.length; i++) {
                    if (data[i].authorId === authorId) {
                        grp.push(data[i]);
                    } else {
                        break;
                    }
                }

                newList.push(grp);
            }
        });
        return newList;
    };

    const [replyMessage, setReplyMessage] = useState<Message>();

    const ref = useInfiniteScroll(onNext);

    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scroll({
                top: chatRef.current.scrollHeight,
                behavior: "instant",
            });
        }
    }, [chatRef, messages.length]);

    useEffect(() => {
        if (!userId || !room?.garageId) return;

        const getTrackingStatus = async () => {
            dispatch(
                trackingActivityStatus({
                    userId: room?.userId,
                    garageId: room?.garageId,
                    roomId: room?.roomId,
                }),
            );
        };

        getTrackingStatus();

        const id = setInterval(getTrackingStatus, 30000);

        return () => clearInterval(id);
    }, [dispatch, room?.garageId, room?.roomId, room?.userId, userId]);

    return room ? (
        <div className="flex flex-col col-span-4 overflow-hidden h-full">
            <MessageHeader room={room} />

            <div ref={chatRef} className="overflow-y-auto grow">
                <div className="overflow-y-auto px-4 py-3">
                    <div className="h-5" ref={ref} />
                    {group(messages).map((item: Message[], index: number) => {
                        return (
                            <div
                                key={index}
                                className={clsx(
                                    "flex items-end gap-1 mb-2",
                                    item[0].authorId === userId &&
                                        "justify-end",
                                )}
                            >
                                {item[0].authorId !== userId && (
                                    <div className="w-[25px] h-[25px] shrink-0">
                                        <Avatar
                                            src={room?.photoURL}
                                            alt=""
                                            className="h-full w-full"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    {item.map((item2: Message) => {
                                        return (
                                            <div
                                                key={item2._id}
                                                className={clsx(
                                                    "max-w-full",
                                                    item2.authorId === userId &&
                                                        "self-end",
                                                )}
                                            >
                                                <Tooltip
                                                    content={
                                                        <div className="cursor-pointer flex gap-3 text-primary">
                                                            <FontAwesomeIcon
                                                                icon={faHeart}
                                                                size="lg"
                                                                color="red"
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faReply}
                                                                size="lg"
                                                                onClick={() => {
                                                                    setReplyMessage(
                                                                        item2,
                                                                    );
                                                                }}
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faEllipsis
                                                                }
                                                                size="lg"
                                                            />
                                                        </div>
                                                    }
                                                    placement={
                                                        item2.authorId ===
                                                        userId
                                                            ? "left"
                                                            : "right"
                                                    }
                                                >
                                                    <div className="flex flex-col ">
                                                        {item2?.replyFrom
                                                            ?._id && (
                                                            <div
                                                                className={clsx(
                                                                    "translate-y-1.5 mb-[-4px] cursor-pointer bg-[#ccc] rounded-3xl chat-bubble",
                                                                    item2.authorId ===
                                                                        userId
                                                                        ? "self-end"
                                                                        : "self-start",
                                                                )}
                                                            >
                                                                <p className="m-1 break-words">
                                                                    {
                                                                        item2
                                                                            ?.replyFrom
                                                                            ?.content
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}
                                                        <div
                                                            className={clsx(
                                                                "chat-bubble relative rounded-3xl max-w-full",
                                                                item2.authorId ===
                                                                    userId
                                                                    ? "right self-end chat-bubble-gradient text-white"
                                                                    : "self-start",
                                                            )}
                                                        >
                                                            <p className="m-1 break-words">
                                                                {item2?.content}
                                                            </p>
                                                            {item2.isSticked && (
                                                                <div className="absolute bottom-[-2px] right-[-6px] text-[red] rounded-full">
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faHeart
                                                                        }
                                                                        size="1x"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                                {item2.isLoading && (
                                                    <div className="flex items-center mt-0.5 justify-end gap-1.5">
                                                        <Spinner
                                                            size="sm"
                                                            color="default"
                                                        />
                                                        <p className="text-xs">
                                                            Đang gửi
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <SendMessage
                room={room}
                replyMessage={replyMessage}
                setReplyMessage={setReplyMessage}
            />
        </div>
    ) : (
        <div className="">
            <p className="text-default-400 italic">Chưa có tin nhắn nào</p>
        </div>
    );
};

export default DetailMessage;
