/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "bson";
import {
    faImage,
    faPaperPlane,
    faEllipsis,
    faHeart,
    faReply,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner, Textarea, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
    useInfiniteScroll,
} from "@/core/hooks";
import {
    RoomEntry,
    selectMessages,
    trackingActivityStatus,
} from "@/features/chat/rooms.slice";
import useMessages from "./useMessages";
import { Message, MessageStatus } from "@/core/types";
import { socket } from "@/features/chat/MessageListener";

const ellipsisClassName = "overflow-hidden text-ellipsis whitespace-nowrap";

interface IDetailMessageProps {
    room: RoomEntry;
}

export type PayloadMessage = Omit<
    Message,
    "images" | "_id" | "updatedAt" | "replyFrom"
> & {
    _id: ObjectId;
    images: File[];
    replyFrom?: string;
};

const DetailMessage = ({ room }: IDetailMessageProps) => {
    const userId = useAppSelector((state) => state.user.value?._id);
    const dispatch = useAppDispatch();
    const data = useMessages(room.roomId);
    const listMessages = selectMessages(room);

    const group = (data: any) => {
        let previousId: any = undefined;
        const newList: any = [];

        data.forEach(({ authorId }: any, index: any) => {
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

    const [replyMessage, setReplyMessage] = useState<any>();
    const [pasteImage, setPasteImage] = useState<File[]>([]);
    const [content, setContent] = useState("");

    const handleSubmit = (e: any, replyFrom?: string) => {
        if (e.key === "Enter" || e.type === "click") {
            e.preventDefault();
            if (!content) {
                return;
            }
            const message: PayloadMessage = {
                _id: new ObjectId(),
                authorId: userId!,
                content,
                createdAt: new Date().getTime(),
                images: pasteImage,
                isLoading: true,
                roomId: room.roomId,
                status: MessageStatus.Exist,
                replyFrom,
            };

            socket.emit("room:send_message", message, (message: Message) => {
                // INSERT THANH CONG
                setContent("");
                setPasteImage([]);
                setReplyMessage("");
            });
        }
    };

    const ref = useInfiniteScroll(() => {
        console.log("INTERSECTING");
    });

    const chatRef: any = useRef(listMessages);

    // useEffect(() => {
    //     if (chatRef.current) {
    //         chatRef.current.scroll({
    //             top: chatRef.current.scrollHeight,
    //             behavior: "instant",
    //         });
    //     }
    // }, [chatRef]);

    const handleRemoveImage = (idx: any) => {
        const newList = pasteImage.filter(
            (_: any, index: any) => index !== idx,
        );
        setPasteImage(newList);
    };

    useEffect(() => {
        if (!userId || !room?.garageId) return;

        const getTrackingStatus = async () => {
            dispatch(
                trackingActivityStatus({
                    userId,
                    garageId: room?.garageId,
                    roomId: room?.roomId,
                }),
            );
        };

        getTrackingStatus();

        const id = setInterval(getTrackingStatus, 15000);

        return () => clearInterval(id);
    }, [room?.garageId, userId]);

    return room ? (
        <div className="flex flex-col justify-between col-span-4 overflow-hidden h-full">
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
                    {room?.isOnline && (
                        <p className="text-sm">Đang hoạt động</p>
                    )}
                </div>
            </div>

            <div ref={chatRef} className="overflow-y-auto">
                <div className="overflow-y-auto px-4 py-3">
                    <div className="h-5" ref={ref} />
                    {group(listMessages).map((item: any) => {
                        return (
                            <div
                                className={clsx(
                                    "flex items-end gap-1",
                                    item[0].authorId === userId &&
                                        "justify-end",
                                )}
                            >
                                {item[0].authorId !== userId && (
                                    <div className="w-[30px] h-[30px] shrink-0">
                                        <img
                                            src={item[0].images}
                                            alt=""
                                            className="block rounded-full h-full w-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    {item[0].authorId !== userId && (
                                        <h2 className="text-sm">
                                            {item[0].authorName}
                                        </h2>
                                    )}
                                    {item.map((item2: any) => {
                                        return (
                                            <div
                                                className={clsx(
                                                    "w-fit",
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
                                                    shouldFlip={false}
                                                >
                                                    <div className="flex flex-col ">
                                                        {item2?.replyFrom
                                                            ?.id && (
                                                            <div className="self-end cursor-pointer relative bg-[#ccc] rounded-3xl chat-bubble">
                                                                <p className="m-1">
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
                                                                "chat-bubble relative rounded-3xl  ",
                                                                item2.authorId ===
                                                                    userId
                                                                    ? "right self-end chat-bubble-gradient text-white"
                                                                    : "left",
                                                            )}
                                                        >
                                                            <p className="m-1">
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
                                                {item2.loadingStatus && (
                                                    <div className="flex items-center mt-0.5 justify-end">
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

            <div className="items-end  gap-2 px-4 py-4 rounded">
                <div
                    className={clsx(
                        "h-fit rounded overflow-hidden w-full",
                        (replyMessage || pasteImage?.length > 0) &&
                            "border-t-2",
                    )}
                >
                    {replyMessage?._id && (
                        <div className="p-2 relative">
                            <p className="font-bold ">Đang trả lời:</p>
                            <p className={clsx(ellipsisClassName)}>
                                {replyMessage?.content}
                            </p>
                            <div
                                className="cursor-pointer absolute right-3 top-1"
                                onClick={() => {
                                    setReplyMessage("");
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} size="sm" />
                            </div>
                        </div>
                    )}
                    {pasteImage?.length > 0 && (
                        <div className="flex gap-2 p-2 overflow-x-auto ">
                            {pasteImage.map((item: any, index: any) => {
                                return (
                                    <div className="w-[120px] h-[80px] shrink-0 relative">
                                        <img
                                            className="w-full h-full object-cover rounded"
                                            src={item}
                                            alt=""
                                        />
                                        <div
                                            className="cursor-pointer absolute right-1 top-0"
                                            onClick={() => {
                                                handleRemoveImage(index);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                size="sm"
                                                className="text-white"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="cursor-pointer">
                        <FontAwesomeIcon
                            icon={faImage}
                            size="lg"
                            color="#0070f0"
                        />
                    </div>
                    <Textarea
                        radius="full"
                        type="text"
                        value={content}
                        minRows={1}
                        maxRows={5}
                        alt=""
                        placeholder="Aa"
                        onKeyDown={(e) => {
                            if (replyMessage?._id) {
                                handleSubmit(e, replyMessage);
                            } else {
                                handleSubmit(e);
                            }
                        }}
                        onValueChange={(e) => {
                            setContent(e);
                        }}
                        onPaste={(e) => {
                            const clipboardItems = e.clipboardData.items;
                            const items = [].slice
                                .call(clipboardItems)
                                .filter(function (item: any) {
                                    return /^image\//.test(item.type);
                                });

                            if (items.length === 0) {
                                return;
                            }

                            const item: any = items[0];
                            const blob = item.getAsFile();
                            let file = new File([blob], "file name", {
                                type: "image/jpeg",
                                lastModified: new Date().getTime(),
                            });
                            const createURL = URL.createObjectURL(file);
                            setPasteImage([...pasteImage, createURL]);
                        }}
                    />
                    <div className="cursor-pointer" onClick={handleSubmit}>
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            size="lg"
                            color="#0070f0"
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="">
            <p className="text-default-400 italic">Nhót</p>
        </div>
    );
};

export default DetailMessage;
