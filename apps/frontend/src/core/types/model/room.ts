import { Model } from ".";
import { Message } from "./message";

export enum RoomStatus {
    InActive = 0,
    Active,
    Ignore,
}

// user - garage
export type Room = Model & {
    userId: string;
    roomId: string;
    status: RoomStatus;
    garageId: string;
    photoURL: string;
    displayName: string;
    latestMessage: Message;
    isOnline?: boolean;
    lastActiveAt?: number;
    messages: Message[];
    isTyping?: boolean;
};
