import { useAppSelector, useModalContext } from "@/core/hooks";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Tooltip } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChatLinkButton() {
    const user = useAppSelector((state) => state.user.value);
    const status = useAppSelector((state) => state.user.status);
    const { open } = useModalContext();
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [user, open, navigate]);

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
