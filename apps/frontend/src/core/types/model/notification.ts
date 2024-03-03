import { Model } from ".";

export enum NotificationType {
    
}

export type Notification = Model & {
    type: NotificationType
}