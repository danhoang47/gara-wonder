/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useId, useState } from "react";

import {
    faImage,
    faPaperPlane,
    faXmark,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { PayloadMessage } from "../detail-message/DetailMessage";
import { ObjectId } from "bson";
import { Message, MessageStatus, Response } from "@/core/types";
import { RoomEntry, receivedMessage } from "@/features/chat/rooms.slice";
import { socket } from "@/components/socket";
import { Card, CardBody, Textarea } from "@nextui-org/react";
import ImagePreview from "../image-preview/ImagePreview";
import useDebouncedValue from "./useDebounce";
import { WithCategoryService } from "@/api/garages/getGarageServices";
import ServicesSuggestion from "../services-suggestion";
import { getCategoryIcon } from "@/utils";

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
    const inputFileId = useId();
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const [pasteImage, setPasteImage] = useState<File[]>([]);
    const [content, setContent] = useState("");
    const [selectedServices, setSelectedServices] = useState<
        WithCategoryService[]
    >([]);

    const handleSubmit = (e: any, replyFrom?: Message) => {
        if (e.key === "Enter" || e.type === "click") {
            e.preventDefault();
            if (!content && !pasteImage.length && !selectedServices.length) {
                return;
            }

            const sendMessage: PayloadMessage = {
                _id: new ObjectId().toString(),
                authorId: userId!,
                content,
                createdAt: new Date().getTime(),
                images: pasteImage,
                isLoading: true,
                roomId: room.roomId,
                status: MessageStatus.Exist,
                replyFrom,
                serviceIds: selectedServices.map(({ _id }) => _id) as string[],
            };

            dispatch(
                receivedMessage({
                    ...sendMessage,
                    _id: sendMessage._id.toString(),
                    hasRead: true
                }),
            );

            setContent("");
            setPasteImage([]);
            setReplyMessage();
            setSelectedServices([]);

            socket.emit(
                "room:send_message",
                sendMessage,
                (message: Response<Message>) => {
                    dispatch(
                        receivedMessage({
                            ...message.data,
                            isLoading: false,
                            replyFrom,
                            hasRead: true
                        }),
                    );
                },
            );
        }
    };

    const handleRemoveImage = (idx: number) => {
        const newList = pasteImage.filter((item) => item.lastModified !== idx);
        setPasteImage(newList);
    };

    const emitTyping = useDebouncedValue(room, content);

    const onServiceSelected = (service: WithCategoryService) => {
        const isExist = selectedServices.find(
            (selectedService) => service._id === selectedService._id,
        );
        if (isExist) {
            setSelectedServices((prev) =>
                prev.filter(({ _id }) => _id !== service._id),
            );
            return;
        }

        setSelectedServices((prev) => [...prev, service]);
    };

    const onRemoveServiceSelected = (idx: number) => {
        const newSelectedServices = selectedServices.filter(
            (_, index) => index !== idx,
        );
        setSelectedServices(newSelectedServices);
    };

    return (
        <div className="items-end  gap-2 px-4 py-4 rounded">
            <div
                className={clsx(
                    "h-fit rounded overflow-hidden w-full",
                    (replyMessage ||
                        pasteImage?.length > 0 ||
                        selectedServices?.length > 0) &&
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
                                setReplyMessage();
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} size="sm" />
                        </div>
                    </div>
                )}

                {selectedServices?.length > 0 && (
                    <div className="flex gap-2 py-2 overflow-x-auto ">
                        {selectedServices.map((selectedService, index) => (
                            <Card className="shrink-0 shadow-none border">
                                <CardBody className="py-2 px-4">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-2 items-center justify-between">
                                            <div className="w-[18px] h-[18px]">
                                                <img
                                                    src={getCategoryIcon(
                                                        selectedService.category
                                                            .type,
                                                    )}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="text-small font-medium">
                                                {selectedService.category.name}
                                            </p>
                                        </div>

                                        <FontAwesomeIcon
                                            icon={faClose}
                                            size="1x"
                                            className="hover:text-danger cursor-pointer"
                                            onClick={() => {
                                                onRemoveServiceSelected(index);
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}

                {pasteImage?.length > 0 && (
                    <div className="flex gap-2 p-2 overflow-x-auto ">
                        {pasteImage.map((item: File, index) => {
                            return (
                                <div
                                    className="w-[120px] h-[80px] shrink-0 relative"
                                    key={index}
                                >
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
                <div className="cursor-pointer text-default-300 hover:text-primary">
                    <label htmlFor={inputFileId}>
                        <FontAwesomeIcon
                            icon={faImage}
                            size="lg"
                            className="transition-colors"
                        />
                    </label>
                    <input
                        type="file"
                        multiple
                        id={inputFileId}
                        title="images"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                            const files = event.target.files;
                            if (files?.length) {
                                setPasteImage((prev) => [...prev, ...files]);
                            }
                            event.target.value = null as any;
                        }}
                    />
                </div>
                {garageId === room.entityId && (
                    <ServicesSuggestion
                        garageId={garageId}
                        onServiceSelected={onServiceSelected}
                        selectedServices={selectedServices}
                    />
                )}
                <Textarea
                    radius="full"
                    type="text"
                    value={content}
                    minRows={1}
                    maxRows={5}
                    alt=""
                    placeholder="Aa"
                    onKeyDown={(e) => {
                        if (!room.isTyping) {
                            emitTyping();
                        }
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
                <div
                    className="cursor-pointer text-default-300 hover:text-primary "
                    onClick={(e) => {
                        if (replyMessage?._id) {
                            handleSubmit(e, replyMessage);
                        } else {
                            handleSubmit(e);
                        }
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        size="lg"
                        className="transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};

export default SendMessage;
