import { Link, Tooltip, Badge } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import { useAppSelector, useModalContext } from "@/core/hooks";
import { hasAllMessageRead } from "@/features/chat/rooms.slice";

function ChatLinkButton() {
    const user = useAppSelector((state) => state.user.value);
    const hasAllRead = useAppSelector(hasAllMessageRead);
    const { open } = useModalContext();

    const onNavigateToChatButtonClick = (event: React.MouseEvent) => {
        if (!user) {
            open("signIn");
            event.preventDefault();
        }
    };

    return (
        <Tooltip content="Tin nhắn">
            <Link
                href="/chat"
                className="bg-white w-10 h-10 flex justify-center items-center rounded-full"
                onClick={onNavigateToChatButtonClick}
            >
                <Badge
                    content=""
                    placement="bottom-right"
                    color="primary"
                    isInvisible={hasAllRead}
                >
                    <FontAwesomeIcon icon={faComment} color="#000" />
                </Badge>
            </Link>
        </Tooltip>
    );
}

export default ChatLinkButton;
