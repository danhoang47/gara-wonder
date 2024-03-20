import { getBasicGarageInfo, getUser } from "@/api";
import { GarageBasicInfo } from "@/api/garages/getBasicGarageInfo";
import {
    Garage,
    Notification,
    NotificationType,
    OrderStatus,
    User,
} from "@/core/types";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import moment from "moment";
import { memo, useMemo } from "react";
import useSWRImmutable from "swr/immutable";

export type NotificationCardProps = {
    notification: Notification;
};

const getKey = (type: NotificationType, from: string) => {
    switch (type) {
        case NotificationType.Order:
            return `users/${from}`;
        case NotificationType.GarageOrder:
            return `garages/${from}`;
    }
};

const fetchAvatar = async (
    type: NotificationType,
    from: string,
): Promise<User | GarageBasicInfo | undefined> => {
    console.log(type);
    if (type === NotificationType.GarageOrder) {
        console.log("get user");
        return await getUser(from).then((user) => user.data);
    } else if (type === NotificationType.Order) {
        const garage = await getBasicGarageInfo(from).then(
            (garage) => garage.data[0],
        );
        return garage;
    }

    return undefined;
};

const getOrderStatusTitle = (orderStatus: OrderStatus) => {
    switch (orderStatus) {
        case OrderStatus.Pending:
            return "đang chờ xem xét";
        case OrderStatus.Accepted:
            return "đã đặt thành công";
        case OrderStatus.Canceled:
            return "đã hủy";
        case OrderStatus.Rejected:
            return "đã bị hủy";
        default:
            throw new Error("INVALID orderStatus");
    }
};

// eslint-disable-next-line react-refresh/only-export-components
function NotificationCard({ notification }: NotificationCardProps) {
    const { from, type, hasRead, content, createdAt } = notification;
    const { isLoading, data: subject } = useSWRImmutable(
        getKey(type, from),
        () => fetchAvatar(type, from),
    );
    const subjectDisplayImageUrl = useMemo(() => {
        if (!subject) return undefined;
        if (type === NotificationType.Order) {
            return (subject as unknown as Garage).backgroundImage.url;
        } else if (type === NotificationType.GarageOrder) {
            return (subject as unknown as User).photoURL;
        }
        return undefined;
    }, [subject, type]);

    const getNotificationTitle = () => {
        if (!subject) return undefined;

        if (type === NotificationType.Order) {
            return (
                <div>
                    <span>Đơn sửa chữa </span>
                    <span className="font-medium">
                        {notification.content.orderId}
                    </span>
                    <span> tại garage</span>
                    <span className="font-medium">
                        {" "}
                        {(subject as unknown as Garage).name}
                    </span>{" "}
                    {getOrderStatusTitle(notification.content.status)}
                </div>
            );
        } else if (type === NotificationType.GarageOrder) {
            return (
                <div>
                    <span>Đơn sửa chữa </span>
                    <span className="font-medium">
                        {notification.content.orderId}
                    </span>
                    <span> được đặt bởi</span>
                    <span className="font-medium">
                        {" "}
                        {(subject as unknown as User).displayName}
                    </span>{" "}
                    {getOrderStatusTitle(notification.content.status)}
                </div>
            );
        }
    };

    return (
        <div
            className={clsx(
                "flex gap-2 px-6 py-4 justify-start cursor-pointer",
                hasRead && "opacity-70",
            )}
        >
            <div className="grow shrink-0">
                <Avatar size="md" src={subjectDisplayImageUrl} />
            </div>
            <div>
                <div>{getNotificationTitle()}</div>
                <p className="text-default-400 mt-1">
                    {moment(createdAt).fromNow()}
                </p>
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(NotificationCard);
