/* eslint-disable  */
import clsx from "clsx";
import "./ChatPage.styles.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImage,
    faPaperPlane,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Textarea, Tooltip } from "@nextui-org/react";

const ellipsisClassName = "overflow-x-hidden text-ellipsis whitespace-nowrap";

const ChatPage = () => {
    const currentId = "1";

    const activeItem = 0;
    const listUsers = [
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 1",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 2",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 3",
            oldestMessage:
                "oldestMessage oldestMessage oldestMessage oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 1",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 2",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 3",
            oldestMessage:
                "oldestMessage oldestMessage oldestMessage oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 1",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 2",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 3",
            oldestMessage:
                "oldestMessage oldestMessage oldestMessage oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 1",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 2",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 3",
            oldestMessage:
                "oldestMessage oldestMessage oldestMessage oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 1",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 2",
            oldestMessage: "oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 3",
            oldestMessage:
                "oldestMessage oldestMessage oldestMessage oldestMessage",
        },
        {
            img: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            name: "Name 1",
            oldestMessage: "oldestMessage",
        },
    ];

    const listMessages = [
        {
            _id: "123",
            content: "1",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author name name",
        },
        {
            _id: "123",
            content: "2",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "3",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "4",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "5",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "6",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 3",
        },
        {
            _id: "1",
            content: "7",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 3",
        },
        {
            _id: "1",
            content: "8",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 3",
        },
        {
            _id: "1",
            content: "9",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author Dan 22",
        },
        {
            _id: "1",
            content: "10",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 2",
        },
        {
            _id: "1",
            content: "11",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author Dan",
        },
        {
            _id: "1",
            content:
                "123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 ",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author dat",
        },
        {
            _id: "123",
            content: "1",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author name name",
        },
        {
            _id: "123",
            content: "2",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "3",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "4",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "5",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author name name",
        },
        {
            _id: "1",
            content: "6",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 3",
        },
        {
            _id: "1",
            content: "7",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 3",
        },
        {
            _id: "1",
            content: "8",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 3",
        },
        {
            _id: "1",
            content: "9",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author Dan 22",
        },
        {
            _id: "1",
            content: "10",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author Dan 2",
        },
        {
            _id: "1",
            content: "11",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author Dan",
        },
        {
            _id: "1",
            content:
                "123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123 123",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author dat",
        },
    ];

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

    const [list, setList] = useState(group(listMessages));
    const [message, setMessage] = useState("");

    const moreMessages = [
        {
            _id: "1",
            content: "-1",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "1",
            authorName: "author Dan",
        },
        {
            _id: "1",
            content: "0",
            images: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
            authorId: "2",
            authorName: "author dat",
        },
    ];

    const handleMore = () => {
        const newMes = group(moreMessages);
        setList([...newMes, ...list]);
    };

    const handleSubmit = (e: any) => {
        if (e.key === "Enter" || e.type === "click") {
            e.preventDefault();
            if (!message) {
                return;
            }
            setMessage("");
        }
    };

    return (
        <div className="grid grid-cols-6 h-[calc(100vh-81px)]">
            <div className="bg-[#ccc] col-span-2 py-2 overflow-hidden h-full">
                <h1 className="font-semibold text-2xl mb-2 px-3">Đoạn chat</h1>
                <div className="flex flex-col h-[calc(100%-40px)] overflow-y-auto px-3">
                    {listUsers.map((item, index) => (
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded ${
                                activeItem === index && "bg-[red]"
                            } ${
                                activeItem !== index && "hover:bg-[#777]"
                            } cursor-pointer`}
                        >
                            <div className="shrink-0 w-[60px] h-[60px] relative">
                                <img
                                    src={item.img}
                                    alt=""
                                    className="block rounded-full h-full w-full object-cover"
                                />
                                <div className="bg-[green] rounded-full absolute w-[14px] h-[14px] bottom-2 right-0"></div>
                            </div>
                            <div className="grow overflow-hidden">
                                <h2
                                    className={clsx(
                                        "font-semibold",
                                        ellipsisClassName,
                                    )}
                                >
                                    {item.name}
                                </h2>
                                <p
                                    className={clsx(
                                        "text-sm",
                                        ellipsisClassName,
                                    )}
                                >
                                    {item.oldestMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[green] flex flex-col col-span-4 overflow-hidden h-full">
                <div className="flex items-center gap-2 px-4 py-3 border-b">
                    <div className="w-[45px] h-[45px]">
                        <img
                            src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg"
                            alt=""
                            className="block rounded-full h-full w-full object-cover"
                        />
                    </div>
                    <div className="leading-none">
                        <h2 className="font-semibold">Name</h2>
                        <p className="text-sm">Đang hoạt động</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 flex-1s overflow-y-auto justify-end">
                    <div className="overflow-y-auto px-4 py-3">
                        {list.map((item: any) => {
                            return (
                                <div className="flex gap-2">
                                    {item[0].authorId !== currentId && (
                                        <div className="w-[30px] h-[30px] shrink-0 self-end">
                                            <img
                                                src={item[0].images}
                                                alt=""
                                                className="block rounded-full h-full w-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="grow">
                                        <h2
                                            className={clsx(
                                                "text-sm",
                                                item[0].authorId ===
                                                    currentId && "text-end",
                                            )}
                                        >
                                            {item[0].authorName}
                                        </h2>
                                        <div className="chat-bubble-wrapper flex flex-col gap-1">
                                            {item.map((item2: any) => {
                                                return (
                                                    <Tooltip
                                                        className="bg-transparent  "
                                                        content={
                                                            <div className="cursor-pointer">
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
                                                            currentId
                                                                ? "left"
                                                                : "right"
                                                        }
                                                        shouldFlip={false}
                                                    >
                                                        <div
                                                            className={clsx(
                                                                "chat-bubble ",
                                                                item2.authorId ===
                                                                    currentId
                                                                    ? "right self-end"
                                                                    : "left",
                                                            )}
                                                        >
                                                            <p>
                                                                {item2.content}
                                                            </p>
                                                        </div>
                                                    </Tooltip>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-full items-center flex gap-2 px-4 py-4 ">
                    <div className="cursor-pointer">
                        <FontAwesomeIcon icon={faImage} size="lg" />
                    </div>
                    <Textarea
                        type="text"
                        value={message}
                        minRows={1}
                        maxRows={5}
                        alt=""
                        placeholder="Aa"
                        onKeyDown={(e) => {
                            handleSubmit(e);
                        }}
                        onValueChange={(e) => {
                            setMessage(e);
                        }}
                        onPaste={(e) => {
                            const clipboardItems = e.clipboardData.items;
                            const items = [].slice
                                .call(clipboardItems)
                                .filter(function (item: any) {
                                    console.log(item);
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
                            console.log(file);
                        }}
                        children={
                            <div className="text-[red]">
                                <img
                                    src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg"
                                    alt=""
                                />
                            </div>
                        }
                    />

                    <div className="cursor-pointer" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
