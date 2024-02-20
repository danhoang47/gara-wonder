import { User } from "./user"

export type Model = {
    _id: string,
    createdAt: number,
    updatedAt: number,
}

export type Response<T = unknown> = {
    statusCode: number;
    message?: string;
    data: T;
    paging: Paging
}

export const enum FetchStatus {
    None = 0,
    Fetching,
    Fulfilled,
    Rejected
}

export type Paging = {
    cursor?: string,
    nextCursor?: string,
    limit?: number,
    total?: number,
}

export type Image = Model & {
    width: number,
    height: number,
    url: string
}

export const enum Status {
    Active = 1,
    InActive = 0,
}

export type BusinessEntity = 
Model & {
    userId: User["_id"],
    name: string,
    description: string,
    backgroundImage: Image,
    images: Image[],
    status: Status,
    openAt: string,
    closeAt: string,
    isVerify: boolean,
    address: string,
    latlng: [number, number]
}