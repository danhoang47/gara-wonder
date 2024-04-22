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
import {
    Avatar,
    Button,
    Link,
    Spinner,
    Tooltip,
} from "@nextui-org/react";
import { ObjectId } from "bson";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import MessageHeader from "../message-header";
import SendMessage from "../send-message";
import useMessages from "./useMessages";
import { MessageWithServices } from "@/api/chat";
import AttachEntity from "../attach-entity";

interface IDetailMessageProps {
    room: RoomEntry;
    setSelectedRoom: (room?: RoomEntry) => void | undefined;
}

export type PayloadMessage = Omit<
    Message,
    "images" | "_id" | "updatedAt" | "replyFrom"
> & {
    _id: ObjectId;
    images: File[];
    replyFrom?: Message;
};

const DetailMessage = ({ room, setSelectedRoom }: IDetailMessageProps) => {
    const userId = useAppSelector((state) => state.user.value?._id);
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const dispatch = useAppDispatch();
    const { onNext } = useMessages(room.roomId);
    const messages = useAppSelector((state) =>
        selectMessages(state.rooms.rooms.entities[room.roomId]),
    );
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const group = (data: Message[]) => {
        const newList: Message[][] = [];
        let previousIndex: number = 0;

        data.forEach(({ authorId }, index: number) => {
            if (
                (previousIndex && index < previousIndex) ||
                previousIndex === data.length - 1
            )
                return;

            const isAuthorUser = authorId === room.userId;
            const grp = [];

            for (let i = index; i < data.length; i++) {
                if (
                    (isAuthorUser && data[i].authorId === authorId) ||
                    (!isAuthorUser && data[i].authorId !== room.userId)
                ) {
                    grp.push(data[i]);
                } else {
                    previousIndex = i;
                    break;
                }

                if (i === data.length - 1) {
                    previousIndex = i;
                }
            }

            newList.push(grp);
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
        if (!userId || !room?.entityId) return;

        const getTrackingStatus = async () => {
            dispatch(
                trackingActivityStatus({
                    userId: room?.userId,
                    entityId: room?.entityId,
                    roomId: room?.roomId,
                    type: room?.type,
                }),
            );
        };

        getTrackingStatus();

        const id = setInterval(getTrackingStatus, 30000);

        return () => clearInterval(id);
    }, [
        dispatch,
        room?.entityId,
        room?.roomId,
        room?.type,
        room?.userId,
        userId,
    ]);

    const handleSelectedService = (serviceId: string) => {
        const removeIndex = selectedServices.indexOf(serviceId);
        if (removeIndex > -1) {
            selectedServices.splice(removeIndex, 1);
            setSelectedServices((prev) => [...prev]);
        } else {
            setSelectedServices((prev) => [...prev, serviceId]);
        }
    };

    /**
     * if authorId = userId => end
     * else
     *      if room.entityId = garageId => end
     */
    const checkIfMessageSentFromEntity = (authorId: string = "") => {
        if (authorId === userId && room.userId === userId) {
            return true;
        }
        if (
            authorId !== userId &&
            room.userId !== authorId &&
            room.entityId === garageId
        ) {
            return true;
        }
        if (authorId === userId) {
            return true;
        }

        return false;
    };

    return room ? (
        <div className="flex flex-col col-span-4 overflow-hidden h-full">
            <MessageHeader room={room} setSelectedRoom={setSelectedRoom} />
            {room.attachEntityId && (
                <AttachEntity
                    roomType={room.type}
                    attachEntityId={room.attachEntityId}
                    displayName={room.displayName}
                    entityId={room.entityId}
                />
            )}
            <div ref={chatRef} className="overflow-y-auto grow">
                <div className="overflow-y-auto px-4 py-3">
                    <div className="h-5" ref={ref} />
                    {group(messages).map((item: Message[], index: number) => {
                        return (
                            <div
                                key={index}
                                className={clsx(
                                    "flex items-end gap-1 mb-2",
                                    checkIfMessageSentFromEntity(
                                        item[0].authorId,
                                    ) && "justify-end",
                                )}
                            >
                                {!checkIfMessageSentFromEntity(
                                    item[0].authorId,
                                ) && (
                                    <div className="w-[25px] h-[25px] shrink-0">
                                        <Avatar
                                            src={room?.photoURL}
                                            alt=""
                                            className="h-full w-full"
                                        />
                                    </div>
                                )}

                                <div className="test flex flex-col gap-0.5 max-w-[80%]">
                                    {item.map((item2: MessageWithServices) => {
                                        return (
                                            <div
                                                key={item2._id}
                                                className={clsx(
                                                    checkIfMessageSentFromEntity(
                                                        item2.authorId,
                                                    ) &&
                                                        "self-end flex flex-col",
                                                )}
                                            >
                                                {item2.services &&
                                                    item2.services?.length >
                                                        0 && (
                                                        <div
                                                            className={clsx(
                                                                "service py-3 px-3 my-0.5 bg-default-100 w-[280px]",
                                                                checkIfMessageSentFromEntity(
                                                                    item2.authorId,
                                                                )
                                                                    ? "right self-end"
                                                                    : "left self-start",
                                                            )}
                                                        >
                                                            <div className="w-full ">
                                                                <div className="pb-1">
                                                                    <p className="font-medium text-sm text-center">
                                                                        Gợi ý
                                                                        dịch vụ
                                                                    </p>
                                                                </div>
                                                                {item2.services?.map(
                                                                    (
                                                                        service,
                                                                    ) => (
                                                                        <div className="pt-2">
                                                                            <Button
                                                                                disableRipple
                                                                                onClick={() => {
                                                                                    if (
                                                                                        userId ===
                                                                                        room.userId
                                                                                    ) {
                                                                                        handleSelectedService(
                                                                                            service._id as string,
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                className={clsx(
                                                                                    "w-full text- cursor-pointer bg-background",
                                                                                    selectedServices.includes(
                                                                                        service._id as string,
                                                                                    ) &&
                                                                                        "bg-primary-200 text-white",
                                                                                )}
                                                                            >
                                                                                <div className="flex w-full items-center shadow-sm rounded-md p-2 justify-center gap-2">
                                                                                    <p className="font-medium text-small">
                                                                                        {
                                                                                            service
                                                                                                .category
                                                                                                .name
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </Button>
                                                                        </div>
                                                                    ),
                                                                )}
                                                                {Boolean(
                                                                    selectedServices.length,
                                                                ) &&
                                                                    userId ===
                                                                        room.userId && (
                                                                        <Link
                                                                            href={`/garages/${
                                                                                room.entityId
                                                                            }?sg=${selectedServices.join()}`}
                                                                            className={clsx(
                                                                                "w-full text- cursor-pointer  mt-2",
                                                                            )}
                                                                        >
                                                                            <div className="flex w-full items-center rounded-md p-2 justify-center gap-2">
                                                                                <p className="font-medium text-xs hover:text-primary">
                                                                                    Đặt
                                                                                    ngay
                                                                                </p>
                                                                            </div>
                                                                        </Link>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )}
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
                                                        checkIfMessageSentFromEntity(
                                                            item2.authorId,
                                                        )
                                                            ? "left"
                                                            : "right"
                                                    }
                                                >
                                                    {item2?.content && (
                                                        <span className="inline-block w-fit self-end">
                                                            {item2?.replyFrom
                                                                ?._id && (
                                                                <div
                                                                    className={clsx(
                                                                        "translate-y-1.5 mb-[-4px] cursor-pointer bg-[#f3f3f3] rounded-3xl w-fit ",
                                                                        checkIfMessageSentFromEntity(
                                                                            item2.authorId,
                                                                        )
                                                                            ? "right self-end ml-auto"
                                                                            : "left self-start",
                                                                    )}
                                                                >
                                                                    <p className="break-words py-2.5 px-5">
                                                                        {
                                                                            item2
                                                                                ?.replyFrom
                                                                                ?.content
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {item2?.content && (
                                                                <div
                                                                    className={clsx(
                                                                        "chat-bubble relative max-w-full w-fit",
                                                                        checkIfMessageSentFromEntity(
                                                                            item2.authorId,
                                                                        )
                                                                            ? "right self-end bg-primary text-white ml-auto"
                                                                            : "left self-start",
                                                                    )}
                                                                >
                                                                    <p className="py-2.5 px-5 break-words">
                                                                        {
                                                                            item2?.content
                                                                        }
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
                                                            )}
                                                        </span>
                                                    )}
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
                    {room.isTyping && (
                        <div className="flex items-center gap-1">
                            <div className="w-[25px] h-[25px] shrink-0">
                                <Avatar
                                    src={room?.photoURL}
                                    alt=""
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="typing flex gap-0.5 bg-default-200 w-fit px-2.5 py-2 rounded-full">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
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
