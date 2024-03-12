import { Model, OrderStatus } from ".";

export const enum NotificationType {
    Order = 0,
    GarageOrder,
    Voucher,
}

export type NotificationBase = Model & {
    userId: string;
};

export type OrderNotification = NotificationBase & {
    type: NotificationType.Order;
    content: {
        orderId: string;
        status: OrderStatus;
    };
    hasRead: boolean;
};

export type GarageOrderNotification = NotificationBase & {
    type: NotificationType.GarageOrder;
    content: {
        orderId: string;
        status: OrderStatus;
        allowAction?: boolean; // "auto" | "manual"
    };
    hasRead: boolean;
};

export type Notification = OrderNotification | GarageOrderNotification;
