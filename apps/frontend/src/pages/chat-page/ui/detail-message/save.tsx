/* eslint-disable */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImage,
    faPaperPlane,
    faEllipsis,
    faFaceSmile,
    faReply,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner, Textarea, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const ellipsisClassName = "overflow-hidden text-ellipsis whitespace-nowrap";

const DetailMessage = ({
    list,
    handleSubmit,
    message,
    setMessage,
    replyMessage,
    setReplyMessage,
    pasteImage,
    setPasteImage,
}: any) => {
    const currentId = "1";

    const [isOpen, setIsOpen] = useState(false);

    const chatRef: any = useRef(list);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [list]);

    const handleRemoveImage = (idx: any) => {
        const newList = pasteImage.filter(
            (_: any, index: any) => index !== idx,
        );
        setPasteImage(newList);
    };

    const isOnline = true;

    return (
        <div className="flex flex-col col-span-4 overflow-hidden h-full">
            <div className="flex items-center gap-2 px-4 py-3 border-b">
                <div className="w-[45px] h-[45px] relative">
                    <img
                        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg"
                        alt=""
                        className="block rounded-full h-full w-full object-cover"
                    />

                    {isOnline && (
                        <div className="bg-[#31a24c] border border-[black] rounded-full absolute w-[14px] h-[14px] bottom-0 right-0"></div>
                    )}
                </div>
                <div className="leading-none">
                    <h2 className="font-semibold">Name</h2>
                    {isOnline && <p className="text-sm">Đang hoạt động</p>}
                </div>
            </div>
            <div className="flex flex-col gap-2 flex-1  overflow-y-auto justify-end">
                <div ref={chatRef} className="overflow-y-auto px-4 py-3">
                    {list.map((item: any, index: any) => {
                        let isSameAuthor = false;
                        if (index === 0) {
                            isSameAuthor = true;
                        } else {
                            isSameAuthor =
                                index + 1 <= list.length &&
                                list[index - 1].authorId !== item.authorId;
                        }

                        return (
                            <div
                                className={clsx(
                                    "flex gap-2 mb-0.5  chat-bubble-wrapper",
                                    item.authorId === currentId &&
                                        "justify-end",
                                    isSameAuthor && "mt-5",
                                )}
                            >
                                {item.authorId !== currentId && (
                                    <div className="w-[30px] h-[30px] shrink-0 self-end">
                                        <img
                                            src={item.images}
                                            alt=""
                                            className={`block rounded-full h-full w-full object-cover  ${
                                                !isSameAuthor && "invisible"
                                            }`}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col max-w-[80%]">
                                    {isSameAuthor &&
                                        item.authorId !== currentId && (
                                            <h2 className="text-sm">
                                                {item.authorName}
                                            </h2>
                                        )}
                                    <Tooltip
                                        onClose={() => {
                                            setIsOpen(false);
                                        }}
                                        className="bg-transparent  "
                                        content={
                                            <div className="cursor-pointer flex gap-3 text-primary">
                                                {isOpen && (
                                                    <div className="absolute top-[-120%] left-0 flex gap-2 bg-[rgba(0,0,0,0.15)] px-3 py-2 rounded-full">
                                                        <FontAwesomeIcon
                                                            icon={faFaceSmile}
                                                            size="lg"
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faFaceSmile}
                                                            size="lg"
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faFaceSmile}
                                                            size="lg"
                                                        />
                                                    </div>
                                                )}

                                                <FontAwesomeIcon
                                                    icon={faFaceSmile}
                                                    size="lg"
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faReply}
                                                    size="lg"
                                                    onClick={() => {
                                                        setReplyMessage(item);
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                    size="lg"
                                                />
                                            </div>
                                        }
                                        placement={
                                            item.authorId === currentId
                                                ? "left"
                                                : "right"
                                        }
                                        shouldFlip={false}
                                    >
                                        <div className="flex flex-col relative">
                                            {item?.replyFrom?.id && (
                                                <div className="cursor-pointer rounded-md p-2 relative bg-[#ccc]">
                                                    <p
                                                        className={clsx(
                                                            ellipsisClassName,
                                                        )}
                                                    >
                                                        {item.replyFrom.content}
                                                    </p>
                                                </div>
                                            )}
                                            <div
                                                className={clsx(
                                                    "chat-bubble",
                                                    item.authorId === currentId
                                                        ? "right self-end chat-bubble-gradient text-white"
                                                        : "left",
                                                    item?.replyFrom?.id &&
                                                        "translate-y-[-8px]",
                                                )}
                                            >
                                                <p>{item.content}</p>
                                            </div>
                                            <div className="w-fit absolute bottom-0 right-0  bg-[rgba(0,0,0,0.15)]  rounded-full">
                                                <FontAwesomeIcon
                                                    icon={faFaceSmile}
                                                    size="1x"
                                                />
                                            </div>
                                        </div>
                                    </Tooltip>
                                    {item.loadingStatus && (
                                        <div className="flex items-center mt-0.5 justify-end">
                                            <Spinner
                                                size="sm"
                                                color="default"
                                            />
                                            <p className="text-xs">Đang gửi</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="items-end flex gap-2 px-4 py-4 ">
                <div className="cursor-pointer">
                    <FontAwesomeIcon icon={faImage} size="lg" color="#0070f0" />
                </div>

                <div className=" bg-[#f4f4f5] h-fit rounded overflow-hidden w-full">
                    {replyMessage?._id && (
                        <div className="p-2 relative">
                            <p className="font-bold ">Đang trả lời:</p>
                            <p className={clsx(ellipsisClassName)}>
                                {replyMessage.content}
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
                    {pasteImage.length > 0 && (
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
                    <Textarea
                        className="items-end justify-end"
                        type="text"
                        value={message}
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
                            setMessage(e);
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
                </div>

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

export default DetailMessage;
