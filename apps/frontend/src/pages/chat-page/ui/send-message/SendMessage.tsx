/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";

import {
    faImage,
    faPaperPlane,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { PayloadMessage } from "../detail-message/DetailMessage";
import { ObjectId } from "bson";
import { Message, MessageStatus, Response } from "@/core/types";
import { RoomEntry, receivedMessage } from "@/features/chat/rooms.slice";
import { socket } from "@/components/socket";
import { Textarea } from "@nextui-org/react";
import ImagePreview from "../image-preview/ImagePreview";

const ellipsisClassName = "overflow-hidden text-ellipsis whitespace-nowrap";

interface ISendMessageProps {
    room: RoomEntry;
    replyMessage: Message | undefined;
    setReplyMessage: (message?: Message) => void;
}

const SendMessage = ({
    room,
    replyMessage,
    setReplyMessage,
}: ISendMessageProps) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.user.value?._id);
    const [pasteImage, setPasteImage] = useState<File[]>([]);
    const [content, setContent] = useState("");

    const handleSubmit = (e: any, replyFrom?: Message) => {
        if (e.key === "Enter" || e.type === "click") {
            e.preventDefault();
            if (!content) {
                return;
            }

            const sendMessage: PayloadMessage = {
                _id: new ObjectId(),
                authorId: userId!,
                content,
                createdAt: new Date().getTime(),
                images: [],
                isLoading: true,
                roomId: room.roomId,
                status: MessageStatus.Exist,
                replyFrom,
            };

            dispatch(
                receivedMessage({
                    ...sendMessage,
                    _id: sendMessage._id.toString(),
                }),
            );

            setContent("");
            setPasteImage([]);
            setReplyMessage();

            socket.emit(
                "room:send_message",
                sendMessage,
                (message: Response<Message>) => {
                    dispatch(
                        receivedMessage({ ...message.data, isLoading: false }),
                    );
                },
            );
        }
    };

    const handleRemoveImage = (idx: number) => {
        const newList = pasteImage.filter((item) => item.lastModified !== idx);
        setPasteImage(newList);
    };

    return (
        <div className="items-end  gap-2 px-4 py-4 rounded">
            <div
                className={clsx(
                    "h-fit rounded overflow-hidden w-full",
                    (replyMessage || pasteImage?.length > 0) && "border-t-2",
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
                                setReplyMessage();
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} size="sm" />
                        </div>
                    </div>
                )}
                {pasteImage?.length > 0 && (
                    <div className="flex gap-2 p-2 overflow-x-auto ">
                        {pasteImage.map((item: File) => {
                            return (
                                <div className="w-[120px] h-[80px] shrink-0 relative">
                                    <ImagePreview
                                        file={item}
                                        onImageRemove={() => {
                                            handleRemoveImage(
                                                item.lastModified,
                                            );
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="cursor-pointer">
                    <FontAwesomeIcon icon={faImage} size="lg" color="#0070f0" />
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
                        setPasteImage([...pasteImage, blob]);
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
    );
};

export default SendMessage;
