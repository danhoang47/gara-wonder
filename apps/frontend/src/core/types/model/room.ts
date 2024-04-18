import { Model } from ".";
import { Message } from "./message";

export enum RoomStatus {
    InActive = 0,
    Active,
    Ignore,
}

export enum RoomType {
    WithSupplier = 0,
    WithGarage,
}

export type Room = Model & {
    userId: string;
    roomId: string;
    status: RoomStatus;
    entityId: string;
    photoURL: string;
    displayName: string;
    latestMessage: Message;
    isOnline?: boolean;
    lastActiveAt?: number;
    messages: Message[];
    isTyping?: boolean;
    type: RoomType;
    attachEntityId: string;
};
