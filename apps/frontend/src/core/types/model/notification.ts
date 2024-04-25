import { Model, OrderStatus, Report } from ".";

export const enum NotificationType {
    Order = 0,
    GarageOrder,
    Voucher,
    Evaluation,
    Admin,
    Debit,
    EvaluationGarage = 6,
    Garage,
}

export type NotificationBase = Model & {
    userId?: string;
};

export type OrderNotification = NotificationBase & {
    type: NotificationType.Order | NotificationType.Evaluation;
    content: {
        orderId: string;
        status: OrderStatus;
    };
    from: string;
    to: string;
    hasRead: boolean;
};

export type GarageOrderNotification = NotificationBase & {
    type:
        | NotificationType.GarageOrder
        | NotificationType.EvaluationGarage
        | NotificationType.Garage;
    content: {
        orderId: string;
        status: OrderStatus;
        allowAction?: boolean; // "auto" | "manual"
    };
    from: string;
    to: string;
    hasRead: boolean;
};

export type SystemOrderNotification = NotificationBase & {
    type: NotificationType.Debit;
    content: {
        orderId: string;
        status: OrderStatus;
        allowAction?: boolean; // "auto" | "manual"
    };
    from: string;
    to: string;
    hasRead: boolean;
};

export type AdminReportNotification = NotificationBase & {
    type: NotificationType.Admin;
    content: {
        orderId: string;
        status: OrderStatus;
    };
    from: string;
    to: string;
    hasRead: boolean;
};

export type Notification =
    | OrderNotification
    | GarageOrderNotification
    | SystemOrderNotification
    | AdminReportNotification;
