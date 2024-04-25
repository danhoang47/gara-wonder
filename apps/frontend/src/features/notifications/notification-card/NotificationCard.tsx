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
import "moment/dist/locale/vi";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

moment.locale("vi");

export type NotificationCardProps = {
    notification: Notification;
};

const getKey = (type: NotificationType, from: string) => {
    if (
        type === NotificationType.GarageOrder ||
        type === NotificationType.EvaluationGarage
    ) {
        return `users/${from}`;
    } else if (
        type === NotificationType.Order ||
        type === NotificationType.Evaluation ||
        type === NotificationType.Admin ||
        type === NotificationType.Debit
    ) {
        return `garages/${from}`;
    }
};

const fetchAvatar = async (
    type: NotificationType,
    from: string,
): Promise<User | GarageBasicInfo | string | undefined> => {
    if (
        type === NotificationType.GarageOrder ||
        type === NotificationType.EvaluationGarage
    ) {
        return await getUser(from).then((user) => user.data);
    } else if (
        type === NotificationType.Order ||
        type === NotificationType.Evaluation ||
        type === NotificationType.Admin
    ) {
        const garage = await getBasicGarageInfo(from).then(
            (garage) => garage.data[0],
        );
        return garage;
    } else if (type === NotificationType.Debit) {
        return "/logo.png";
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
        case OrderStatus.Completed:
            return "đã hoàn thành";
        case OrderStatus.Fixing:
            return "đang được sửa chữa";
        case OrderStatus.PaymentRequest:
            return "đang chờ thanh toán";
        case OrderStatus.Preparing:
            return "đang chuẩn bị";
        case OrderStatus.GarageRegister:
            return "vừa được khởi tạo";
        case OrderStatus.Review:
            return "vừa được đánh giá";
        case OrderStatus.Report:
            return "vừa được báo cáo";
        default:
            throw new Error("INVALID orderStatus");
    }
};

const getNotificationRedirectHref = (
    type: NotificationType,
    to: string,
    orderId?: string,
) => {
    if (
        type === NotificationType.GarageOrder ||
        type === NotificationType.EvaluationGarage
    ) {
        return `/garages/${to}/management/orders/${orderId}`;
    } else if (
        type === NotificationType.Order ||
        type === NotificationType.Evaluation
    ) {
        return "/account/orders";
    } else if (type === NotificationType.Debit && orderId) {
        return `/garages/${orderId}/management/billing-history`;
    }

    return "";
};

// eslint-disable-next-line react-refresh/only-export-components
function NotificationCard({ notification }: NotificationCardProps) {
    const { from, type, hasRead, content, createdAt, to } = notification;
    const { data: subject } = useSWRImmutable(getKey(type, from), () =>
        fetchAvatar(type, from),
    );
    const subjectDisplayImageUrl = useMemo(() => {
        if (!subject) return undefined;
        if (
            type === NotificationType.Order ||
            type === NotificationType.Evaluation ||
            type === NotificationType.Admin
        ) {
            return (subject as unknown as Garage).backgroundImage.url;
        } else if (
            type === NotificationType.GarageOrder ||
            type === NotificationType.EvaluationGarage ||
            type === NotificationType.Garage
        ) {
            return (subject as unknown as User).photoURL;
        }
        return subject as string;
    }, [subject, type]);

    const getNotificationTitle = () => {
        if (!subject) return undefined;

        if (
            type === NotificationType.Order ||
            type === NotificationType.Evaluation
        ) {
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
        } else if (
            type === NotificationType.GarageOrder ||
            type === NotificationType.EvaluationGarage ||
            type === NotificationType.Garage
        ) {
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
        } else if (type === NotificationType.Admin) {
            return (
                <div>
                    <span>Garage </span>
                    <span className="font-medium">
                        {(subject as unknown as Garage).name}
                    </span>{" "}
                    {getOrderStatusTitle(notification.content.status)}
                </div>
            );
        }
    };

    return (
        <Link
            to={getNotificationRedirectHref(type, to, content.orderId)}
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
        </Link>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(NotificationCard);
