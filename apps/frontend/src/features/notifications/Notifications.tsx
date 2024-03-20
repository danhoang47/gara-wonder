import { useEffect, useMemo, useState } from "react";
import NotificationsDialog from "./notifications-dialog";
import {
    Badge,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector, useModalContext } from "@/core/hooks";
import { hasAllNotificationsRead } from "./notifications.slice";
import useNotifications from "./useNotifications";
import { hasAllGarageNotificationsRead } from "./garage-notifications.slice";
import CustomerNotifications from "./customer-notifications";
import GarageNotifications from "./garage-notifications";
import useGarageNotifications from "./useGarageNotifications";

function Notifications() {
    const { open } = useModalContext();
    const user = useAppSelector((state) => state.user.value);
    const hasCustomerNotificationsAllRead = useAppSelector((state) =>
        hasAllNotificationsRead(state.notifications),
    );
    const hasGarageNotificationsAllRead = useAppSelector((state) =>
        hasAllGarageNotificationsRead(state.garageNotifications),
    );
    const hasAllRead = useMemo(
        () => hasCustomerNotificationsAllRead && hasGarageNotificationsAllRead,
        [hasCustomerNotificationsAllRead, hasGarageNotificationsAllRead],
    );
    const [isNotificationsOpen, setNotificationsOpen] =
        useState<boolean>(false);
    const { isLoading, isReload, onNext } = useNotifications();
    const {
        isLoading: isGarageNotificationsLoading,
        isReload: isGarageNotificationsReload,
        onNext: onGarageNotificationsNext,
    } = useGarageNotifications();

    useEffect(() => {
        document.addEventListener("scroll", () => {
            setNotificationsOpen(false);
        });
    }, []);

    return (
        <Popover
            isOpen={isNotificationsOpen && Boolean(user)}
            onOpenChange={(open) => {
                setNotificationsOpen(open);
            }}
            triggerType="dialog"
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
                    <Badge
                        isInvisible={hasAllRead}
                        content=""
                        color="primary"
                        shape="circle"
                        placement="bottom-right"
                    >
                        <FontAwesomeIcon icon={faBell} size="lg" />
                    </Badge>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[420px] p-0">
                <NotificationsDialog
                    defaultRegion="general"
                    customerNotifications={
                        <CustomerNotifications
                            isLoading={isLoading}
                            isReload={isReload}
                            onNext={onNext}
                        />
                    }
                    garageNotifications={
                        <GarageNotifications
                            isLoading={isGarageNotificationsLoading}
                            isReload={isGarageNotificationsReload}
                            onNext={onGarageNotificationsNext}
                        />
                    }
                />
            </PopoverContent>
        </Popover>
    );
}

export default Notifications;
