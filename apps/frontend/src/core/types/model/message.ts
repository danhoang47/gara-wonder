import { Image, Model, Status } from ".";

export type Room = Model & {
    userId: string,
    status: Status
}

export type Message = Model & {
    authorId: string,
    content: string,
    images: Image[],
    roomId: string,
    replyFrom?: string,
    isSticked?: boolean
}