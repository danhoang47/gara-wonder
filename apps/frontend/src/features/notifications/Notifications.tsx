import { useState } from "react";
import NotificationsDialog from "./notifications-dialog";
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector, useModalContext } from "@/core/hooks";

function Notifications() {
    const { open } = useModalContext();
    const user = useAppSelector((state) => state.user.value);
    const [isNotificationsOpen, setNotificationsOpen] =
        useState<boolean>(false);

    return (
        <Popover
            isOpen={isNotificationsOpen && Boolean(user)}
            onOpenChange={(open) => {
                setNotificationsOpen(open);
            }}
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    className="bg-white"
                    radius="full"
                    disableAnimation
                    onClick={(event) => {
                        if (!user) {
                            event.stopPropagation();
                            open("signIn");
                            setNotificationsOpen(false);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faBell} size="lg" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[420px] p-0">
                <NotificationsDialog />
            </PopoverContent>
        </Popover>
    );
}

export default Notifications;
