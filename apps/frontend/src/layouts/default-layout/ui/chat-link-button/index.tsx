import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Tooltip } from "@nextui-org/react";

function ChatLinkButton() {
    return (
        <Tooltip content="Tin nhắn">
            <Link
                href="/chat"
                className="bg-white w-10 h-10 flex justify-center items-center"
            >
                <FontAwesomeIcon icon={faComment} color="#000" />
            </Link>
        </Tooltip>
    );
}

export default ChatLinkButton;
