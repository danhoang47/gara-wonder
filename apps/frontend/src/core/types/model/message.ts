import { Image, Model } from ".";

export enum MessageStatus {
    Exist = 0,
    Recall,
}

export type Message = Model & {
    roomId: string;
    content: string;
    authorId: string;
    images?: Image[];
    isSticked?: boolean;
    isFavorited?: boolean;
    replyFrom?: Message;
    status: MessageStatus;
    isLoading: boolean;
};
